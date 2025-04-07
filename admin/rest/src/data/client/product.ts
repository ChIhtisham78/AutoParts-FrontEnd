import {
  Product,
  CreateProduct,
  ProductPaginator,
  QueryOptions,
  GetParams,
  ProductQueryOptions,
  GenerateDescriptionInput,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const productClient = {
  ...crudFactory<Product, QueryOptions, any>('api/product/product'),
  get({ slug, language }: GetParams) {
    return HttpClientDotnet.get<Product>(`api/product/product/${slug}`, {
      language,
      with: 'type;shop;categories;tags;variations.attribute.values;variation_options;variation_options.digital_file;author;manufacturer;digital_file',
    });
  },
  getProductByShop: ({ shop_id }: { shop_id: any }) => {
    return HttpClientDotnet.get<Product>(
      'api/product/product-by-shopId/' + shop_id,
    );
  },

  paginated: ({
    type,
    name,
    categories,
    shop_id,
    product_type,
    status,
    ...params
  }: Partial<ProductQueryOptions>) => {
    return HttpClientDotnet.get<ProductPaginator>('api/product/products', {
      shop_id,
      name,
      ...params,
      categories,
      search: HttpClientDotnet.formatSearchParams({
        type,
        name,
        shop_id,
        product_type,
        status,
      }),
    });
  },
  popular({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClientDotnet.get<Product[]>(
      'api/product/products/popularproducts',
      {
        searchJoin: 'and',
        with: 'type;shop',
        ...params,
        search: HttpClientDotnet.formatSearchParams({ shop_id }),
      },
    );
  },
  lowStock({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClientDotnet.get<Product[]>('api/product/lowStockProducts', {
      ...params,
      search: HttpClient.formatSearchParams({ shop_id }),
    });
  },
  generateDescription: (data: GenerateDescriptionInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.GENERATE_DESCRIPTION, data);
  },
  newOrInActiveProducts: ({
    user_id,
    shop_id,
    status,
    name,
    ...params
  }: Partial<ProductQueryOptions>) => {
    return HttpClient.get<ProductPaginator>(
      API_ENDPOINTS.NEW_OR_INACTIVE_PRODUCTS,
      {
        searchJoin: 'and',
        user_id,
        shop_id,
        status,
        name,
        ...params,
        search: HttpClient.formatSearchParams({
          status,
          name,
        }),
      },
    );
  },
  lowOrOutOfStockProducts: ({
    user_id,
    shop_id,
    status,
    categories,
    name,
    type,
    ...params
  }: Partial<ProductQueryOptions>) => {
    return HttpClientDotnet.get<ProductPaginator>(
      'api/product/lowStockProducts',
      {
        searchJoin: 'and',
        user_id,
        shop_id,
        status,
        name,
        ...params,
        search: HttpClient.formatSearchParams({
          status,
          name,
          categories,
          type,
        }),
      },
    );
  },
  productByCategory({
    limit,
    language,
  }: {
    limit?: number;
    language?: string;
  }) {
    return HttpClientDotnet.get<any>(
      'api/product/category-wise-product-count',
      {
        limit,
        language,
      },
    );
  },
  // productByCategory({ shop_id, ...params }: Partial<ProductQueryOptions>) {
  //   return HttpClient.get<Product[]>(API_ENDPOINTS.CATEGORY_WISE_PRODUCTS, {
  //     searchJoin: 'and',
  //     ...params,
  //     search: HttpClient.formatSearchParams({ shop_id }),
  //   });
  // },
  mostSoldProductByCategory({
    shop_id,
    ...params
  }: Partial<ProductQueryOptions>) {
    return HttpClient.get<Product[]>(
      API_ENDPOINTS.CATEGORY_WISE_PRODUCTS_SALE,
      {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({ shop_id }),
      },
    );
  },
  getProductsByFlashSale: ({
    user_id,
    shop_id,
    slug,
    name,
    ...params
  }: any) => {
    return HttpClient.get<ProductPaginator>(
      API_ENDPOINTS.PRODUCTS_BY_FLASH_SALE,
      {
        searchJoin: 'and',
        user_id,
        shop_id,
        slug,
        name,
        ...params,
        search: HttpClient.formatSearchParams({
          name,
        }),
      },
    );
  },
  topRated({ shop_id, ...params }: Partial<ProductQueryOptions>) {
    return HttpClientDotnet.get<Product[]>(
      'api/product/products/gettopratedproducts',
      {
        searchJoin: 'and',
        ...params,
        search: HttpClientDotnet.formatSearchParams({ shop_id }),
      },
    );
  },
};

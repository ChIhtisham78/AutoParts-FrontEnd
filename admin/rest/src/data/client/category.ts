import {
  Category,
  CategoryPaginator,
  CategoryQueryOptions,
  CreateCategoryInput,
  QueryOptions,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const categoryClient = {
  ...crudFactory<Category, QueryOptions, CreateCategoryInput>(
    'api/category/category',
  ),
  paginated: ({
    type,
    name,
    self,
    ...params
  }: Partial<CategoryQueryOptions>) => {
    return HttpClientDotnet.get<CategoryPaginator>('api/category/category', {
      self,
      ...params,
      search: HttpClientDotnet.formatSearchParams({ type, name }),
    });
  },
  getBySlug: ({ slug }: any) => {
    return HttpClientDotnet.get<CategoryPaginator>(
      `api/category/getcategory/${slug}`,
      {},
    );
  },
};

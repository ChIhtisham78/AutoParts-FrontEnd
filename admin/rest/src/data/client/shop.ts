import {
  QueryOptions,
  Shop,
  ShopInput,
  ShopPaginator,
  ShopQueryOptions,
} from '@/types';
import { ApproveShopInput } from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { HttpClientDotnet } from './http-client-dotnet';
import { crudFactory } from './curd-factory';

export const shopClient = {
  ...crudFactory<Shop, QueryOptions, any>('api/Shop/shop'),
  get({ slug }: { slug: String }) {
    return HttpClientDotnet.get<any>(`${'api/Shop/slug'}/${slug}`);
  },
  getShopByOwner: ({ ownerId }: { ownerId: any }) => {
    return HttpClientDotnet.get<Shop>('api/Shop/owner/' + ownerId);
  },
  paginated: ({ name, ...params }: Partial<ShopQueryOptions>) => {
    return HttpClientDotnet.get<ShopPaginator>('api/shop/shop', {
      searchJoin: 'and',
      ...params,
      search: HttpClientDotnet.formatSearchParams({ name }),
    });
  },
  newOrInActiveShops: ({
    is_active,
    name,
    ...params
  }: Partial<ShopQueryOptions>) => {
    return HttpClient.get<ShopPaginator>(API_ENDPOINTS.NEW_OR_INACTIVE_SHOPS, {
      searchJoin: 'and',
      is_active,
      name,
      ...params,
      search: HttpClient.formatSearchParams({ is_active, name }),
    });
  },
  approve: (variables: ApproveShopInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.APPROVE_SHOP, variables);
  },
  disapprove: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.DISAPPROVE_SHOP,
      variables,
    );
  },
  update: (variables: ShopInput) => {
    return HttpClientDotnet.put<any>(`api/Shop/shop/${variables.id}`, variables);
  },

};

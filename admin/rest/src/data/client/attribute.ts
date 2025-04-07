import { crudFactory } from '@/data/client/curd-factory';
import {
  Attribute,
  AttributePaginator,
  AttributeQueryOptions,
  CreateAttributeInput,
  QueryOptions,
} from '@/types';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { HttpClient } from '@/data/client/http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const attributeClient = {
  ...crudFactory<Attribute, QueryOptions, CreateAttributeInput>(
    'api/subcategorylist/createsubcategory',
  ),
  paginated: ({
    type,
    name,
    shop_id,
    ...params
  }: Partial<AttributeQueryOptions>) => {
    return HttpClientDotnet.get<AttributePaginator>(API_ENDPOINTS.ATTRIBUTES, {
      searchJoin: 'and',
      ...params,
      search: HttpClientDotnet.formatSearchParams({ type, name, shop_id }),
    });
  },
  all: ({ type, name, shop_id, ...params }: Partial<AttributeQueryOptions>) => {
    return HttpClientDotnet.get<Attribute[]>(
      'api/subcategorylist/getsubcategories',
      {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({ type, name, shop_id }),
      },
    );
  },
};

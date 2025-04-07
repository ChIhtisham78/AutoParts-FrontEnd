import { crudFactory } from '@/data/client/curd-factory';
import {
  CreateManufacturerInput,
  Manufacturer,
  ManufacturerPaginator,
  ManufacturerQueryOptions,
  QueryOptions,
} from '@/types';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { HttpClient } from '@/data/client/http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const manufacturerClient = {
  ...crudFactory<Manufacturer, QueryOptions, any>(
    '/api/manufacturers/manufacturer',
  ),
  paginated: ({
    name,
    shop_id,
    ...params
  }: Partial<ManufacturerQueryOptions>) => {
    return HttpClientDotnet.get<ManufacturerPaginator>(
      '/api/manufacturers/manufacturers',
      {
        searchJoin: 'and',
        ...params,
        search: HttpClientDotnet.formatSearchParams({ name, shop_id }),
      },
    );
  },
  getBySlug: ({ slug }: any) => {
    return HttpClientDotnet.get<any>(
      `api/manufacturers/manufacturers/${slug}`,
      {},
    );
  },
};

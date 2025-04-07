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

export const modelClient = {
  ...crudFactory<Manufacturer, QueryOptions, any>('api/ManufactureModel'),
  paginated: ({
    name,
    shop_id,
    ...params
  }: Partial<ManufacturerQueryOptions>) => {
    return HttpClientDotnet.get<ManufacturerPaginator>(
      'api/ManufactureModel/GetManufactureModel',
      {
        ...params,
      },
    );
  },
  create: (input: { manufacturerId: number; model: string; slug: string }) => {
    return HttpClientDotnet.post(
      'api/ManufactureModel/CreateManufactureModel',
      input                    
    );
  },
  
  
  getBySlug: ({ slug }: any) => {
    return HttpClientDotnet.get<any>(
      `api/manufacturers/manufacturers/${slug}`,
      {},
    );
  },
};

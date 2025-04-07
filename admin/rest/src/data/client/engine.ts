import { crudFactory } from '@/data/client/curd-factory';
import {
  Manufacturer,
  ManufacturerPaginator,
  ManufacturerQueryOptions,
  QueryOptions,
} from '@/types';
import { HttpClientDotnet } from './http-client-dotnet';

export const engineClient = {
  ...crudFactory<Manufacturer, QueryOptions, any>('api/engine'),
  
  paginated: ({
    name,
    shop_id,
    ...params
  }: Partial<ManufacturerQueryOptions>) => {
    return HttpClientDotnet.get<ManufacturerPaginator>(
      'api/engine/getEngines',
      {
        ...params,
      },
    );
  },

  getBySlug: ({ slug }: any) => {
    return HttpClientDotnet.get<any>(
      `api/manufacturers/manufacturers/${slug}`,
      {},
    );
  },
  createEngine: (data: {
    manufacturerId: number | null;
    modelId: string;
    slug: string;
    categoryId: number | null;
    subcategoryId: string | null;
    year: number | null;
    engine1: string;
    hollanderCode: string | null;
  }) => {
    return HttpClientDotnet.post('api/Engine/CreateEngine', data);
  },
};

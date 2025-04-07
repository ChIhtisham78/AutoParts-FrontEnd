import { crudFactory } from '@/data/client/curd-factory';
import { CreateTypeInput, QueryOptions, Type, TypeQueryOptions } from '@/types';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { HttpClient } from '@/data/client/http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const typeClient = {
  ...crudFactory<Type, QueryOptions, CreateTypeInput>('api/types'),
  all: ({ name, ...params }: Partial<TypeQueryOptions>) => {
    return HttpClientDotnet.get<Type[]>('api/type/settings', {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
};

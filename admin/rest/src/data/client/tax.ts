import {
  Tax,
  QueryOptions,
  TaxInput,
  TaxQueryOptions,
  TaxPaginator,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from '@/data/client/http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const taxClient = {
  ...crudFactory<Tax, QueryOptions, TaxInput>('api/tax/tax'),
  get({ id }: { id: string }) {
    return HttpClient.get<Tax>(`api/tax/tax/${id}`);
  },
  paginated: ({ name, ...params }: Partial<TaxQueryOptions>) => {
    return HttpClientDotnet.get<TaxPaginator>('api/tax/tax', {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
  all: ({ name, ...params }: Partial<TaxQueryOptions>) => {
    return HttpClientDotnet.get<Tax[]>('api/tax/tax', {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
};

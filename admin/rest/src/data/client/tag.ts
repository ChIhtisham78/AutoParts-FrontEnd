import { crudFactory } from '@/data/client/curd-factory';
import {
  CreateTagInput,
  QueryOptions,
  Tag,
  TagPaginator,
  TagQueryOptions,
} from '@/types';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { HttpClient } from '@/data/client/http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const tagClient = {
  ...crudFactory<Tag, QueryOptions, CreateTagInput>('api/tag/tag'),
  paginated: ({ type, name, ...params }: Partial<TagQueryOptions>) => {
    return HttpClientDotnet.get<TagPaginator>('api/tag/tags', {
      searchJoin: 'and',
      ...params,
      search: HttpClientDotnet.formatSearchParams({ type, name }),
    });
  },
  getBySlug: ({ slug }: any) => {
    return HttpClientDotnet.get<any>(`api/tag/tag/slug/${slug}`, {});
  },
};

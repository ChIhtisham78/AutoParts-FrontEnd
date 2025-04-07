import { crudFactory } from '@/data/client/curd-factory';
import {
  CreateTagInput,
  QueryOptions,
  Tag,
  TagPaginator,
  TagQueryOptions,
} from '@/types';
import { HttpClientDotnet } from './http-client-dotnet';

export const stripeClient = {
  ...crudFactory<Tag, QueryOptions, CreateTagInput>('api/tag/tag'),
  paginated: ({ type, name, ...params }: Partial<TagQueryOptions>) => {
    return HttpClientDotnet.get<TagPaginator>('api/tag/tags', {
      searchJoin: 'and',
      ...params,
      search: HttpClientDotnet.formatSearchParams({ type, name }),
    });
  },
  createStripeVendor: ({ userId }: any) => {
    return HttpClientDotnet.post<any>(
      `api/StripePaymentGateway/createstripevendor?userId=${userId}`,
      userId,
    );
  },
  checkVendorStatus: ({ stripeId }: any) => {
    return HttpClientDotnet.get<any>(
      'api/StripePaymentGateway/checkVendorAccountStatus',
      {
        accountId: stripeId,
      },
    );
  },
};

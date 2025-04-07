import type {
  QueryOptions,
  Review,
  CreateAbuseReportInput,
  ReviewPaginator,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';
import { ReviewQueryOptions } from '@/types';
import { HttpClientDotnet } from './http-client-dotnet';

interface InputType {
  model_id: number;
  model_type: string;
}

export const reviewClient = {
  ...crudFactory<Review, QueryOptions, CreateAbuseReportInput>(
    'api/rating/review',
  ),
  reportAbuse: (data: CreateAbuseReportInput) => {
    return HttpClient.post<Review>(API_ENDPOINTS.ABUSIVE_REPORTS, data);
  },
  decline: (data: InputType) => {
    return HttpClient.post<Review>(API_ENDPOINTS.ABUSIVE_REPORTS_DECLINE, data);
  },
  get({ id }: { id: string }) {
    return HttpClient.get<Review>(`${API_ENDPOINTS.REVIEWS}/${id}`, {
      with: 'abusive_reports.user;product;user',
    });
  },
  paginated: ({ type, shop_id, ...params }: Partial<ReviewQueryOptions>) => {
    return HttpClientDotnet.get<ReviewPaginator>('api/rating/review', {
      searchJoin: 'and',
      with: 'product;user',
      ...params,
      search: HttpClient.formatSearchParams({ type, shop_id }),
    });
  },
};

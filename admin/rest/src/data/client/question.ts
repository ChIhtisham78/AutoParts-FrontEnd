import type {
  QueryOptions,
  Question,
  ReplyQuestion,
  QuestionPaginator,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';
import { QuestionQueryOptions } from '@/types';
import { HttpClientDotnet } from './http-client-dotnet';

export const questionClient = {
  ...crudFactory<Question, QueryOptions, ReplyQuestion>(
    API_ENDPOINTS.QUESTIONS,
  ),
  get({ id }: { id: string }) {
    return HttpClient.get<Question>(`${API_ENDPOINTS.QUESTIONS}/${id}`);
  },
  paginated: ({ type, shop_id, ...params }: Partial<QuestionQueryOptions>) => {
    return HttpClientDotnet.get<QuestionPaginator>('api/question/questions', {
      ...params,
      search: HttpClient.formatSearchParams({ type, shop_id }),
    });
  },
};

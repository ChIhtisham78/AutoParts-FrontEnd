import {
  Coupon,
  CouponInput,
  CouponPaginator,
  CouponQueryOptions,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';
import { VerifyCouponInputType, VerifyCouponResponse } from '@/types';
import { HttpClientDotnet } from './http-client-dotnet';

export const couponClient = {
  ...crudFactory<Coupon, any, any>('api/coupon/coupon'),
  get({ code, language }: { code: string; language: string }) {
    return HttpClient.get<Coupon>(`${API_ENDPOINTS.COUPONS}/${code}`, {
      language,
    });
  },
  paginated: ({ code, ...params }: Partial<CouponQueryOptions>) => {
    return HttpClientDotnet.get<CouponPaginator>('api/coupon/coupon', {
      searchJoin: 'and',
      ...params,
      search: HttpClientDotnet.formatSearchParams({ code }),
    });
  },

  verify: (input: VerifyCouponInputType) => {
    {
      return HttpClient.post<VerifyCouponResponse>(
        API_ENDPOINTS.VERIFY_COUPONS,
        input,
      );
    }
  },
  approve: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.APPROVE_COUPON,
      variables,
    );
  },
  disapprove: (variables: { id: string }) => {
    return HttpClient.post<{ id: string }>(
      API_ENDPOINTS.DISAPPROVE_COUPON,
      variables,
    );
  },
};

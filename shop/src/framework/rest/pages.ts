import { mapPaginatorData } from '@/framework/utils/data-mappers';
import type { RefundPolicyPaginator, RefundPolicyQueryOptions } from '@/types';
import { useRouter } from 'next/router';
import { useInfiniteQuery, useQuery } from 'react-query';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';

export const usePageQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<FAQs, Error>(
    ['/api/HomePage/GetAllPages', { id }],
    () => client.homePageClient.getPage(id),
  );

  return {
    homepage: data,
    error,
    loading: isLoading,
  };
};

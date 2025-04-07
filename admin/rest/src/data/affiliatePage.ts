import Router from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { mapPaginatorData } from '@/utils/data-mappers';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { Routes } from '@/config/routes';
import { Config } from '@/config';
import { FlashSaleImage, FlashSaleImagePaginator, HomePage } from '@/types';
import { flashSaleImageClient } from '@/data/client/images';
import router from 'next/router';
import { homePageClient } from './client/affiliatePages';
import { useRouter } from 'next/navigation';

export const useGetHomePages = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(homePageClient.getAllPages, {
    onSuccess: (data) => {
      queryClient.setQueryData(API_ENDPOINTS.HOME_PAGES, data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.HOME_PAGES);
    },
  });
};

export const usePageQuery = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useQuery<FAQs, Error>(
    ['/api/HomePage/GetAllPages', { id }],
    () => homePageClient.getPage(id),
  );

  return {
    homepage: data,
    error,
    loading: isLoading,
  };
};

export const useUpdateHomePages = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(
    ({ id, pageData }: { id: number; pageData: HomePage }) =>
      homePageClient.updateHomePage(id, pageData),
    {
      onSuccess: () => {
        toast.success(t('common:successfully-updated'));
        queryClient.invalidateQueries(API_ENDPOINTS.HOME_PAGES);
        router.push('/home-pages');
      },
      onError: (error) => {
        toast.error(t('Error updating data!'));
        console.error('Update Error:', error);
      },
    },
  );
};

export const useDeleteHomePages = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(homePageClient.deletePage, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.HOME_PAGES);
    },
  });
};

// // Update Home-Page
// export const useUpdateHomePageMutation = () => {
//   const { t } = useTranslation();
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   return useMutation(homePageClient.updateHomePage, {
//     onSuccess: async (data) => {
//       await router.push('/home-pages');
//       toast.success(t('common:successfully-updated'));
//     },
//     // Always refetch after error or success:
//     onSettled: () => {
//       queryClient.invalidateQueries(API_ENDPOINTS.FAQS);
//     },
//     onError: (error: any) => {
//       toast.error(t(`common:${error?.response?.data.message}`));
//     },
//   });
// };

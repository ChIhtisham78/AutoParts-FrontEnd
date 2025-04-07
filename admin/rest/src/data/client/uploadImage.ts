import Router from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { mapPaginatorData } from '@/utils/data-mappers';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { Routes } from '@/config/routes';
import { Config } from '@/config';
import { FlashSaleImage, FlashSaleImagePaginator } from '@/types';
import { flashSaleImageClient } from '@/data/client/images';
import router from 'next/router';

export const useCreateImageMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(flashSaleImageClient.createImage, {
    onSuccess: () => {
      toast.success(t('common:successfully-uploaded'));
      queryClient.invalidateQueries(API_ENDPOINTS.FLASH_SALE_IMAGES);
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.FLASH_SALE_IMAGES);
    },
  });
};



export const useDeleteImageMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(flashSaleImageClient.deleteImage, { 
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.FLASH_SALE_IMAGES);
    },
  });
};




export const useImageQuery = (id: number) => {
  const { data, error, isLoading } = useQuery<FlashSaleImage, Error>(
    [API_ENDPOINTS.FLASH_SALE_IMAGES, id],
    () => flashSaleImageClient.getById(id),
  );

  return {
    image: data,
    error,
    loading: isLoading,
  };
};

export const useImagesQuery = () => {
  const { data, error, isLoading } = useQuery<FlashSaleImage[], Error>(
    [API_ENDPOINTS.FLASH_SALE_IMAGES], 
    async () => {
      const response = await flashSaleImageClient.getAllImages();
      return response.result; 
    },
    {
      keepPreviousData: true,
    }
  );

  return {
    images: data ?? [], 
    error,
    loading: isLoading,
  };
};
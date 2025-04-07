import Router, { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { mapPaginatorData } from '@/utils/data-mappers';
import { API_ENDPOINTS } from './client/api-endpoints';
import { Routes } from '@/config/routes';
import { TagQueryOptions, GetParams, TagPaginator, Tag } from '@/types';
import { tagClient } from '@/data/client/tag';
import { Config } from '@/config';
import { stripeClient } from './client/stripe';

export const createVendorStripe = ({ id }: any) => {
  const { data, error, isLoading } = useQuery<Tag, Error>(['', { id }], () =>
    stripeClient.createStripeVendor({ id }),
  );
  return {
    data: data?.result,
    error,
    loading: isLoading,
  };
};

export const getStripeVendor = ({ stripeId }: any) => {
  const { data, error, isLoading } = useQuery<any, Error>(
    ['api/StripePaymentGateway/checkVendorAccountStatus', { stripeId }],
    () => stripeClient.checkVendorStatus({ stripeId: stripeId }),
  );
  return {
    data: data?.result,
    error,
    loading: isLoading,
  };
};

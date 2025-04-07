import Router, { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { Routes } from '@/config/routes';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { Attribute, AttributeQueryOptions, GetParams } from '@/types';
import { attributeClient } from '@/data/client/attribute';
import { Config } from '@/config';
import { STORE_OWNER, SUPER_ADMIN } from '@/utils/constants';
import { getAuthCredentials } from '@/utils/auth-utils';
import { modelClient } from '@/data/client/model';
import { engineClient } from '@/data/client/engine';

export const useCreateEngineMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { t } = useTranslation();

  return useMutation(engineClient.createEngine, {
    onSuccess: () => {
      router.back();
      toast.success(t('common:successfully-created'));
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.ENGINES);
    },
    onError: (error) => {
      toast.error(t('common:error-occurred-while-creating-engine'));
      console.error('Error while creating engine:', error);
    },
  });
};

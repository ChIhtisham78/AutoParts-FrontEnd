import Card from '@/components/common/card';
import { chatbotAutoSuggestionForFAQs } from '@/components/faqs/faqs-ai-prompts';
import { faqsValidationSchema } from '@/components/faqs/faqs-validation-schema';
import OpenAIButton from '@/components/openAI/openAI.button';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Input from '@/components/ui/input';
import { useModalAction } from '@/components/ui/modal/modal.context';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import RichTextEditor from '@/components/ui/wysiwyg-editor/editor';
import { Config } from '@/config';
import {
  useUpdateHomePageMutation,
  useUpdateHomePages,
} from '@/data/affiliatePage';
import { useCreateFaqsMutation, useUpdateFaqsMutation } from '@/data/faqs';
import { useSettingsQuery } from '@/data/settings';
import { useShopQuery } from '@/data/shop';
import { useMeQuery } from '@/data/user';
import { CustomPages, FAQs, ItemProps } from '@/types';
import { getAuthCredentials } from '@/utils/auth-utils';
import { getErrorMessage } from '@/utils/form-error';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  title: string;
  description?: string;
  slug: string;
};

type IProps = {
  initialValues?: CustomPages | null;
};
export default function CreateOrUpdatePagesForm({ initialValues }: IProps) {
  // console.log('initialValues', initialValues);
  const router = useRouter();
  const { t } = useTranslation();
  const { locale } = router;
  const {
    // @ts-ignore
    settings: { options },
  } = useSettingsQuery({
    language: locale!,
  });
  const { openModal } = useModalAction();

  const { data: shopData } = useShopQuery(
    { slug: router.query.shop as string },
    {
      enabled: !!router.query.shop,
    },
  );
  const shopId = shopData?.id!;

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues || {},
    // resolver: yupResolver(faqsValidationSchema),
  });

  const { mutate: createFAQs, isLoading: creating } = useCreateFaqsMutation();
  const { mutate: updateFAQs, isLoading: updating } = useUpdateHomePages();

  const faqName = watch('title');
  const autoSuggestionList = useMemo(() => {
    return chatbotAutoSuggestionForFAQs({ name: faqName ?? '' });
  }, [faqName]);

  useEffect(() => {
    if (initialValues) {
      reset(initialValues); // Dynamically update form when initialValues changes
    }
  }, [initialValues, reset]);

  const handleGenerateDescription = useCallback(() => {
    openModal('GENERATE_DESCRIPTION', {
      control,
      name: faqName,
      set_value: setValue,
      key: 'description',
      suggestion: autoSuggestionList as ItemProps[],
    });
  }, [faqName]);

  const onSubmit = async (values: FormValues) => {
    const inputValues = {
      language: router.locale,
      title: values.title,
      description: values.description,
      slug: values.slug,
    };
    try {
      if (!initialValues) {
        console.log('createFAQs');
        createFAQs({
          ...inputValues,
          shop_id: shopId,
        });
      } else {
        console.log('updateFAQs');
        updateFAQs({
          pageData: inputValues,
          id: initialValues.id,
        });
      }
    } catch (error) {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('Custom Page')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-title')}
            {...register('title')}
            error={t(errors.title?.message!)}
            variant="outline"
            className="mb-5"
            required={true}
            // disabled={isTranslateFaqs}
          />
          <Input
            label={t('form:input-label-slug')}
            {...register('slug')}
            error={errors.slug ? t(errors.slug.message!) : ''}
            variant="outline"
            // disabled={isSlugDisable}
            className="mb-5"
            required
          />

          <div className="relative">
            {/* {options?.useAi && (
              <div
                onClick={handleGenerateDescription}
                className="absolute right-0 z-10 text-sm font-medium cursor-pointer -top-1 text-accent hover:text-accent-hover"
              >
                Generate
              </div>
            )} */}

            {options?.useAi && (
              <OpenAIButton
                title={t('form:button-label-description-ai')}
                onClick={handleGenerateDescription}
              />
            )}

            <RichTextEditor
              title={t('form:input-label-description')}
              required={true}
              error={t(errors?.description?.message!)}
              name="description"
              control={control}
            />
          </div>
        </Card>
      </div>
      <StickyFooterPanel className="z-0">
        <div className="text-end">
          {initialValues && (
            <Button
              variant="outline"
              onClick={router.back}
              className="text-sm me-4 md:text-base"
              type="button"
            >
              {t('form:button-label-back')}
            </Button>
          )}

          <Button
            loading={creating || updating}
            disabled={creating || updating}
            className="text-sm md:text-base"
          >
            {initialValues
              ? t('Update Custom Home Page')
              : t('Add Custom Home')}
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
}

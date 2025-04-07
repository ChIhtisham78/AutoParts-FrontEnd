import Input from '@/components/ui/input';
import { useFieldArray, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Attribute } from '@/types';
import { useShopQuery } from '@/data/shop';

import { useState } from 'react';
import Alert from '@/components/ui/alert';
import { animateScroll } from 'react-scroll';
import { useCreateModelMutation } from '@/data/client/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { modelValidationSchema } from '@/components/models/model-validation-schema';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import ProductCategoryInput from '../product/product-category-input';
import { ModelsIcon } from '@/components/icons/sidebar/models';
import ProductManufacturerInput from '../product/product-manufacturer-input';
import { modelClient } from '@/data/client/model';
import { toast } from 'react-toastify';

type FormValues = {
  name?: string | null;
  values: any;
  manufacturer: any;
  model: string;
  categories: any;
  subcategory: string;
};

type IProps = {
  initialValues?: Attribute | null;
};

export default function CreateOrUpdateModelForm({ initialValues }: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSlugDisabled, setIsSlugDisabled] = useState<boolean>(true);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? initialValues
      : { model: '', manufacturer: null },
    //@ts-ignore
    resolver: yupResolver(modelValidationSchema),
    mode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'values',
  });
  const { mutate: createModel, isLoading: creating } = useCreateModelMutation();

  const onSubmit = (values: FormValues) => {
    const generatedSlug = values?.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    const data = {
      manufacturerId: values.manufacturer?.id || null, // Ensure manufacturerId is set correctly
      model: values.name || '',
      slug: generatedSlug,
    };

    if (!data.manufacturerId) {
      setErrorMessage('Please select a valid manufacturer');
      animateScroll.scrollToTop();
      return;
    }

    if (
      !initialValues ||
      !initialValues.translated_languages.includes(router.locale!)
    ) {
      createModel(data);
    }
  };

  return (
    <>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
          <Description
            title={t('Select Manufacturer')}
            details={t('Select Manufacturers from here')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <ProductManufacturerInput control={control} setValue={setValue} />
            {errors.manufacturer && (
              <p className="mt-2 text-sm text-red-600">
                {t(errors.manufacturer.message)}
              </p>
            )}
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
          <Description
            title={t('Model')}
            details={`${
              initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')
            } ${t('Model name')}`}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />

          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={t('form:input-label-name')}
              {...register('name', { required: 'form:error-name-required' })}
              error={t(errors.name?.message!)} 
              variant="outline"
              className="mb-5"
            />

            {errors.model && (
              <p className="mt-2 text-sm text-red-600">
                {t(errors.model.message)}
              </p>
            )}
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
              loading={creating}
              disabled={creating}
              className="text-sm md:text-base"
            >
              {initialValues
                ? t('form:item-description-update')
                : t('form:item-description-add')}{' '}
              {t('Model')}
            </Button>
          </div>
        </StickyFooterPanel>
      </form>
    </>
  );
}

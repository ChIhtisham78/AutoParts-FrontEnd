import Input from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Alert from '@/components/ui/alert';
import { animateScroll } from 'react-scroll';
import { useCreateEngineMutation } from '@/data/client/engines';
import { yupResolver } from '@hookform/resolvers/yup';
import { engineValidationSchema } from '@/components/engines/engine-validation-schema';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import ProductModelInput from '../product/product-model-input';
import ProductSubCategoryInput from '../product/product-subcategory-input';
import ProductCategoryInput from '../product/product-category-input';
import ProductManufacturerInput from '../product/product-manufacturer-input';
import { Attribute } from '@/types';

type FormValues = {
  name?: string | null;
  manufacturer?: any;
  model: string;
  categories?: any;
  engine1: string;
  subcategory: string;
  year?: number;
  hollanderCode?: string;
};

type IProps = {
  initialValues?: Attribute | null;
};

export default function CreateOrUpdateEnginesForm({ initialValues }: IProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialValues
      ? initialValues
      : {
          year: null, // Set default year to null, since it's a number
          subcategory: null,
          model: null,
          engine1: '',
          manufacturer: null,
          categories: null,
        },
    resolver: yupResolver(engineValidationSchema),
  });
  const categoryValue = watch('categories');
  const manufacturerValue = watch('manufacturer');
  const { mutate: createEngine, isLoading: creating } =
    useCreateEngineMutation();

  const onSubmit = (values: FormValues) => {
    console.log('dsdsa');
    const generatedSlug = values?.engine1
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    const data = {
      manufacturerId: values.manufacturer?.id || null,
      modelId: values.model.id || '',
      slug: generatedSlug,
      categoryId: values.categories?.id || null,
      subcategoryId: values.subcategory?.id || null,
      year: values.year || null,
      engine1: values.engine1 || '',
      hollanderCode: values.hollanderCode || null,
    };
    if (!data.manufacturerId) {
      setErrorMessage('Please select a valid manufacturer');
      animateScroll.scrollToTop();
      return;
    }

    createEngine(data);
  };

  return (
    <>
      {errorMessage && (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
          <Description
            title={t('Select Manufacturer')}
            details={t('Select Manufacturer from here')}
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
            title={t('Select Models')}
            details={t('Select Models from here')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
             <ProductModelInput
          control={control}
          setValue={setValue}
          manufacturerId={manufacturerValue?.id}
        />{' '}
            {errors.model && (
              <p className="mt-2 text-sm text-red-600">
                {t(errors.model.message)}
              </p>
            )}
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
          <Description
            title={t('Category')}
            details={t('Select Category from here')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <ProductCategoryInput control={control} setValue={setValue} />
            {errors.categories && (
              <p className="mt-2 text-sm text-red-600">
                {t(errors.categories.message)}
              </p>
            )}
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
          <Description
            title={t('Subcategory')}
            details={t('Select Subcategory from here')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
          <ProductSubCategoryInput
          control={control}
          setValue={setValue}
          categoryId={categoryValue?.id}
        />
            {errors.subcategory && (
              <p className="mt-2 text-sm text-red-600">
                {t(errors.subcategory.message)}
              </p>
            )}
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
          <Description
            title={t('Year')}
            details={t('Enter the year of the engine')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={'Year'}
              {...register('year')}
              placeholder="2002"
              variant="outline"
              type="number"
              className="mb-5"
            />
            {errors.year && (
              <p className="mt-2 text-sm text-red-600">
                {t(errors.year.message)}
              </p>
            )}
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
          <Description
            title={t('Engine')}
            details={t('Enter the engine')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={'Engine'}
              {...register('engine1')}
              placeholder="1.7"
              variant="outline"
              className="mb-5"
            />
            {errors.engine1 && (
              <p className="mt-2 text-sm text-red-600">
                {t(errors.engine1.message)}
              </p>
            )}
          </Card>
        </div>

        <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
          <Description
            title={t('Hollander IC')}
            details={t('Enter Hollander IC number (optional)')}
            className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
          />
          <Card className="w-full sm:w-8/12 md:w-2/3">
            <Input
              label={'Hollander IC'}
              {...register('hollanderCode')}
              placeholder="640-10111"
              variant="outline"
              className="mb-5"
            />
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
              {t('Engine')}
            </Button>
          </div>
        </StickyFooterPanel>
      </form>
    </>
  );
}

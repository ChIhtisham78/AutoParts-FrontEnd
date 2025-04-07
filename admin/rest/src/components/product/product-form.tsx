import Input from '@/components/ui/input';
import TextArea from '@/components/ui/text-area';
import {
  useForm,
  useFieldArray,
  FormProvider,
  Controller,
} from 'react-hook-form';
import Button from '@/components/ui/button';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import Label from '@/components/ui/label';
import Radio from '@/components/ui/radio/radio';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import FileInput from '@/components/ui/file-input';
import { productValidationSchema } from '@/components/product/product-validation-schema';
import ProductVariableForm from '@/components/product/product-variable-form';
import ProductSimpleForm from '@/components/product/product-simple-form';
import ProductGroupInput from '@/components/product/product-group-input';
import ProductCategoryInput from '@/components/product/product-category-input';
import ProductTypeInput from '@/components/product/product-type-input';
import { ProductType, Product, ProductStatus } from '@/types';
import { useTranslation } from 'next-i18next';
import { useShopQuery } from '@/data/shop';
import cn from 'classnames';
import ProductTagInput from '@/components/product/product-tag-input';
import { Config } from '@/config';
import Alert from '@/components/ui/alert';
import { useEffect, useMemo, useRef, useState, lazy } from 'react';
import ProductAuthorInput from '@/components/product/product-author-input';
import ProductManufacturerInput from '@/components/product/product-manufacturer-input';
import { EditIcon } from '@/components/icons/edit';
import {
  getProductDefaultValues,
  getProductInputValues,
  ProductFormValues,
} from '@/components/product/form-utils';
import { getErrorMessage } from '@/utils/form-error';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/data/product';
import { isEmpty } from 'lodash';
import { adminOnly, getAuthCredentials, hasAccess } from '@/utils/auth-utils';
import { useSettingsQuery } from '@/data/settings';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useCallback } from 'react';
import OpenAIButton from '@/components/openAI/openAI.button';
import { ItemProps } from '@/types';
import { EyeIcon } from '@/components/icons/category/eyes-icon';
import { LongArrowPrev } from '@/components/icons/long-arrow-prev';
import Link from 'next/link';
import { formatSlug } from '@/utils/use-slug';
import ProductFlashSaleBox from '@/components/product/product-flash-sale-box';
import { UpdateIcon } from '@/components/icons/update';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import { ProductDescriptionSuggestion } from '@/components/product/product-ai-prompt';
import RichTextEditor from '@/components/ui/wysiwyg-editor/editor';
import TooltipLabel from '@/components/ui/tooltip-label';
import ProductSubCategoryInput from './product-subcategory-input';
import ProductModelInput from './product-model-input';
import ProductEngineInput from './product-engine-input';

type ProductFormProps = {
  initialValues?: Product | null;
};

export default function CreateOrUpdateProductForm({
  initialValues,
}: ProductFormProps) {
  const router = useRouter();
  const { query, locale } = router;
  const {
    // @ts-ignore
    settings: { options },
  } = useSettingsQuery({
    language: locale!,
  });
  const [isSlugDisable, setIsSlugDisable] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log('initialValues', initialValues);
  const { t } = useTranslation();
  const { openModal } = useModalAction();
  const { permissions } = getAuthCredentials();
  let permission = hasAccess(adminOnly, permissions);
  let statusList = [
    {
      label: 'form:input-label-under-review',
      id: 'under_review',
      value: ProductStatus.UnderReview,
    },
    {
      label: 'form:input-label-draft',
      id: 'draft',
      value: ProductStatus.Draft,
    },
  ];

  const { data: shopData } = useShopQuery(
    { slug: router.query.shop as string },
    {
      enabled: !!router.query.shop,
    },
  );
  // console.log(shopData, 'shopData');
  const shopId = shopData?.result.id!;
  console.log(shopId);
  const isNewTranslation = router?.query?.action === 'translate';
  const showPreviewButton =
    router?.query?.action === 'edit' && Boolean(initialValues?.slug);
  const isSlugEditable =
    router?.query?.action === 'edit' &&
    router?.locale === Config.defaultLanguage;
  const methods = useForm<ProductFormValues>({
    //@ts-ignore
    resolver: yupResolver(productValidationSchema),
    shouldUnregister: true,
    // @ts-ignore
    defaultValues: getProductDefaultValues(initialValues!, isNewTranslation),
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = methods;
  const imageValue = watch('image');
  const categoryValue = watch('categories');
  const subcategoryValue = watch('subcategory');
  const manufacturerValue = watch('manufacturer');
  const modelValue = watch('model');
  const tagsValue = watch('tags');

  const isButtonDisabled =
    !imageValue ||
    !imageValue?.message ||
    !manufacturerValue ||
    !tagsValue?.length;
  const upload_max_filesize = options?.server_info?.upload_max_filesize / 1024;

  const { mutate: createProduct, isLoading: creating } =
    useCreateProductMutation();

  const { mutate: updateProduct, isLoading: updating } =
    useUpdateProductMutation();

  const onSubmit = async (values: ProductFormValues) => {
    const inputValues = {
      language: router.locale,
      ...getProductInputValues(values, initialValues),
    };

    console.log('------->cat', values.categories);
    console.log('--------sub', values.subcategory);

    // console.log(values, 'values');
    const formattedValues: { [key: string]: any } = {
      productDto: {
        id: initialValues?.id ? initialValues.id : 0, // Assuming 0 for new products; use appropriate id for existing products
        name: values.name || '',
        slug: slugAutoSuggest,
        description: values.description || '',
        typeId: 0,
        manufacturerId: values.manufacturer?.id || 0,
        price: values.price || 0,
        shopId: shopId,
        salePrice: values.sale_price || 0,
        language: 'en',
        minPrice: values.min_price || 0,
        maxPrice: values.max_price || 0,
        sku: values.sku || '',
        quantity: values.quantity || 0,
        inStock: values.in_stock || false,
        isTaxable: values.is_taxable || false,
        shippingClassId: 0,
        status: values.status || '',
        productType: values.product_type?.value || '',
        unit: values.unit || '',
        height: values.height || 0,
        width: values.width || 0,
        length: values.length || 0,
        imageId: values.image?.id || 0,
        isDigital: values.is_digital || false,
        isExternal: values.is_external || false,
        externalProductUrl: values.external_product_url || '',
        externalProductButtonText: values.external_product_button_text || '',
        ratings: 0,
        totalReviews: 0,
        myReview: '',
        inWishlist: false,
        promotionalSliderId: 0,
        tagIds: values.tags?.map((tag: any) => tag.id) || [],
        createdAt: '2024-09-23T13:33:28.066Z',
        updatedAt: '2024-09-23T13:33:28.066Z',
        deletedAt: '2024-09-23T13:33:28.066Z',
        categoryId: values.categories?.id || 0,
        subCategoryId: values.subcategory?.id || 0,
        modelId: values.model?.id || 0,
        engineId: values.engine?.id || 1,
        model: values.model.label || '',
        mileage: values.mileage || 0,
        grade: values.grade || '',
        damage: values.damage || 0,
        trimLevel: values.trimLevel || '',
        engine: values.engine?.id || 1,
        transmission: values.transmission || '',
        drivetrain: values.driveTrain || '',
        newUsed: values.newUsed || '',
        oemPartNumber: values.oemPartNumber || '',
        partsLinkNumber: values.partsLinkNumber || '',
        hollanderIc: values.hollanderIc || '',
        stockNumber: values.stockNumber || '',
        tagNumber: values.tagNumber || '',
        location: values.location || '',
        site: values.site || '',
        vin: values.vin || '',
        core: values.core || 0,
        color: values.color || '',
      },
      imageDto: {
        id: 0,
        coverImage: values.image?.message || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      gallaryImageUrls: values.gallery?.map((img: any) => img.message) || [], // Assuming gallery URLs are needed
    };

    // console.log(formattedValues, 'formattedValues');
    const formData = new FormData();
    // Append all formatted values to formData
    for (const key in formattedValues) {
      if (formattedValues.hasOwnProperty(key)) {
        if (typeof formattedValues[key] === 'object') {
          for (const subKey in formattedValues[key]) {
            if (formattedValues[key].hasOwnProperty(subKey)) {
              formData.append(`${key}.${subKey}`, formattedValues[key][subKey]);
            }
          }
        } else {
          formData.append(key, formattedValues[key]);
        }
      }
    }

    try {
      if (!initialValues) {
        //@ts-ignore
        console.log('wow', formattedValues);
        createProduct(formData);
      } else {
        console.log('updating,', inputValues);
        //@ts-ignore
        updateProduct({
          ...formattedValues,
          id: initialValues.id!,
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
  const productName = watch('name');

  const productDescriptionSuggestionLists = useMemo(() => {
    return ProductDescriptionSuggestion({ name: productName ?? '' });
  }, [productName]);

  const handleGenerateDescription = useCallback(() => {
    openModal('GENERATE_DESCRIPTION', {
      control,
      name: productName,
      set_value: setValue,
      key: 'description',
      suggestion: productDescriptionSuggestionLists as ItemProps[],
    });
  }, [productName]);

  const slugAutoSuggest = formatSlug(watch('name'));
  if (Boolean(options?.isProductReview)) {
    if (permission) {
      if (initialValues?.status !== ProductStatus?.Draft) {
        statusList = [
          {
            label: 'form:input-label-published',
            id: 'published',
            value: ProductStatus.Publish,
          },
          {
            label: 'form:input-label-approved',
            id: 'approved',
            value: ProductStatus.Approved,
          },
          {
            label: 'form:input-label-rejected',
            id: 'rejected',
            value: ProductStatus.Rejected,
          },
          {
            label: 'form:input-label-soft-disabled',
            id: 'unpublish',
            value: ProductStatus.UnPublish,
          },
        ];
      } else {
        statusList = [
          {
            label: 'form:input-label-draft',
            id: 'draft',
            value: ProductStatus.Draft,
          },
        ];
      }
    } else {
      if (
        initialValues?.status === ProductStatus.Publish ||
        initialValues?.status === ProductStatus.Approved ||
        initialValues?.status === ProductStatus.UnPublish
      ) {
        {
          statusList = [
            {
              label: 'form:input-label-published',
              id: 'published',
              value: ProductStatus.Publish,
            },
            {
              label: 'form:input-label-unpublish',
              id: 'unpublish',
              value: ProductStatus.UnPublish,
            },
          ];
        }
      }
    }
  } else {
    statusList = [
      {
        label: 'form:input-label-published',
        id: 'published',
        value: ProductStatus.Publish,
      },
      {
        label: 'form:input-label-draft',
        id: 'draft',
        value: ProductStatus.Draft,
      },
    ];
  }

  const featuredImageInformation = (
    <span>
      {t('form:featured-image-help-text')} <br />
      {t('form:size-help-text')} &nbsp;
      <span className="font-bold">{upload_max_filesize} MB </span>
    </span>
  );

  const galleryImageInformation = (
    <span>
      {t('form:gallery-help-text')} <br />
      {t('form:size-help-text')} &nbsp;
      <span className="font-bold">{upload_max_filesize} MB </span>
    </span>
  );

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
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
            <Description
              title={t('form:featured-image-title')}
              details={featuredImageInformation}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="image" control={control} multiple={false} />
              {/* {errors.image?.message && (
                <p className="my-2 text-xs text-red-500">
                  {t(errors?.image?.message!)}
                </p>
              )} */}
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
            <Description
              title={t('form:gallery-title')}
              details={galleryImageInformation}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <FileInput name="gallery" control={control} />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
            <Description
              title={t('form:type-and-category')}
              details={t('form:type-and-category-help-text')}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              {/* <ProductGroupInput
                control={control}
                error={t((errors?.type as any)?.message)}
              /> */}
              <ProductCategoryInput control={control} setValue={setValue} />
              {/* <ProductAuthorInput control={control} /> */}
              <ProductSubCategoryInput
                control={control}
                setValue={setValue}
                categoryId={categoryValue?.id}
              />
              <ProductManufacturerInput control={control} setValue={setValue} />
              <ProductModelInput
                control={control}
                setValue={setValue}
                manufacturerId={manufacturerValue?.id}
              />
              <ProductEngineInput
                control={control}
                setValue={setValue}
                categoryId={categoryValue?.id}
                manufacturerId={manufacturerValue?.id}
                modelId={modelValue?.id}
                subcategoryId={subcategoryValue?.id}
              />
              <ProductTagInput control={control} setValue={setValue} />
            </Card>
          </div>

          <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
            <Description
              title={t('form:item-description')}
              details={`${
                initialValues
                  ? t('form:item-description-edit')
                  : t('form:item-description-add')
              } ${t('form:product-description-help-text')}`}
              className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
            />

            <Card className="w-full sm:w-8/12 md:w-2/3">
              <Input
                label={`${t('form:input-label-name')}*`}
                {...register('name')}
                error={t(errors.name?.message!)}
                variant="outline"
                className="mb-5"
              />

              {isSlugEditable ? (
                <div className="relative mb-5">
                  <Input
                    label={t('form:input-label-slug')}
                    {...register('slug')}
                    error={t(errors.slug?.message!)}
                    variant="outline"
                    disabled={isSlugDisable}
                  />
                  <button
                    className="absolute top-[27px] right-px z-0 flex h-[46px] w-11 items-center justify-center rounded-tr rounded-br border-l border-solid border-border-base bg-white px-2 text-body transition duration-200 hover:text-heading focus:outline-none"
                    type="button"
                    title={t('common:text-edit')}
                    onClick={() => setIsSlugDisable(false)}
                  >
                    <EditIcon width={14} />
                  </button>
                </div>
              ) : (
                <Input
                  label={t('form:input-label-slug')}
                  {...register('slug')}
                  value={slugAutoSuggest}
                  variant="outline"
                  className="mb-5"
                  disabled
                />
              )}
              <Input
                label={`${t('form:input-label-unit')}*`}
                {...register('unit')}
                error={t(errors.unit?.message!)}
                variant="outline"
                className="mb-5"
              />
              <div className="relative mb-5">
                {options?.useAi && (
                  <OpenAIButton
                    title={t('form:button-label-description-ai')}
                    onClick={handleGenerateDescription}
                  />
                )}
                <RichTextEditor
                  title={t('form:input-label-description')}
                  control={control}
                  name="description"
                  error={t(errors?.description?.message)}
                />
              </div>

              <div>
                <Label>{t('form:input-label-status')}</Label>
                {!isEmpty(statusList)
                  ? statusList?.map((status: any, index: number) => (
                      <Radio
                        key={index}
                        {...register('status')}
                        label={t(status?.label)}
                        id={status?.id}
                        value={status?.value}
                        className="mb-2"
                        disabled={
                          permission &&
                          initialValues?.status === ProductStatus?.Draft
                            ? true
                            : false
                        }
                      />
                    ))
                  : ''}
                {errors.status?.message && (
                  <p className="my-2 text-xs text-red-500">
                    {t(errors?.status?.message!)}
                  </p>
                )}
              </div>
            </Card>
          </div>

          <ProductSimpleForm initialValues={initialValues} />

          <StickyFooterPanel className="z-0">
            <div
              className={cn(
                'flex items-center',
                initialValues ? 'justify-between' : 'justify-end',
              )}
            >
              {initialValues && (
                <Button
                  variant="custom"
                  onClick={router.back}
                  className="!px-0 text-sm !text-body me-4 hover:!text-accent focus:ring-0 md:text-base"
                  type="button"
                  size="medium"
                >
                  <LongArrowPrev className="w-4 h-5 me-2" />
                  {t('form:button-label-back')}
                </Button>
              )}
              <div className="flex items-center">
                {showPreviewButton && (
                  <Link
                    href={`${process.env.NEXT_PUBLIC_SHOP_URL}/products/preview/${query.productSlug}`}
                    target="_blank"
                    className="inline-flex h-12 flex-shrink-0 items-center justify-center rounded border !border-accent bg-transparent px-5 py-0 text-sm font-semibold leading-none !text-accent outline-none transition duration-300 ease-in-out me-4 hover:border-accent hover:bg-accent hover:!text-white focus:shadow focus:outline-none focus:ring-1 focus:ring-accent-700 md:text-base"
                  >
                    <EyeIcon className="w-4 h-4 me-2" />
                    {t('form:button-label-preview-product-on-shop')}
                  </Link>
                )}
                <Button
                  loading={updating || creating}
                  disabled={isButtonDisabled}
                  size="medium"
                  className="text-sm md:text-base"
                >
                  {initialValues ? (
                    <>
                      <UpdateIcon className="w-5 h-5 shrink-0 ltr:mr-2 rtl:pl-2" />
                      <span className="sm:hidden">
                        {t('form:button-label-update')}
                      </span>
                      <span className="hidden sm:block">
                        {t('form:button-label-update-product')}
                      </span>
                    </>
                  ) : (
                    t('form:button-label-add-product')
                  )}
                </Button>
              </div>
            </div>
          </StickyFooterPanel>
        </form>
      </FormProvider>
    </>
  );
}

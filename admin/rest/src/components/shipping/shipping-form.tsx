import Input from '@/components/ui/input';
import { useForm, useWatch } from 'react-hook-form';
import Button from '@/components/ui/button';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import Radio from '@/components/ui/radio/radio';
import Label from '@/components/ui/label';
import { ShippingType, Shipping, ShippingInput } from '@/types';
import {
  useCreateShippingMutation,
  useUpdateShippingMutation,
} from '@/data/shipping';
import { yupResolver } from '@hookform/resolvers/yup';
import { shippingValidationSchema } from './shipping-validation-schema';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import { useShopQuery } from '@/data/shop';

const defaultValues = {
  name: '',
  small_amount: 0,
  medium_amount: 0,
  large_amount: 0,
};

type IProps = {
  initialValues?: Shipping | undefined | null;
};

export default function CreateOrUpdateShippingForm({ initialValues }: IProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShippingInput>({
    shouldUnregister: true,
    //@ts-ignore
    resolver: yupResolver(shippingValidationSchema),
    defaultValues: initialValues ?? defaultValues,
  });
  const { mutate: createShippingClass, isLoading: creating } =
    useCreateShippingMutation();
  const { mutate: updateShippingClass, isLoading: updating } =
    useUpdateShippingMutation();

  const { data: shopData } = useShopQuery(
    { slug: router.query.shop as string },
    {
      enabled: !!router.query.shop,
    },
  );
  // console.log(shopData, 'shopData');
  const shopId = shopData?.result.id!;
  const onSubmit = async (values: ShippingInput) => {
    if (initialValues) {
      updateShippingClass({ id: initialValues.id!, ...values });
    } else {
      // Define each shipping class size as individual objects
      const smallShipping = { id: 0, shopId: shopId, size: 'small', price: values.small_amount };
      const mediumShipping = { id: 0, shopId: shopId, size: 'medium', price: values.medium_amount };
      const largeShipping = { id: 0, shopId: shopId, size: 'large', price: values.large_amount };
  
      try {
        await createShippingClass(smallShipping);
        await createShippingClass(mediumShipping);
        await createShippingClass(largeShipping);
      } catch (error) {
        console.error("Error creating shipping class:", error);
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap my-5 sm:my-8">
        <Description
          title={t('form:item-description')}
          details={`${
            initialValues
              ? t('form:item-description-update')
              : t('form:item-description-add')
          } ${t('form:shipping-form-info-help-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />
        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={'Shipping Charges against Small products'}
            {...register('small_amount')}
            type="number"
            error={t(errors.small_amount?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={'Shipping Charges against Medium products'}
            {...register('medium_amount')}
            type="number"
            error={t(errors.medium_amount?.message!)}
            variant="outline"
            className="mb-5"
          />
          <Input
            label={'Shipping Charges against Large products'}
            {...register('large_amount')}
            type="number"
            error={t(errors.large_amount?.message!)}
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
            loading={creating || updating}
            disabled={creating || updating}
            className="text-sm md:text-base"
          >
            {initialValues
              ? t('form:button-label-update')
              : t('form:button-label-add')}{' '}
            {t('form:button-label-shipping')}
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
}

{
  /* <Input
label={t('form:input-label-name')}
{...register('name', { required: 'Name is required' })}
error={t(errors.name?.message!)}
variant="outline"
className="mb-5"
/>

<div className="mb-5">
<Label>{t('form:input-label-type')}</Label>
<Radio
  label={t('form:input-label-free')}
  {...register('type')}
  id="FREE"
  value={ShippingType.Free}
  className="mb-2"
/>
<Radio
  label={t('form:input-label-fixed')}
  {...register('type')}
  id="FIXED"
  value={ShippingType.Fixed}
  className="mb-2"
/>
<Radio
  label={t('form:input-label-percentage')}
  {...register('type')}
  id="PERCENTAGE"
  value={ShippingType.Percentage}
/>
</div>
{type !== ShippingType.Free && (
<Input
  label={t('form:input-label-amount')}
  {...register('amount')}
  type="number"
  error={t(errors.amount?.message!)}
  variant="outline"
  className="mb-5"
/>
)} */
}

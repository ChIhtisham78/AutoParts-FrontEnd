import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import Label from '@/components/ui/forms/label';
import Radio from '@/components/ui/forms/radio/radio';
import { Controller } from 'react-hook-form';
import TextArea from '@/components/ui/forms/text-area';
import { useTranslation } from 'next-i18next';
import * as yup from 'yup';
import { useModalState } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import { AddressType } from '@/framework/utils/constants';
import { GoogleMapLocation } from '@/types';
import { useUpdateUserAddress } from '@/framework/user';
import GooglePlacesAutocomplete from '@/components/form/google-places-autocomplete';
import { useSettings } from '@/framework/settings';
import { useAtom } from 'jotai';
import { setNewAddress } from '@/lib/constants';

type FormValues = {
  title: string;
  type: AddressType;
  address: {
    id: number;
    country: string;
    city: string;
    state: string;
    zip: string;
    streetAddress: string;
  };
  location: GoogleMapLocation;
};

const addressSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf([AddressType.Billing, AddressType.Shipping])
    .required('error-type-required'),
  title: yup.string().required('error-title-required'),
  address: yup.object().shape({
    country: yup.string().required('error-country-required'),
    city: yup.string().required('error-city-required'),
    state: yup.string().required('error-state-required'),
    zip: yup.string().required('error-zip-required'),
    streetAddress: yup.string().required('error-street-required'),
  }),
});

export const AddressForm: React.FC<any> = ({
  onSubmit,
  defaultValues,
  isLoading,
  isShippingSaved = false, // Flag to indicate whether shipping is saved
}) => {
  const { t } = useTranslation('common');
  const { settings } = useSettings();

  return (
    <Form<FormValues>
      onSubmit={onSubmit}
      className="grid h-full grid-cols-2 gap-5"
      //@ts-ignore
      validationSchema={addressSchema}
      useFormProps={{
        shouldUnregister: true,
        defaultValues,
      }}
      resetValues={defaultValues}
    >
      {({ register, control, getValues, setValue, watch, formState: { errors } }) => {
        const selectedType = watch('type');
        const addressValues = getValues('address');
        return (
          <>
            <div>
              <Label>{t('text-type')}</Label>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <Radio
                  id="billing"
                  {...register('type')}
                  type="radio"
                  value={AddressType.Billing}
                  label={t('text-billing')}
                />
                <Radio
                  id="shipping"
                  {...register('type')}
                  type="radio"
                  value={AddressType.Shipping}
                  label={t('text-shipping')}
                />
              </div>
            </div>

            {/* Common Fields for both Shipping and Billing */}
            <Input
              label={t('text-title')}
              {...register('title')}
              error={t(errors.title?.message!)}
              variant="outline"
              className="col-span-2"
            />

            <TextArea
              label={t('text-street-address')}
              {...register('address.streetAddress')}
              error={t(errors.address?.streetAddress?.message!)}
              variant="outline"
              className="col-span-2"
            />

            {settings?.useGoogleMap && (
              <div className="col-span-2">
                <Label>{t('text-location')}</Label>
                <Controller
                  control={control}
                  name="location"
                  render={({ field: { onChange } }) => (
                    <GooglePlacesAutocomplete
                      register={register}
                      onChange={(location: any) => {
                        onChange(location);
                        setValue('address.country', location?.country);
                        setValue('address.city', location?.city);
                        setValue('address.state', location?.state);
                        setValue('address.zip', location?.zip);
                        setValue('address.streetAddress', location?.streetAddress);
                      }}
                      data={getValues('location')!}
                    />
                  )}
                />
              </div>
            )}

            {/* Other Address Fields */}
            <Input
              label={t('text-country')}
              {...register('address.country')}
              error={t(errors.address?.country?.message!)}
              variant="outline"
            />
            <Input
              label={t('text-city')}
              {...register('address.city')}
              error={t(errors.address?.city?.message!)}
              variant="outline"
            />
            <Input
              label={t('text-state')}
              {...register('address.state')}
              error={t(errors.address?.state?.message!)}
              variant="outline"
            />
            <Input
              label={t('text-zip')}
              {...register('address.zip')}
              error={t(errors.address?.zip?.message!)}
              variant="outline"
            />

            <Button
              className="w-full col-span-2"
              loading={isLoading}
              disabled={isLoading}
            >
              {Boolean(defaultValues) ? t('text-update') : t('text-save')} {t('text-address')}
            </Button>
          </>
        );
      }}
    </Form>
  );
};

export default function CreateOrUpdateAddressForm() {
  const { t } = useTranslation('common');
  const {
    data: { customerId, address, type },
  } = useModalState();
  const { mutate: updateProfile } = useUpdateUserAddress();
  const [oldAddress, setAddress] = useAtom(setNewAddress);

  const onSubmit = (values: FormValues) => {
    const formattedInput = {
      id: address?.id ? address?.id : 0,
      title: values.title,
      type: values.type,
      isDefault: 0,
      address: {
        ...values.address,
      },
      location: values.location,
    };

    updateProfile({
      id: customerId,
      userId:3,
      address: formattedInput,
    });

    setAddress([...oldAddress, formattedInput]);
  };

  return (
    <div className="min-h-screen p-5 bg-light sm:p-8 md:min-h-0 md:rounded-xl">
      <h1 className="mb-4 text-lg font-semibold text-center text-heading sm:mb-6">
        {address ? t('text-update') : t('text-add-new')} {t('text-address')}
      </h1>
      <AddressForm
        onSubmit={onSubmit}
        isShippingSaved={!!address} 
        defaultValues={{
          title: address?.title ?? '',
          type: address?.type ?? type,
          address: {
            city: address?.address?.city ?? '',
            country: address?.address?.country ?? '',
            state: address?.address?.state ?? '',
            zip: address?.address?.zip ?? '',
            streetAddress: address?.address?.streetAddress ?? '',
            ...address?.address,
          },
          location: address?.location ?? '',
        }}
      />
    </div>
  );
}

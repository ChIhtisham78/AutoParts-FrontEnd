import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { Control, useWatch, useFormState } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import {
  useEngines,
  useMake,
  useManufacturers,
} from '@/framework/manufacturer';
import { useRouter } from 'next/router';

interface Props {
  control: Control<any>;
  setValue: any;
}

const ProductManufacturerInput = ({ control, setValue }: Props) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const type = useWatch({
    control,
    name: 'type',
  });
  const { dirtyFields } = useFormState({
    control,
  });

  useEffect(() => {
    if (type?.slug && dirtyFields?.type) {
      setValue('manufacturer', []);
    }
  }, [type?.slug]);

  const { manufacturers, isLoading } = useManufacturers({
    limit: 1000,
    is_approved: true,
    ...(type && {
      type: type?.slug,
    }),
    language: locale,
  });

  // Sort manufacturers alphabetically by name
  const sortedManufacturers = manufacturers
    ? [...manufacturers].sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <div>
      <Label>{t('Make')}</Label>
      <SelectInput
        name="manufacturer"
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={sortedManufacturers}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductManufacturerInput;

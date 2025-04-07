import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { Control, useWatch, useFormState } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useMake } from '@/framework/manufacturer';
import { useRouter } from 'next/router';

interface Props {
  control: Control<any>;
  setValue: any;
  manufacturerId?: any;
}

const ProductModelInput = ({ control, setValue, manufacturerId }: Props) => {
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
  }, [type?.slug, dirtyFields, setValue]);

  const { make, isLoading } = useMake({
    limit: 1000,
    manufacturerId: manufacturerId,
  });

  const sortedMake = make
    ? [...make].sort((a, b) => a.model.localeCompare(b.model))
    : [];

  return (
    <div>
      <Label>{t('Models')}</Label>
      <SelectInput
        name="model"
        control={control}
        getOptionLabel={(option: any) => option.model}
        getOptionValue={(option: any) => option.id}
        options={manufacturerId ? sortedMake : []} 
        isLoading={isLoading}
        isDisabled={!manufacturerId}
        className={!manufacturerId ? 'disabled-class' : ''}
      />
    </div>
  );
};

export default ProductModelInput;

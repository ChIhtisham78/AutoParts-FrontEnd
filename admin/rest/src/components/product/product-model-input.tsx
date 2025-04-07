import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { Control, useWatch, useFormState } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useManufacturersQuery, useModelsQuery } from '@/data/manufacturer';
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
  }, [type?.slug]);

  const { models, loading } = useModelsQuery({
    limit: 1000,
    manufacturerId: manufacturerId,
  });

  return (
    <div className="mb-5">
      <Label>{t('Models')}</Label>
      <SelectInput
        name="model"
        control={control}
        getOptionLabel={(option: any) => option.model}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={models}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductModelInput;

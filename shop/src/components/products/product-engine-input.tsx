import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { Control, useWatch, useFormState } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useEngines } from '@/framework/manufacturer';
import { useRouter } from 'next/router';

interface Props {
  control: Control<any>;
  setValue: any;
  manufacturerId?: any;
  categoryId?: any;
  modelId?: any;
  subcategoryId?: any;
}

const ProductEngineInput = ({
  control,
  setValue,
  manufacturerId,
  subcategoryId,
  modelId,
  categoryId,
}: Props) => {
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

  const { engines, loading } = useEngines({
    limit: 1000,
    manufacturerId: manufacturerId,
    categoryId: categoryId,
    modelId: modelId,
    subcategoryId: subcategoryId,
  });

  const sortedEngines = engines
    ? [...engines].sort((a, b) => a.engine1?.localeCompare(b.engine1))
    : [];

  return (
    <div>
      <Label>{t('Engine')}</Label>
      <SelectInput
        name="engine"
        control={control}
        getOptionLabel={(option: any) => option.engine1}
        getOptionValue={(option: any) => option.id}
        options={modelId ? sortedEngines : []} 
        isLoading={loading}
        isDisabled={!modelId} 
        className={!modelId ? 'disabled-class' : ''}
      />
    </div>
  );
};

export default ProductEngineInput;

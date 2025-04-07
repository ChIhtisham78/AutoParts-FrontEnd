import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { Control, useFormState, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCategories } from '@/framework/category';

interface Props {
  control: Control<any>;
  setValue: any;
  isMulti?: boolean; // Corrected the type to "boolean"
}

const ProductCategoryInput = ({
  control,
  setValue,
  isMulti = false,
}: Props) => {
  const { locale } = useRouter();
  const { t } = useTranslation('common');
  const type = useWatch({
    control,
    name: 'type',
  });
  const { dirtyFields } = useFormState({
    control,
  });

  useEffect(() => {
    if (type?.slug && dirtyFields?.type) {
      setValue('categories', []);
    }
  }, [type?.slug, dirtyFields, setValue]);

  const { categories, isLoading } = useCategories({
    limit: 999,
    type: type?.slug,
    language: locale,
  });

  const sortedCategories = categories
    ? [...categories].sort((a, b) => a.name?.localeCompare(b.name))
    : [];

  return (
    <div>
      <Label>{t('Categories')}</Label>
      <SelectInput
        name="categories"
        isMulti={isMulti}
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        options={sortedCategories}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProductCategoryInput;

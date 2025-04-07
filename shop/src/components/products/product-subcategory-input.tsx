import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { Control, useFormState, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useSubCategories } from '@/framework/category';

interface Props {
  control: Control<any>;
  setValue: any;
  isMulti?: boolean; 
  categoryId?: any;
}

const ProductSubCategoryInput = ({
  control,
  setValue,
  isMulti = false,
  categoryId,
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

  const { subCategories, isLoading } = useSubCategories({
    categoryId: categoryId,
    limit: 999,
    type: type?.slug,
    language: locale,
  });

  const sortedSubCategories = subCategories
    ? [...subCategories].sort((a, b) => a.subcategory?.localeCompare(b.subcategory))
    : [];

  return (
    <div>
      <Label>{t('Subcategory')}</Label>
      <SelectInput
        name="subcategory"
        control={control}
        getOptionLabel={(option: any) => option.subcategory}
        getOptionValue={(option: any) => option.id}
        options={categoryId ? sortedSubCategories : []} 
        isLoading={isLoading}
        isDisabled={!categoryId} 
        className={!categoryId ? 'disabled-class' : ''}
      />
    </div>
  );
};

export default ProductSubCategoryInput;

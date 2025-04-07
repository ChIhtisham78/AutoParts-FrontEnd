import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { Control, useFormState, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useCategoriesQuery } from '@/data/category';
import { useRouter } from 'next/router';
import { useAttributeQuery, useAttributesQuery } from '@/data/attributes';

interface Props {
  control: Control<any>;
  setValue: any;
  isMulti?: Boolean;
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
  }, [type?.slug]);

  const { attributes, loading } = useAttributesQuery({
    categoryId: categoryId,
    limit: 999,
    type: type?.slug,
    language: locale,
  });

  return (
    <div className="mb-5">
      <Label>{t('Subcategory')}</Label>
      <SelectInput
        name="subcategory"
        isMulti={isMulti}
        control={control}
        getOptionLabel={(option: any) => option.subcategory}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={attributes}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductSubCategoryInput;

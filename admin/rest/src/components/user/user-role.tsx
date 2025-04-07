import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { Control, useFormState, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

interface Props {
  control: Control<any>;
  setValue: any;
  isMulti?: boolean;
  IstoShowOnlyTwoRoles?: boolean; // Determines whether to show filtered roles
}

const UserRoleInput = ({
  control,
  setValue,
  isMulti = false,
  IstoShowOnlyTwoRoles = false, // Default value
}: Props) => {
  const { t } = useTranslation('common');

  // All available roles
  const allRoles = [
    { id: '1', name: 'super_admin' },
    { id: '2', name: 'billing_manager' },
    { id: '3', name: 'stock_manager' },
    { id: '4', name: 'store_owner' },
    { id: '5', name: 'customer' },
  ];

  const roles = IstoShowOnlyTwoRoles
    ? allRoles.filter((role) =>
        ['billing_manager', 'stock_manager'].includes(role.name)
      )
    : allRoles;

  const type = useWatch({
    control,
    name: 'type',
  });

  const { dirtyFields } = useFormState({
    control,
  });

  useEffect(() => {
    if (type?.slug && dirtyFields?.type) {
      setValue('roles', []);
    }
  }, [type?.slug]);

  return (
    <div className="mb-5">
      <Label>{t('Select Role')}</Label>
      <SelectInput
        name="roles"
        isMulti={isMulti}
        control={control}
        options={roles} 
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        isClearable
        placeholder={t('form:select-role')}
        noOptionsMessage={() => t('form:no-options')}
      />
    </div>
  );
};

export default UserRoleInput;

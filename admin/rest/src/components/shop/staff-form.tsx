import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { useForm, useWatch } from 'react-hook-form';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useShopQuery } from '@/data/shop';
import { useAddStaffMutation } from '@/data/staff';
import { passwordRules } from '@/utils/constants';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import UserRoleInput from '../user/user-role';
import { useRegisterMutation } from '@/data/user';

type FormValues = {
  name: string;
  email: string;
  password: string;
  roles: { id: string; name: string }; // Match the role structure with the User Form
};

const staffFormSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  password: yup
    .string()
    .required('form:error-password-required')
    .matches(passwordRules, {
      message:
        'Please create a stronger password. hint: Min 8 characters, 1 Upper case letter, 1 Lower case letter, 1 Numeric digit.',
    }),
  roles: yup
    .object()
    .shape({
      id: yup.string().required('Role is required'),
      name: yup.string(),
    })
    .nullable(),
});

const AddStaffForm = () => {
  const router = useRouter();
  const {
    query: { shop },
  } = router;
  const { data: shopData } = useShopQuery({
    slug: shop as string,
  });
  const shopId = shopData?.id!;
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(staffFormSchema),
  });

  const { mutate: addStaff, isLoading: loading } = useAddStaffMutation();
  const { t } = useTranslation();
  const filteredRoles = [
    { id: '2', name: 'billing_manager' },
    { id: '3', name: 'stock_manager' },
  ];

  const selectedRole = useWatch({
    control,
    name: 'roles',
  });

  function onSubmit({ name, email, password, roles }: FormValues) {
    if (!roles) {
      setError('roles', {
        type: 'manual',
        message: 'Please select a role',
      });
      return;
    }

    addStaff(
      {
        name,
        email,
        password,
        shop_id: Number(shopId),
        permission: parseInt(roles.id), // Send the ID for permission
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: 'manual',
              message: error?.response?.data[field],
            });
          });
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:form-description-staff-info')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.name?.message!)}
            required
          />
          <Input
            label={t('form:input-label-email')}
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
            required
          />
          <PasswordInput
            label={t('form:input-label-password')}
            {...register('password')}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-4"
            required
          />
          <UserRoleInput
            control={control}
            setValue={setValue}
            options={filteredRoles}
            isMulti={false}
            IstoShowOnlyTwoRoles={true}
          />

          {errors.roles && (
            <p className="text-red-500 text-sm mt-1">
              {t(errors.roles.message!)}
            </p>
          )}
        </Card>
      </div>

      <StickyFooterPanel>
        <div className="text-end">
          <Button
            loading={loading}
            disabled={loading}
            className="text-sm md:text-base"
          >
            {t('form:button-label-add-staff')}
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
};

export default AddStaffForm;

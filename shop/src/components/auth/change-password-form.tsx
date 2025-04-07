import Button from '@/components/ui/button';
import PasswordInput from '@/components/ui/forms/password-input';
import type { ChangePasswordUserInput } from '@/types';
import { useTranslation } from 'next-i18next';
import { Form } from '@/components/ui/forms/form';
import { useChangePassword, useUser } from '@/framework/user';
import * as yup from 'yup';
import { getAuthCredentials } from '@/framework/utils/auth-utils';

export const changePasswordSchema = yup.object().shape({
  password: yup.string().required('error-new-password-required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'error-match-passwords')
    .required('error-confirm-password'),
});

export default function ChangePasswordForm() {
  const { t } = useTranslation('common');
  const {
    mutate: changePassword,
    isLoading: loading,
    formError,
  } = useChangePassword();

  const { me }: any = useUser();

  const { id } = getAuthCredentials();

  function onSubmit({ password, confirmPassword }: ChangePasswordUserInput) {
    const email = me.email;
    changePassword({
      email,
      password,
      confirmPassword,
    });
  }

  return (
    <Form<ChangePasswordUserInput & { passwordConfirmation: string }>
      onSubmit={onSubmit}
      validationSchema={changePasswordSchema}
      className="flex flex-col"
      serverError={formError}
    >
      {({ register, formState: { errors } }) => (
        <>
          <PasswordInput
            label={t('text-new-password')}
            {...register('password')}
            error={t(errors.password?.message!)}
            className="mb-5"
            variant="outline"
          />
          <PasswordInput
            label={t('text-confirm-password')}
            {...register('confirmPassword')}
            error={t(errors.confirmPassword?.message!)}
            className="mb-5"
            variant="outline"
          />
          <Button
            loading={loading}
            disabled={loading}
            className="ltr:ml-auto rtl:mr-auto"
          >
            {t('text-submit')}
          </Button>
        </>
      )}
    </Form>
  );
}

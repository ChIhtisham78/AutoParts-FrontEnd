import { useRouter } from 'next/router';
import Button from '@/components/ui/button';
import PasswordInput from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';
import Input from '@/components/ui/input';

interface Props {
  onSubmit: (values: { email: string; password: string; confirmPassword: string }) => void;
  loading: boolean;
}

const schema = yup.object().shape({
  email: yup.string().required('form:error-email-required'),
  password: yup.string().required('form:error-password-required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('form:error-password-required'),
});

const EnterNewPasswordView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { email } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string; confirmPassword: string }>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: email as string || '', 
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3">
          <Input
            label={t('Email')}
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-5"
            placeholder="demo@demo.com"
            error={t(errors.email?.message!)}
            disabled={true} 
          />
          <PasswordInput
            label={t('New Password')}
            {...register('password')}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-5 w-full"
          />
          <PasswordInput
            label={t('Confirm Password')}
            {...register('confirmPassword')}
            error={t(errors.confirmPassword?.message!)}
            variant="outline"
            className="mb-5 w-full"
          />
          <Button className="h-11 w-full" loading={loading} disabled={loading}>
            {t('Reset Password')}
          </Button>
          {errors.confirmPassword && (
            <p className="text-red-500 mt-2">{t(errors.confirmPassword.message!)}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default EnterNewPasswordView;

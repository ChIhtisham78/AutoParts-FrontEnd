import Button from '@/components/ui/button';
import Input from '@/components/ui/forms/input';
import TextArea from '@/components/ui/forms/text-area';
import { useContact } from '@/framework/user';
import type { CreateContactUsInput } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';

const superAdminContactFormSchema = yup.object().shape({
  name: yup.string().required('error-name-required'),
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
  subject: yup.string().required('error-subject-required'),
  description: yup.string().required('error-description-required'),
});

type SuperAdminContactFormProps = {
  variant?: 'default' | 'drawer';
};

const SuperAdminContactForm: React.FC<SuperAdminContactFormProps> = ({
  variant = 'default',
}) => {
  const { t } = useTranslation('common');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateContactUsInput>({
    shouldUnregister: true,
    resolver: yupResolver(superAdminContactFormSchema),
  });
  const { mutate, isLoading } = useContact({ reset });

  async function onSubmit(values: CreateContactUsInput) {
    mutate(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={twMerge(
          classNames(
            'grid grid-cols-1 gap-6',
            variant === 'default' ? 'sm:grid-cols-2' : '',
          ),
        )}
      >
        <Input
          label={t('text-name')}
          {...register('name')}
          variant="outline"
          error={t(errors.name?.message!)}
          disabled={isLoading}
        />
        <Input
          label={t('text-email')}
          {...register('email')}
          type="email"
          variant="outline"
          error={t(errors.email?.message!)}
          disabled={isLoading}
        />
      </div>
      <Input
        label={t('text-subject')}
        {...register('subject')}
        variant="outline"
        className="my-6"
        error={t(errors.subject?.message!)}
        disabled={isLoading}
      />
      <TextArea
        label={t('text-description')}
        {...register('description')}
        variant="outline"
        className="my-6"
        error={t(errors.description?.message!)}
        disabled={isLoading}
      />

      <Button loading={isLoading} disabled={isLoading}>
        {t('text-submit')}
      </Button>
    </form>
  );
};

export default SuperAdminContactForm;

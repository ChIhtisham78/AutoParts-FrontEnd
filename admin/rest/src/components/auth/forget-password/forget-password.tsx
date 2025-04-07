import { useState } from 'react';
import Alert from '@/components/ui/alert';
import {
  useForgetPasswordMutation,
  useVerifyForgetPasswordTokenMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} from '@/data/user';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const EnterEmailView = dynamic(() => import('./enter-email-view'));
const EnterNewPasswordView = dynamic(() => import('./enter-new-password-view'));

const ForgotPassword = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mutate: forgetPassword, isLoading } = useForgetPasswordMutation();
  const [errorMsg, setErrorMsg] = useState<string | null | undefined>('');
  const [verifiedEmail, setVerifiedEmail] = useState('');

  function handleEmailSubmit({ email }: { email: string }) {
    forgetPassword(
      { email }, 
      {
        onSuccess: (data) => {
          router.push('https://www.easypartshub.com/');
          console.log('Forget Password Success:', data);
          if (data?.success) {
            setVerifiedEmail(email);
          } else {
            setErrorMsg(data?.message);
          }
        },
        onError: (error) => {
          console.error('Forget Password Error:', error);
          setErrorMsg('Something went wrong');
        },
      }
    );
  }
  

  // function handleResetPassword({ email, password, confirmPassword }: { email: string; password: string; confirmPassword: string; }) {
  //   changePassword(
  //     {
  //       email,
  //       password,
  //       confirmPassword,
  //     },
  //     {
  //       onSuccess: (data) => {
  //         if (data?.success) {
  //           Router.push('/');
  //         } else {
  //           setErrorMsg(data?.message);
  //         }
  //       },
  //     }
  //   );
  // }

  return (
    <>
      {errorMsg && (
        <Alert
          variant="error"
          message={t(`common:${errorMsg}`)}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg('')}
        />
      )}
      {!verifiedEmail && (
        <EnterEmailView loading={isLoading} onSubmit={handleEmailSubmit} />
      )}
  
      {/* {verifiedEmail && (
        <EnterNewPasswordView
          loading={resetting}
          onSubmit={handleResetPassword}
        />
      )} */}
    </>
  );
};

export default ForgotPassword;

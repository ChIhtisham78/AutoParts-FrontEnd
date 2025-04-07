import EnterNewPasswordView from '@/components/auth/forget-password/enter-new-password-view'
import { useChangePasswordMutation } from '@/data/user';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

export default function index() {
    const { mutate: changePassword, isLoading: resetting } =
    useChangePasswordMutation();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null | undefined>('');

    function handleResetPassword({ email, password, confirmPassword }: { email: string; password: string; confirmPassword: string; }) {
      changePassword(
        {
          email,
          password,
          confirmPassword,
        },
        {
          onSuccess: (data) => {
            if (data?.success) {
              router.push('/');
            } else {
              setErrorMsg(data?.message);
            }
          },
        }
      );
    }
  
  return (
    <div>
     <EnterNewPasswordView
          loading={resetting}
          onSubmit={handleResetPassword}
        />
    </div>
  )
}

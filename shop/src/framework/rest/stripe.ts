import { toast } from 'react-toastify';
import client from './client';
import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

export function createStripeCheckoutSession() {
  const router = useRouter();
  const { mutate: createCheckoutSession, isLoading } = useMutation(
    client.stripe.createCheckoutSession,
    {
      onSuccess: (res) => {
        toast.success('Pay now');
        router.push(res.message);
      },
    },
  );
  return {
    createCheckoutSession,
    isLoading,
  };
}

import { getLayout } from '@/components/layouts/layout';
import Order from '@/components/orders/order-view';
import Seo from '@/components/seo/seo';
import { useEffect } from 'react';
import { PaymentStatus } from '@/types';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useOrder } from '@/framework/order';
import { useRouter } from 'next/router';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useSettings } from '@/framework/settings';

export { getServerSideProps } from '@/framework/order.ssr';

export default function OrderPage() {
  const { settings } = useSettings();
  const { openModal } = useModalAction();
  const { query } = useRouter();
  console.log(query.tracking_number);
  const { order, isLoading, isFetching } = useOrder({
    id: query.tracking_number!.toString(),
  });

  console.log('woow', order);

  // @ts-ignore
  const { paymentStatus, payment_intent, tracking_number } = order ?? {};
  const isPaymentModalEnabled =
    paymentStatus === PaymentStatus.PENDING &&
    payment_intent?.payment_intent_info &&
    !payment_intent?.payment_intent_info?.is_redirect;

  useEffect(() => {
    if (isPaymentModalEnabled) {
      openModal('PAYMENT_MODAL', {
        paymentGateway: payment_intent?.payment_gateway,
        paymentIntentInfo: payment_intent?.payment_intent_info,
        trackingNumber: tracking_number,
      });
    }
  }, [paymentStatus, payment_intent?.payment_intent_info]);

  if (isLoading) {
    return <Spinner showText={false} />;
  }

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Order
        settings={settings}
        order={order}
        loadingStatus={!isLoading && isFetching}
      />
    </>
  );
}

OrderPage.getLayout = getLayout;

import OrderNote from '@/components/checkout/order-note';
import { getLayout } from '@/components/layouts/layout';
import Seo from '@/components/seo/seo';
import { useUser } from '@/framework/user';
import { AddressType } from '@/framework/utils/constants';
import { setNewAddress } from '@/lib/constants';
import { billingAddressAtom, shippingAddressAtom } from '@/store/checkout';
import { User } from '@/types';
import { useAtom } from 'jotai';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';
export { getStaticProps } from '@/framework/general.ssr';

const ScheduleGrid = dynamic(
  () => import('@/components/checkout/schedule/schedule-grid'),
);
const AddressGrid = dynamic(
  () => import('@/components/checkout/address-grid'),
  { ssr: false },
);
const ContactGrid = dynamic(
  () => import('@/components/checkout/contact/contact-grid'),
  // { ssr: false }
);
const RightSideView = dynamic(
  () => import('@/components/checkout/right-side-view'),
  { ssr: false },
);

export default function CheckoutPage() {
  const { t } = useTranslation();
  const { me } = useUser();
  const { id, address, profile } = me ?? {};
  const [newAddress, setAddress] = useAtom(setNewAddress);
  useEffect(() => {
    // @ts-ignore
    setAddress(address);
  }, [address]);
  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <div className="bg-gray-100 px-4 py-8 lg:py-10 lg:px-8 xl:py-14 xl:px-16 2xl:px-20">
        <div className="m-auto flex w-full max-w-5xl flex-col items-center rtl:space-x-reverse lg:flex-row lg:items-start lg:space-x-8">
          <div className="w-full space-y-6 lg:max-w-2xl">
            <ContactGrid
              className="bg-light p-5 shadow-700 md:p-8"
              contact={profile?.contact}
              label={t('text-contact-number')}
              count={1}
            />

            <AddressGrid
              userId={id}
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-shipping-address')}
              count={2}
              //@ts-ignore
              addresses={newAddress?.filter(
                (item: any) => item?.type === AddressType.Shipping,
              )}
              //@ts-ignore
              atom={shippingAddressAtom}
              type={AddressType.Shipping}
            />

            <AddressGrid
              userId={id}
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-billing-address')}
              count={2}
              // @ts-ignore
              addresses={newAddress?.filter(
                (item: any) => item?.type === AddressType.Billing,
              )}
              //@ts-ignore
              atom={billingAddressAtom}
              type={AddressType.Billing}
            />

            {/* <ScheduleGrid
              className="bg-light p-5 shadow-700 md:p-8"
              label={t('text-delivery-schedule')}
              count={3}
            /> */}
            <OrderNote count={3} label={t('Order Note')} />
          </div>
          <div className="mt-10 mb-10 w-full sm:mb-12 lg:mb-0 lg:w-96">
            <RightSideView />
          </div>
        </div>
      </div>
    </>
  );
}
CheckoutPage.authenticationRequired = true;
CheckoutPage.getLayout = getLayout;

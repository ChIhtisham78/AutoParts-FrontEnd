import OwnerLayout from '@/components/layouts/owner';
import ShopForm from '@/components/shop/shop-form';
import { getStripeVendor } from '@/data/stripe';
import { adminAndOwnerOnly, getAuthCredentials } from '@/utils/auth-utils';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function CreateShopPage() {
  const router = useRouter();
  const { id, stripeVendorId, role } = getAuthCredentials();
  // const stripeVendorId = 'acct_1PQiPTRriyJykoz1 ';
  const { data } = getStripeVendor({ stripeId: stripeVendorId });
  if (!data?.chargesEnabled && role === 'admin') {
    toast.warn('Kindly set you Stripe account First');
    router.push('/');
  }
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-create-shop')}
        </h1>
      </div>
      <ShopForm />
    </>
  );
}
CreateShopPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
CreateShopPage.Layout = OwnerLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'form'])),
  },
});

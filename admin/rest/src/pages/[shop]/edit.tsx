import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ShopForm from '@/components/shop/shop-form';
import ShopLayout from '@/components/layouts/shop';
import {
  adminAndOwnerOnly,
  adminOnly,
  getAuthCredentials,
  hasAccess,
} from '@/utils/auth-utils';
import { useShopQuery } from '@/data/shop';
import { Routes } from '@/config/routes';
import { useMeQuery } from '@/data/user';

export default function UpdateShopPage() {
  const router = useRouter();
  const { permissions } = getAuthCredentials();
  const { data: meData } = useMeQuery();
  const me = meData?.result;
  const { query } = useRouter();
  const { shop } = query;
  const { t } = useTranslation();
  const {
    data: shopData,
    isLoading: loading,
    error,
  } = useShopQuery({
    slug: shop as string,
  });
  const data = shopData?.result;
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  if (
    !hasAccess(adminOnly, permissions) &&
    !me?.shops?.map((shop) => shop.id).includes(data?.id)
  ) {
    router.replace(Routes.dashboard);
  }
  return (
    <>
      <div className="flex py-5 border-b border-dashed border-border-base sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-shop')}
        </h1>
      </div>
      <ShopForm initialValues={data} />
    </>
  );
}
UpdateShopPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
UpdateShopPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});

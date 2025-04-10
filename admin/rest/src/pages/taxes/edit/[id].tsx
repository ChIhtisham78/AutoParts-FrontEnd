import Layout from '@/components/layouts/admin';
import { useRouter } from 'next/router';
import CreateOrUpdateTaxForm from '@/components/tax/tax-form';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTaxQuery } from '@/data/tax';
import { GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function UpdateTaxPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const { data, isLoading: loading, error } = useTaxQuery(query.id as string);
  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  // UpdateTaxPage
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          {t('text-update')} {t('text-tax')} #{data?.result?.id}
        </h1>
      </div>
      {data?.result && <CreateOrUpdateTaxForm initialValues={data.result} />}
    </>
  );
  
}
UpdateTaxPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});
export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

import { useTranslation } from 'next-i18next';
import Layout from '@/components/layouts/admin';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { adminOnly } from '@/utils/auth-utils';
import CareerOpportunitiesForm from '@/components/careerOpportunities/careerOpportunitiesForm';

export default function CareerOpportunitiesPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">{'Custom Pages'}</h1>
      </div>
      <CareerOpportunitiesForm />
    </>
  );
}
CareerOpportunitiesPage.authenticate = {
  permissions: adminOnly,
};
CareerOpportunitiesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});

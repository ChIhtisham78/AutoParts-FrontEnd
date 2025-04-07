
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layouts/admin';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreateOrUpdateTagForm from '@/components/tag/tag-form';
import { adminOnly } from '@/utils/auth-utils';
import CreateOrUpdateFlashSaleImageForm from '@/components/flashSaleImages/flashSaleForm';
import AffiliateProgramsForm from '@/components/affiliatePrograms/affiliateProgramsForm';
import CareerOpportunitiesForm from '@/components/careerOpportunities/careerOpportunitiesForm';
import RecallInformationForm from '@/components/recallInformation/recallInformationForm';

export default function RecallInformationPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          {('Recall Information')}
        </h1>
      </div>
      <RecallInformationForm />
    </>
  );
}
RecallInformationPage.authenticate = {
  permissions: adminOnly,
};
RecallInformationPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
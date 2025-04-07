
import { useTranslation } from 'next-i18next';
import Layout from '@/components/layouts/admin';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreateOrUpdateTagForm from '@/components/tag/tag-form';
import { adminOnly } from '@/utils/auth-utils';
import CreateOrUpdateFlashSaleImageForm from '@/components/flashSaleImages/flashSaleForm';
import AffiliateProgramsForm from '@/components/affiliatePrograms/affiliateProgramsForm';
import CareerOpportunitiesForm from '@/components/careerOpportunities/careerOpportunitiesForm';
import AccessibilityStatementForm from '@/components/accessibilityStatement/accessibilityStatementForm';

export default function AccessibilityStatementPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-gray-300 pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          {('Accessibility Statement')}
        </h1>
      </div>
      <AccessibilityStatementForm />
    </>
  );
}
AccessibilityStatementPage.authenticate = {
  permissions: adminOnly,
};
AccessibilityStatementPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});
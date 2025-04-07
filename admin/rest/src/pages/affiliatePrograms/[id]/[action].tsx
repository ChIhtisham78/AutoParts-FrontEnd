import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Config } from '@/config';
import { adminOnly } from '@/utils/auth-utils';
import { useRouter } from 'next/router';
import CreateOrUpdateFaqsForm from '@/components/faqs/faqs-form';

export default function UpdateFAQsPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-faq')}
        </h1>
      </div>
      <CreateOrUpdateFaqsForm />
    </>
  );
}

UpdateFAQsPage.authenticate = {
  permissions: adminOnly,
};

UpdateFAQsPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});

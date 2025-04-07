import Layout from '@/components/layouts/admin';
import CreateOrUpdateCategoriesForm from '@/components/category/category-form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import CreateOrUpdateModelForm from '@/components/models/model-form';
import CreateOrUpdateEnginesForm from '@/components/engines/engine-form';

export default function CreateEnginesPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base pb-5 md:pb-7">
        <h1 className="text-lg font-semibold text-heading">
          {t(' New Model Form')}
        </h1>
      </div>
      <CreateOrUpdateEnginesForm />
    </>
  );
}

CreateEnginesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});

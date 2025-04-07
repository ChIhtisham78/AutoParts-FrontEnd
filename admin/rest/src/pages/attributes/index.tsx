import Card from '@/components/common/card';
import Layout from '@/components/layouts/admin';
import AttributeList from '@/components/attribute/attribute-list';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SortOrder } from '@/types';
import { useState } from 'react';
import { adminOnly } from '@/utils/auth-utils';

import { useRouter } from 'next/router';
import { useAttributesQuery } from '@/data/attributes';
import PageHeading from '@/components/common/page-heading';
import LinkButton from '@/components/ui/link-button';
import { Routes } from '@/config/routes';

export default function AttributePage() {
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState('0');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { locale } = useRouter();

  const { attributes, loading, error } = useAttributesQuery({
    orderBy: parseInt(orderBy),
    sortedBy,
    language: locale,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <Card className="mb-12 flex flex-row items-center justify-between">
        {' '}
        {/* Increased margin-bottom */}
        <div className="md:w-1/4">
          <PageHeading title={t('Subcategories')} />
        </div>
        <LinkButton
          href={`${Routes.attribute.create}`}
          className="h-12 w-full md:w-auto md:ms-6"
        >
          <span className="block md:hidden xl:block">
            + {t('form:button-label-add-categories')}
          </span>
          <span className="hidden md:block xl:hidden">
            + {t('form:button-label-add')}
          </span>
        </LinkButton>
      </Card>

      <AttributeList
        attributes={attributes}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}

AttributePage.authenticate = {
  permissions: adminOnly,
};

AttributePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});

import { getLayoutWithFooter } from '@/components/layouts/layout-with-footer';
import Seo from '@/components/seo/seo';
import NotFound from '@/components/ui/not-found';
import { useRefundPolicies } from '@/framework/refund-policies';
import { LIMIT } from '@/lib/constants';
import { useTranslation } from 'next-i18next';
import PageBanner from '@/components/banners/page-banner';
import Terms from '@/components/terms/terms';
import ErrorMessage from '@/components/ui/error-message';
// import { getCustomerStaticProps as getStaticProps } from '@/framework/refund-policies.ssr';
import { RefundPolicy } from '@/types';
import CustomerPolicy from '@/components/terms/policy-hard-coded';
import ReturnPolicy from '@/components/terms/policy-hard-coded';
import { useRouter } from 'next/router';
import { usePageQuery } from '@/framework/pages';
// export { getStaticProps };

function CustomerRefundPolicyPage() {
  const { t } = useTranslation();
  const limit = LIMIT;
  const { query, locale } = useRouter();
  const { homepage, loading, error } = usePageQuery({
    id: query.id,
  });

  console.log(homepage);
  // const { refundPolicies, isLoading, error } = useRefundPolicies({
  //   target: 'customer',
  //   status: 'approved',
  //   limit,
  // });

  // if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <Seo title="Customer Refund Policies" url="refund-policies" />
      <section className="mx-auto min-h-screen bg-light w-full max-w-1920 pb-8 lg:pb-10 xl:pb-14">
        <PageBanner title={homepage?.title} breadcrumbTitle={t('home')} />
        {/* End of page header */}
        {/* <div className="mx-auto w-full max-w-screen-lg px-4 py-10">
          {!isLoading && !refundPolicies.length ? (
            <div className="min-h-full p-5 md:p-8 lg:p-12 2xl:p-16">
              <NotFound text="text-no-faq" className="h-96" />
            </div>
          ) : (
            <Terms isLoading terms={refundPolicies as RefundPolicy[]} />
          )}
        </div> */}
        <div className="lg:mx-[25%] mx-10">{homepage?.description}</div>
      </section>
    </>
  );
}

CustomerRefundPolicyPage.getLayout = getLayoutWithFooter;
export default CustomerRefundPolicyPage;

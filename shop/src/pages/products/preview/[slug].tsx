import { getLayout } from '@/components/layouts/layout';
import { AttributesProvider } from '@/components/products/details/attributes.context';
import ProductQuestions from '@/components/questions/product-questions';
import AverageRatings from '@/components/reviews/average-ratings';
import ProductReviews from '@/components/reviews/product-reviews';
import cn from 'classnames';
import Seo from '@/components/seo/seo';
import { useWindowSize } from '@/lib/use-window-size';
import type { NextPageWithLayout } from '@/types';
import isEmpty from 'lodash/isEmpty';
import type { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
/// <reference types="@types/node" />
import AccessDeniedPage from '@/components/common/access-denied';
// import { getStaticPaths, getStaticProps } from '@/framework/product.ssr';
import {
  adminOwnerAndStaffOnly,
  getAuthCredentials,
  hasAccess,
} from '@/framework/utils/auth-utils';
// export { getStaticPaths, getStaticProps };
//FIXME: typescript and layout
const Details = dynamic(() => import('@/components/products/details/details'));
const BookDetails = dynamic(
  () => import('@/components/products/details/book-details'),
);
const RelatedProducts = dynamic(
  () => import('@/components/products/details/related-products'),
);
const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false },
);

const ProductPage: NextPageWithLayout<InferGetStaticPropsType<any>> = ({
  product,
}: any) => {
  const { width } = useWindowSize();
  const { permissions } = getAuthCredentials();
  const AccessAdminRoles = hasAccess(adminOwnerAndStaffOnly, permissions);

  return (
    <>
      <Seo
        title={product.name}
        url={product.slug}
        images={!isEmpty(product?.image) ? [product.image] : []}
      />
      {AccessAdminRoles ? (
        <AttributesProvider>
          <div className="min-h-screen bg-light">
            {product.type?.slug === 'books' ? (
              <BookDetails product={product} />
            ) : (
              <>
                <Details product={product} />
                <AverageRatings
                  title={product?.name}
                  ratingCount={product?.rating_count}
                  totalReviews={product?.total_reviews}
                  ratings={product?.ratings}
                />
              </>
            )}

            <ProductReviews
              productId={product?.id}
              productType={product?.type?.slug}
            />
            <ProductQuestions
              productId={product?.id}
              shopId={product?.shop?.id}
              productType={product?.type?.slug}
            />
            {product.type?.slug !== 'books' &&
              product?.related_products?.length > 1 && (
                <div className="p-5 lg:p-14 xl:p-16">
                  <RelatedProducts
                    products={product.related_products}
                    currentProductId={product.id}
                    gridClassName="lg:grid-cols-4 2xl:grid-cols-5 !gap-3"
                  />
                </div>
              )}
          </div>
          {width > 1023 && <CartCounterButton />}
          <div className="sticky bottom-0 z-30 bg-white py-5 text-end backdrop-blur">
            <button
              className={cn(
                'inline-flex rounded  px-5 py-2.5 text-center font-semibold capitalize text-white',
                product.status === 'draft' ? 'bg-yellow-400' : 'bg-accent',
              )}
            >
              {product.status === 'publish' ? 'Published' : 'Drafted'}
            </button>
          </div>
        </AttributesProvider>
      ) : (
        <AccessDeniedPage />
      )}
    </>
  );
};

ProductPage.authenticationRequired = true;
ProductPage.getLayout = getLayout;
export default ProductPage;

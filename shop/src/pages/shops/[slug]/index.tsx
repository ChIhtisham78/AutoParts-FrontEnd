import { Image } from '@/components/ui/image';
import { useWindowSize } from '@/lib/use-window-size';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import ShopSidebar from '@/components/shops/sidebar';
import { productPlaceholder } from '@/lib/placeholders';
import ProductsGrid from '@/components/products/grid';
import { getLayout } from '@/components/layouts/layout';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { NextPageWithLayout } from '@/types';
import { InferGetStaticPropsType } from 'next';
import { useShop } from '@/framework/shop';
import { useProducts } from '@/framework/product';
// import { getStaticPaths, getStaticProps } from '@/framework/shop.ssr';
// export { getStaticPaths, getStaticProps };

const CartCounterButton = dynamic(
  () => import('@/components/cart/cart-counter-button'),
  { ssr: false },
);

// const ShopPage: NextPageWithLayout<
//   InferGetStaticPropsType<typeof getStaticProps>
// > = ({ shop, variables }) => {
const ShopPage = () => {
  const {
    query: { slug },
  } = useRouter();

  const { data: shopData } = useShop({ slug: slug as string });
  const shop = shopData?.result;

  const variables = {
    shopId: shop?.id,
  };

  const { width } = useWindowSize();
  const { t } = useTranslation('banner');

  console.log('Shop-->', shop);

  return (
    <div className="flex flex-col bg-gray-100 lg:flex-row lg:items-start lg:p-8">
      <ShopSidebar shop={shop} className="sticky top-24 lg:top-28" />

      <div className="flex flex-col w-full p-4 pb-12 lg:p-0 ltr:lg:pl-8 rtl:lg:pr-8">
        <div className="relative w-full h-full overflow-hidden rounded">
          <Image
            alt={t('heading')}
            src={shop?.coverImage ?? '/shop-fallback-cover-photo.png'}
            width={2340}
            height={870}
            className="w-full h-full"
          />
        </div>
        <ProductsGrid
          className="py-8"
          gridClassName={classNames(
            'grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3',
          )}
          variables={variables}
        />
      </div>
      {width > 1023 && <CartCounterButton />}
    </div>
  );
};

ShopPage.getLayout = getLayout;
export default ShopPage;

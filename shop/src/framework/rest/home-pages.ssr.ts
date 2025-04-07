import type {
  CategoryQueryOptions,
  HomePageProps,
  PopularProductQueryOptions,
  SettingsQueryOptions,
  TypeQueryOptions,
  BestSellingProductQueryOptions,
} from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import invariant from 'tiny-invariant';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';
import {
  CATEGORIES_PER_PAGE,
  PRODUCTS_PER_PAGE,
  TYPES_PER_PAGE,
} from './client/variables';

type ParsedQueryParams = {
  pages: string[];
};

const types = [
  {
    id: 9,
    name: 'Gadget',
    language: 'en',
    translated_languages: ['en'],
    slug: 'gadget',
    banners: [
      {
        id: 78,
        title: 'Gadget',
        type_id: 9,
        description:
          'Add your banner image with title and description from here. Dimension of the banner should be 1920 x 1080 px for full screen banner and 1500 x 450 px for small banner',
        image: {
          id: 2149,
          thumbnail: 'https://i.ibb.co/M1B6XCj/Eco-Parts.png',
          original:
            'https://quantino.tech/wp-content/uploads/2024/05/Eco-Parts.png',
        },
      },
    ],
    promotional_sliders: [],
    settings: {
      isHome: false,
      productCard: 'neon',
      layoutType: 'modern',
    },
    icon: 'Gadgets',
  },
];

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async ({
  locales,
}) => {
  invariant(locales, 'locales is not defined');

  const data = types;
  const paths = data?.flatMap(
    (type) =>
      locales?.map((locale) => ({ params: { pages: [type.slug] }, locale })),
  );
  // We'll pre-render only these paths at build time also with the slash route.
  return {
    paths: paths.concat(
      locales?.map((locale) => ({ params: { pages: [] }, locale })),
    ),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<
  HomePageProps,
  ParsedQueryParams
> = async ({ locale, params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.SETTINGS, { language: locale }],
    ({ queryKey }) => client.settings.all(queryKey[1] as SettingsQueryOptions),
  );

  const { pages } = params!;
  let pageType: string | undefined = 'gadget';

  if (!pages) {
    pageType =
      types.find((type) => type?.settings?.isHome)?.slug ?? types?.[0]?.slug;
  } else {
    pageType = pages[0];
  }

  if (!types?.some((t) => t.slug === pageType)) {
    return {
      notFound: true,
      // This is require to regenerate the page
      revalidate: 120,
    };
  }

  console.log('--->', pageType);

  const productVariables = {
    type: pageType,
    limit: PRODUCTS_PER_PAGE,
  };
  await queryClient.prefetchInfiniteQuery(
    [
      API_ENDPOINTS.PRODUCTS,
      { limit: PRODUCTS_PER_PAGE, type: pageType, language: locale },
    ],
    ({ queryKey }) => client.products.all(queryKey[1] as any),
  );

  const categoryVariables = {
    type: pageType,
    limit: CATEGORIES_PER_PAGE,
    language: locale,
    parent:
      types.find((t) => t.slug === pageType)?.settings.layoutType === 'minimal'
        ? 'all'
        : 'null',
  };
  await queryClient.prefetchInfiniteQuery(
    [API_ENDPOINTS.CATEGORIES, categoryVariables],
    ({ queryKey }) =>
      client.categories.all(queryKey[1] as CategoryQueryOptions),
  );
  return {
    props: {
      variables: {
        products: productVariables,
        categories: categoryVariables,
        layoutSettings: {
          ...types.find((t) => t.slug === pageType)?.settings,
        },
        types: {
          type: pageType,
        },
      },
      layout:
        types.find((t) => t.slug === pageType)?.settings.layoutType ??
        'default',
      ...(await serverSideTranslations(locale!, ['common', 'banner'])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};

/* Fix : locales: 14kB,
popularProducts: 30kB,
category: 22kB,
groups: 8kB,
group: 2kB,
settings: 2kB,
perProduct: 4.2 * 30 = 120kB,
total = 14 + 30 + 22 + 8 + 2 + 2 + 120 = 198kB
others: 225 - 198 = 27kB

 */

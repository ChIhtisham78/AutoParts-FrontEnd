import Banner from '@/components/banners/banner';
import Categories from '@/components/categories/categories';
import { Element } from 'react-scroll';
import ProductGridHome from '@/components/products/grids/home';
import FilterBar from './filter-bar';
import type { HomePageProps } from '@/types';
import { checkIsMaintenanceModeComing } from '@/lib/constants';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { useAtom } from 'jotai';
import SearchForm from './searchFilter';
import { useRef, useState } from 'react';
import HomeCategories from '../categories/homeCategories';
import Features from '../banners/banner-specs';

export default function Modern({ variables }: HomePageProps) {
  const productsRef = useRef<HTMLDivElement>(null);
  const [underMaintenanceIsComing] = useAtom(checkIsMaintenanceModeComing);
  const [search, setSearch] = useState(true);

  return (
    <div className="flex flex-1 bg-gray-100">
      {/* <div
        className={twMerge(
          classNames(
            'sticky hidden h-full bg-gray-100 lg:w-[380px] xl:block',
            underMaintenanceIsComing
              ? 'xl:top-32 2xl:top-36'
              : 'top-32 xl:top-24 2xl:top-22',
          ),
        )}
      >
        <Categories layout="classic" variables={variables.categories} />
      </div> */}
      <main
        className={classNames(
          'block w-full xl:overflow-hidden ltr:xl:pl-0 ltr:xl:pr-5 rtl:xl:pr-0 rtl:xl:pl-5',
          underMaintenanceIsComing
            ? 'lg:pt-32 xl:mt-10'
            : 'lg:pt-20 xl:mt-8 2xl:mt-6',
        )}
      >
        <div className="border border-border-200">
          <Banner layout="modern" variables={variables.types} />
        </div>
        <div className=" hidden md:block mx-10 ">
          <SearchForm
            productsRef={productsRef}
            onClick={() => setSearch(!search)}
          />
        </div>

        <FilterBar
          variables={variables.categories}
          onClick={() => setSearch(!search)}
        />
        {search && (
          <div className="md:hidden mx-5 mt-[55px]">
            <SearchForm
              productsRef={productsRef}
              onClick={() => setSearch(!search)}
            />
          </div>
        )}
        <HomeCategories />
        <Element name="grid" className="px-4 xl:px-0">
          <div ref={productsRef}>
            <ProductGridHome
              className="pt-4 pb-20 lg:py-6"
              variables={variables.products}
            />
          </div>
        </Element>
        <Features />
      </main>
    </div>
  );
}

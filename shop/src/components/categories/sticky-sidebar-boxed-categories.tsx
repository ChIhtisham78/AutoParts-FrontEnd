import Scrollbar from '@/components/ui/scrollbar';
import NotFound from '@/components/ui/not-found';
import CategoriesLoader from '@/components/ui/loaders/categories-loader';
import OutlinedBoxedCategoryMenu from '@/components/ui/outlined-boxed-category';
import type { Category } from '@/types';
import { checkIsMaintenanceModeComing } from '@/lib/constants';
import classNames from 'classnames';
import { useAtom } from 'jotai';
import SearchBox from '../ui/search/search-box';
import { useSearch } from '../ui/search/search.context';
import { useState } from 'react';

interface StickySidebarBoxedCategoriesProps {
  notFound: boolean;
  loading: boolean;
  categories: Category[];
  className?: string;
}

const StickySidebarBoxedCategories: React.FC<
  StickySidebarBoxedCategoriesProps
> = ({ notFound, categories, loading, className }) => {
  const [underMaintenanceIsComing] = useAtom(checkIsMaintenanceModeComing);
  const { searchTerm, updateSearchTerm } = useSearch();
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const onSearch = (e: any) => {
    e.preventDefault();
    if (!searchTerm) return;

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Update the state with the filtered categories
    setFilteredCategories(filteredCategories);
  };

  const handleOnChange = (e: any) => {
    const { value } = e.target;
    updateSearchTerm(value);
  };

  function clearSearch() {
    updateSearchTerm('');
  }

  if (loading) {
    return (
      <div className="hidden xl:block">
        <div className="mt-8 w-72 px-2">
          <CategoriesLoader />
        </div>
      </div>
    );
  }

  return (
    <aside
      className={classNames(
        `hidden h-full w-full bg-light lg:sticky lg:w-[380px] lg:bg-gray-100 xl:block ${className}`,
        underMaintenanceIsComing ? '' : 'lg:top-22',
      )}
    >
      <Scrollbar style={{ maxHeight: 'calc(100vh - 88px)' }}>
        <div className="p-5">
          <SearchBox
            placeholder="search categories"
            variant="minimal"
            label="search"
            onSubmit={onSearch}
            onChange={handleOnChange}
            onClearSearch={clearSearch}
          />
          {!notFound ? (
            <div className="grid grid-cols-2 gap-4">
              <OutlinedBoxedCategoryMenu
                items={searchTerm.length > 0 ? filteredCategories : categories}
                className="py-8"
              />
            </div>
          ) : (
            <div className="min-h-full px-4 pt-6 pb-8 lg:p-8">
              <NotFound text="text-no-category" className="h-96" />
            </div>
          )}
        </div>
      </Scrollbar>
    </aside>
  );
};

export default StickySidebarBoxedCategories;

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Button from '../ui/button';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import ProductCategoryInput from '../products/product-category-input';
import ProductSubCategoryInput from '../products/product-subcategory-input';
import ProductManufacturerInput from '../products/product-manufacturer-input';
import ProductModelInput from '../products/product-model-input';
import ProductEngineInput from '../products/product-engine-input';

const SearchForm = ({
  onClick,
  productsRef,
}: {
  onClick?: any;
  productsRef: any;
}) => {
  const router = useRouter();
  const { control, setValue, reset, watch } = useForm();
  const [year, setYear] = useState('');
  const [isClient, setIsClient] = useState(false);

  const categoryValue = watch('categories');
  const subcategoryValue = watch('subcategory');
  const manufacturerValue = watch('manufacturer');
  const modelValue = watch('model');
  const engineValue = watch('engine');

  const yearOptions = Array.from({ length: 31 }, (_, i) => ({
    value: 2025 - i,
    label: (2025 - i).toString(),
  }));
  useEffect(() => {
    const params = router.query;

    Object.keys(params).forEach((key) => {
      setValue(key, params[key]);
    });

    setIsClient(true);
  }, [router.query, setValue]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onClick();

    const data = {
      categoryId: categoryValue?.id || '',
      subCategoryId: subcategoryValue?.id || '',
      manufacturerId: manufacturerValue?.id || '',
      modelId: modelValue?.id || '',
      engineId: engineValue?.id || '',
      year: year || '',
    };

    const filteredData = Object.keys(data)
      .filter((key) => data[key] !== undefined && data[key] !== '')
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    router.replace(
      {
        pathname: router.pathname,
        query: { ...filteredData },
      },
      undefined,
      { scroll: false },
    );
    // Scroll to products section after filtering
    setTimeout(() => {
      productsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 300); // Delay to ensure the page updates first
  };

  const clearFilter = () => {
    reset({
      categories: null,
      subcategory: null,
      manufacturer: null,
      model: null,
      engine: null,
      year: null,
    });
    setYear('');
    router.push({ pathname: router.pathname, query: {} });
  };

  const handleYearChange = (selectedOption: any) => {
    setYear(selectedOption?.value || '');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl mt-[-50px] relative z-[2] p-6 max-w-screen-xl mx-auto w-full overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 w-full">
        <div>
          <label className="block text-md font-medium mb-1 text-gray-600">
            <div className="mb-1">Year</div>
          </label>
          {isClient && (
            <Select
              options={yearOptions}
              onChange={handleYearChange}
              value={
                yearOptions.find((option) => option.value === year) || null
              }
              placeholder="Select..."
              classNamePrefix="react-select"
              menuPortalTarget={document.body}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#d1d5db',
                  height: '47px',
                  minHeight: '38px',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: '#d1d5db',
                  },
                }),
                indicatorSeparator: () => ({
                  display: 'none',
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: '#000',
                  '&:hover': {
                    color: '#000',
                  },
                }),
                placeholder: (base) => ({
                  ...base,
                  fontSize: '14px',
                  opacity: 0.8,
                  color: '#6b7280',
                }),
                menuPortal: (base) => ({
                  ...base,
                  zIndex: 9999,
                }),
              }}
            />
          )}
        </div>
        <ProductManufacturerInput control={control} setValue={setValue} />
        <ProductModelInput
          control={control}
          setValue={setValue}
          manufacturerId={manufacturerValue?.id}
        />
        {/* <ProductEngineInput
          control={control}
          setValue={setValue}
          categoryId={categoryValue?.id}
          manufacturerId={manufacturerValue?.id}
          modelId={modelValue?.id}
          subcategoryId={subcategoryValue?.id}
        /> */}

        <ProductCategoryInput control={control} setValue={setValue} />
        <ProductSubCategoryInput
          control={control}
          setValue={setValue}
          categoryId={categoryValue?.id}
        />
      </div>

      <div className="flex w-full justify-end space-x-4 mt-6">
        <Button type="submit" className="">
          Find Now
        </Button>
        <Button onClick={clearFilter} variant="outline" className=" sm:w-auto">
          Clear All
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;

/*
'use client';
import {
  useEngines,
  useMake,
  useManufacturers,
} from '@/framework/manufacturer';
import { useCategories, useSubCategories } from '@/framework/category';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Select from 'react-select';
import Button from '../ui/button';
import Link from 'next/link';



const SearchForm = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { manufacturers } = useManufacturers();
  const [selected, setSelected] = useState('');
  const [selectedMake, setSelectedMake] = useState(''); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [year, setYear] = useState('');
  const [engine, setEngine] = useState('');

  const { categories, isLoading, error } = useCategories();
  const categoryOptions = categories.map((it) => ({
    value: it.id,
    label: it.name,
  }));

  const typeOptions = manufacturers.map((it) => ({
    value: it.id,
    label: it.name,
  }));

  const { make } = useMake({ manufacturerId: selected });
  // console.log('checking make', make);
  const makeOptions = make.map((it) => ({
    value: it.id,
    label: it.model,
  }));

  const { engines } = useEngines({
    categoryId: selectedCategory,
    subcategoryId: selectedSubCategory,
    modelId: selectedMake,
    manufacturerId: selected,
  });
  const engineOptions = engines.map((it) => ({
    value: it.id,
    label: it.engine1,
  }));

  const { subCategories } = useSubCategories({ categoryId: selectedCategory });
  // console.log('sub cat', subCategories);
  const subCategoryOptions = subCategories.map((it) => ({
    value: it.id,
    label: it.subcategory,
  }));

  const handleSelect = ({ value }: any) => {
    setSelected(value);
  };
  const handleSelectMake = ({ value }: any) => {
    setSelectedMake(value);
  };
  const handleSelectCategory = ({ value }: any) => {
    setSelectedCategory(value);
  };
  const handleSelectSubCategory = ({ value }: any) => {
    setSelectedSubCategory(value);
  };
  const handleSelectEngine = ({ value }: any) => {
    setEngine(value);
  };

  const handleYearChange = (e: any) => {
    setYear(e.target.value);
  };

  const customStyle = {
    container: (provided: any) => ({
      ...provided,
      zIndex: 1000000,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      cursor: 'pointer',
    }),
    menu: (provided: any) => ({
      ...provided,
      marginTop: 5,
      border: 'none',
      boxShadow: 'none',
      height: 0,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      padding: '4px 20px',
      backgroundColor: state.isSelected ? '#00aeef' : 'white',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      borderBottom:
        state.label === typeOptions[typeOptions.length - 1]?.label
          ? 'none'
          : '0.5px solid #ffffff',
      '&:hover': {
        backgroundColor: '#e8604c',
      },
      borderRadius:
        state.label === typeOptions[typeOptions.length - 1]?.label
          ? '0 0 8px 8px'
          : 0,
      fontSize: 16,
      fontWeight: 500,
    }),
    control: (base: any) => ({
      ...base,
      height: 0,
      borderColor: 'transparent',
      boxShadow: 'none',
      borderRadius: '8px',
      '&:hover': {
        borderColor: 'transparent',
      },
    }),
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      modelId: formData.get('make'),
      // make: formData.get('type'),
      year: year,
      categoryId: formData.get('category'),
      subCategoryId: formData.get('subcategory'),
      engineId: formData.get('engine'),
      manufacturerId: formData.get('type'),
    };

    const filteredData = Object.keys(data)
      .filter((key) => data[key])
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    router.push(
      {
        pathname,
        query: {
          ...query,
          ...filteredData,
        },
      },
      undefined,
      { scroll: false },
    );
  };

  const clearFilter = () => {
    setSelected('');
    setYear('');
    setSelectedSubCategory('');
    setSelectedCategory('');
    setSelectedMake('');
    setEngine('');

    router.push({
      pathname,
      query: {},
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl mt-[-50px] relative z-20"
    >
      <div className="flex-1 flex items-center flex-wrap">
        <div className="flex-1 min-w-[200px] p-6 pt-7 pb-6 max-h-[100px]">
          <label
            htmlFor="year"
            className="block text-gray-500 text-sm font-medium"
          >
            Year
          </label>
          <input
            type="text"
            placeholder="2002"
            name="year"
            id="year"
            value={year}
            onChange={handleYearChange}
            className="w-full border-none outline-none text-lg text-black leading-7"
          />
        </div>

        <div className="flex-1 min-w-[200px] p-6 pt-6 pb-6 max-h-[100px] border-l border-gray-300">
          <label
            htmlFor="type"
            className="block text-gray-500 text-sm font-medium"
          >
            Manufacturer
          </label>
          <Select
            value={
              selected
                ? typeOptions.find((option) => option.value === selected)
                : null
            }
            name="type"
            options={typeOptions}
            onChange={handleSelect}
            styles={customStyle}
            isSearchable={false}
            placeholder="Select..."
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            instanceId="tourTypeSelect"
          />
        </div>

        {selected && (
          <div className="flex-1 min-w-[200px] p-6 pt-6 pb-6 max-h-[100px] border-l border-gray-300">
            <label
              htmlFor="make"
              className="block text-gray-500 text-sm font-medium"
            >
              Model
            </label>
            <Select
              value={
                selectedMake
                  ? makeOptions.find((option) => option.value === selectedMake)
                  : null
              }
              name="make"
              options={makeOptions}
              onChange={handleSelectMake}
              styles={customStyle}
              isSearchable={false}
              placeholder="Select..."
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              instanceId="tourTypeSelect"
            />
          </div>
        )}
        <div className="flex-1 min-w-[200px] p-6 pt-6 pb-6 max-h-[100px] border-l border-gray-300">
          <label
            htmlFor="category"
            className="block text-gray-500 text-sm font-medium"
          >
            Categories
          </label>
          <Select
            value={
              selectedCategory
                ? categoryOptions.find(
                    (option) => option.value === selectedCategory,
                  )
                : null
            }
            name="category"
            options={categoryOptions}
            onChange={handleSelectCategory}
            styles={customStyle}
            isSearchable={false}
            placeholder="Select..."
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            instanceId="tourTypeSelect"
          />
        </div>
        {selectedCategory && (
          <div className="flex-1 min-w-[200px] p-6 pt-6 pb-6 max-h-[100px] border-l border-gray-300">
            <label
              htmlFor="subcategory"
              className="block text-gray-500 text-sm font-medium"
            >
              SubCategory
            </label>
            <Select
              value={
                selectedSubCategory
                  ? subCategoryOptions.find(
                      (option) => option.value === selectedSubCategory,
                    )
                  : null
              }
              name="subcategory"
              options={subCategoryOptions}
              onChange={handleSelectSubCategory}
              styles={customStyle}
              isSearchable={false}
              placeholder="Select..."
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              instanceId="tourTypeSelect"
            />
          </div>
        )}
        <div className="flex-1 min-w-[200px] p-6 pt-6 pb-6 max-h-[100px] border-l border-gray-300">
          <label
            htmlFor="engine"
            className="block text-gray-500 text-sm font-medium"
          >
            Engine
          </label>
          <Select
            value={
              engine
                ? engineOptions.find((option) => option.value === engine)
                : null
            }
            name="engine"
            options={engineOptions}
            onChange={handleSelectEngine}
            styles={customStyle}
            isSearchable={false}
            placeholder="Select..."
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
            instanceId="tourTypeSelect"
          />
        </div>
      </div>
      <div className="flex-1 min-w-[200px] flex justify-end w-full relative space-x-2 p-5">
       <button
          type="submit"
          className="thm-btn bg-[#00aeef] hover:bg-[#ff9072] text-white py-8 px-14 text-lg rounded-tr-lg rounded-br-lg w-full mr-4"
        >
          Find now
        </button> }
        <Button type="submit">Find Now</Button>
        <Link href={'/'}>
          <Button onClick={clearFilter} variant="outline">
            Clear All
          </Button>
        </Link>

      </div>
    </form>
  );
};

export default SearchForm;
 
*/

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/framework/category';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string; // URL for the icon
}

// const categories: Category[] = [
//   {
//     id: 5,
//     name: 'Brake Clutch',
//     slug: 'brake-clutch',
//     icon: 'https://cdn-icons-png.flaticon.com/512/1052/1052883.png',
//   },
//   {
//     id: 6,
//     name: 'Headlight',
//     slug: 'headlight',
//     icon: 'https://cdn-icons-png.flaticon.com/512/1052/1052886.png',
//   },
//   {
//     id: 33,
//     name: 'Transmission',
//     slug: 'transmission',
//     icon: 'https://cdn-icons-png.flaticon.com/512/4293/4293154.png',
//   },
//   {
//     id: 8,
//     name: 'Coolant',
//     slug: 'coolant',
//     icon: 'https://cdn-icons-png.flaticon.com/512/3039/3039405.png',
//   },
//   {
//     id: 9,
//     name: 'Car Accelerator',
//     slug: 'car-accelerator',
//     icon: 'https://cdn-icons-png.flaticon.com/512/1052/1052884.png',
//   },
//   {
//     id: 10,
//     name: 'Car Hood',
//     slug: 'car-hood',
//     icon: 'https://cdn-icons-png.flaticon.com/512/2805/2805427.png',
//   },
//   {
//     id: 11,
//     name: 'Engine',
//     slug: 'engine',
//     icon: 'https://cdn-icons-png.flaticon.com/512/3043/3043118.png',
//   },
//   {
//     id: 15,
//     name: 'Air & Fuel',
//     slug: 'air-and-fuel',
//     icon: 'https://cdn-icons-png.flaticon.com/512/3043/3043099.png',
//   },
//   {
//     id: 20,
//     name: 'Doors',
//     slug: 'doors',
//     icon: 'https://cdn-icons-png.flaticon.com/512/1052/1052892.png',
//   },
//   {
//     id: 17,
//     name: 'Brakes',
//     slug: 'brakes',
//     icon: 'https://cdn-icons-png.flaticon.com/512/1052/1052883.png',
//   },
// ];

export default function HomeCategories() {
  const [showAll, setShowAll] = useState(false);
  const { categories, isLoading } = useCategories({
    limit: 999,
  });
  console.log(categories);
  const router = useRouter();

  const handleCategoryClick = (id: number) => {
    router.push(`/?categoryId=${id}`);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="bg-gray-50 py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Shop by Category
          </h2>

          <button
            onClick={toggleShowAll}
            className="flex items-center text-base font-medium text-primary-700 hover:underline"
          >
            {showAll ? 'Show Less Categories' : 'Show More Categories'}
            <svg
              className="ml-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={showAll ? 'M19 9l-7 7-7-7' : 'M9 5l7 7-7 7'}
              />
            </svg>
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories
            .slice(0, showAll ? categories.length : 8)
            .map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-4 hover:bg-gray-50"
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="h-12 w-12 mb-2"
                />
                <span className="text-sm font-medium text-gray-900 text-center">
                  {category.name}
                </span>
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}

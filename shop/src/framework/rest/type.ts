import type { Type, TypeQueryOptions } from '@/types';
import { useQuery } from 'react-query';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';
import { useRouter } from 'next/router';

export function useTypes(options?: Partial<TypeQueryOptions>) {
  const data = [
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
            thumbnail:
              'https://app.easypartshub.com/uploads/047e1492-012c-42f8-bba4-174fa14fb431_wow.jpg',
            original:
              'https://app.easypartshub.com/uploads/570dcabf-52bf-43d0-bdac-328f1ed70f8c_wowHeavy.png',
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
  return {
    types: data,
  };
}

export function useType(slug: string) {
  const data = {
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
          thumbnail:
            'https://app.easypartshub.com/uploads/047e1492-012c-42f8-bba4-174fa14fb431_wow.jpg',
          original:
            'https://app.easypartshub.com/uploads/edf8c238-54c0-4ec8-aa80-7f709b19b4e9_wowHeavy.png',
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
  };
  return {
    type: data,
  };
}

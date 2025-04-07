import { Routes } from '@/config/routes';
import { PaymentGateway } from '@/types';

export const siteSettings = {
  name: 'PickBazar',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'PickBazar',
    href: '/grocery',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  product: {
    placeholderImage: '/product-placeholder.svg',
    cardMaps: {
      grocery: 'Krypton',
      furniture: 'Radon',
      bag: 'Oganesson',
      makeup: 'Neon',
      book: 'Xenon',
      medicine: 'Helium',
      default: 'Argon',
    },
  },
  authorizedLinks: [
    { href: Routes.profile, label: 'auth-menu-profile' },
    { href: Routes.orders, label: 'auth-menu-my-orders' },
    { href: Routes.wishlists, label: 'profile-sidebar-my-wishlist' },
    { href: Routes.checkout, label: 'auth-menu-checkout' },
  ],
  authorizedLinksMobile: [
    { href: Routes.profile, label: 'auth-menu-profile' },
    { href: Routes.orders, label: 'auth-menu-my-orders' },
    // { href: Routes.cards, label: 'profile-sidebar-my-cards' },
    { href: Routes.wishlists, label: 'profile-sidebar-my-wishlist' },
    { href: Routes.questions, label: 'profile-sidebar-my-questions' },
    { href: Routes.refunds, label: 'text-my-refunds' },
    { href: Routes.reports, label: 'profile-sidebar-my-reports' },
    { href: Routes.checkout, label: 'auth-menu-checkout' },
    { href: Routes.changePassword, label: 'profile-sidebar-password' },
  ],
  dashboardSidebarMenu: [
    {
      href: Routes.profile,
      label: 'profile-sidebar-profile',
    },
    {
      href: Routes.changePassword,
      label: 'profile-sidebar-password',
    },
    {
      href: Routes.orders,
      label: 'profile-sidebar-orders',
    },
    // {
    //   href: Routes.downloads,
    //   label: 'profile-sidebar-downloads',
    // },
    {
      href: Routes.wishlists,
      label: 'profile-sidebar-my-wishlist',
    },
    {
      href: Routes.questions,
      label: 'profile-sidebar-my-questions',
    },
    // {
    //   href: Routes.refunds,
    //   label: 'text-my-refunds',
    // },
    // {
    //   href: Routes.reports,
    //   label: 'profile-sidebar-my-reports',
    // },
    // {
    //   href: Routes.cards,
    //   label: 'profile-sidebar-my-cards',
    //   // MultiPayment: Make it dynamic or from mapper
    //   cardsPayment: [PaymentGateway.STRIPE],
    // },
    {
      href: Routes.help,
      label: 'profile-sidebar-help',
    },
    {
      href: Routes.logout,
      label: 'profile-sidebar-logout',
    },
  ],
  sellingAdvertisement: {
    image: {
      src: '/selling.png',
      alt: 'Selling Advertisement',
    },
  },
  cta: {
    mockup_img_src: '/mockup-img.png',
    play_store_link: '/',
    app_store_link: '/',
  },
  headerLinks: [
    { href: Routes.shops, icon: null, label: 'Shops' },
    { href: Routes.coupons, icon: null, label: 'Offers' },
    { href: Routes.contactUs, label: 'Contact' },
    // { href: Routes.flashSale, label: 'nav-menu-flash-sale' },
    { href: Routes.manufacturers, label: 'Manufacturers' },
    // { href: Routes.authors, label: 'text-authors' },
    { href: Routes.help, label: 'FAQ' },
    { href: Routes.terms, label: 'Terms and Conditions' },
    { href: Routes.customerRefundPolicies, label: 'Customer Refund Policy' },
    // {
    //   href: `${process.env.NEXT_PUBLIC_ADMIN_URL}/register`,
    //   icon: null,
    //   label: 'Admin Dashboard',
    // },
    // {
    //   href: Routes.vendorRefundPolicies,
    //   label: 'nav-menu-vendor-refund-policy',
    // },
  ],
  footer: {
    // copyright: {
    //   name: 'RedQ, Inc',
    //   href: 'https://redq.io/',
    // },
    // address: '2429 River Drive, Suite 35 Cottonhall, CA 2296 United Kingdom',
    // email: 'dummy@dummy.com',
    // phone: '+1 256-698-0694',
    menus: [
      {
        title: 'Explore',
        links: [
          {
            name: 'Shops',
            href: Routes.shops,
          },
          {
            name: 'Manufacturers',
            href: Routes?.manufacturers,
          },
          {
            name: 'FAQ & Help',
            href: Routes.help,
          },
          {
            name: 'Vendor Refund Policies',
            href: Routes.vendorRefundPolicies,
          },
          {
            name: 'Customer Refund Policies',
            href: Routes.customerRefundPolicies,
          },

          // {
          //   name: 'Coupon',
          //   href: Routes.coupons,
          // },
        ],
      },
      {
        title: 'Customer Service',
        links: [
          {
            name: 'Recall Information',
            href: '/custom-pages/39',
          },
          {
            name: 'Same Day Delivery',
            href: '/custom-pages/40',
          },
          {
            name: 'Help Desk',
            href: '/custom-pages/41',
          },
        ],
      },
      {
        title: 'Our Information',
        links: [
          {
            name: 'Privacy policies',
            href: Routes.privacy,
          },
          {
            name: 'Terms and Conditions',
            href: Routes.terms,
          },
          {
            name: 'Contact Us',
            href: Routes.contactUs,
          },
          {
            name: 'Affilitate Program',
            href: '/custom-pages/36',
          },
          {
            name: 'Career Oppurtunities',
            href: '/custom-pages/37',
          },
          {
            name: 'Corporate Information',
            href: '/custom-pages/38',
          },
        ],
      },
    ],
    // payment_methods: [
    //   {
    //     img: '/payment/master.png',
    //     url: '/',
    //   },
    //   {
    //     img: '/payment/skrill.png',
    //     url: '/',
    //   },
    //   {
    //     img: '/payment/paypal.png',
    //     url: '/',
    //   },
    //   {
    //     img: '/payment/visa.png',
    //     url: '/',
    //   },
    //   {
    //     img: '/payment/discover.png',
    //     url: '/',
    //   },
    // ],
  },
};

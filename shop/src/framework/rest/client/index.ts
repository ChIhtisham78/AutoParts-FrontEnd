import type {
  Attachment,
  Author,
  AuthorPaginator,
  AuthorQueryOptions,
  AuthResponse,
  CategoryPaginator,
  CategoryQueryOptions,
  ChangePasswordUserInput,
  CheckoutVerificationInput,
  CouponPaginator,
  CouponQueryOptions,
  CreateAbuseReportInput,
  CreateContactUsInput,
  CreateFeedbackInput,
  CreateOrderInput,
  CreateQuestionInput,
  CreateRefundInput,
  CreateReviewInput,
  DownloadableFilePaginator,
  Feedback,
  ForgotPasswordUserInput,
  LoginUserInput,
  Manufacturer,
  ManufacturerPaginator,
  ManufacturerQueryOptions,
  MyQuestionQueryOptions,
  MyReportsQueryOptions,
  Order,
  OrderPaginator,
  OrderQueryOptions,
  OrderStatusPaginator,
  OtpLoginInputType,
  OTPResponse,
  PasswordChangeResponse,
  PopularProductQueryOptions,
  Product,
  ProductPaginator,
  ProductQueryOptions,
  QueryOptions,
  QuestionPaginator,
  QuestionQueryOptions,
  Refund,
  RefundPaginator,
  RegisterUserInput,
  ResetPasswordUserInput,
  Review,
  ReviewPaginator,
  ReviewQueryOptions,
  ReviewResponse,
  SendOtpCodeInputType,
  Settings,
  Shop,
  ShopPaginator,
  ShopQueryOptions,
  SocialLoginInputType,
  TagPaginator,
  TagQueryOptions,
  Type,
  TypeQueryOptions,
  UpdateReviewInput,
  UpdateUserInput,
  User,
  VerifiedCheckoutData,
  VerifyCouponInputType,
  VerifyCouponResponse,
  VerifyForgotPasswordUserInput,
  VerifyOtpInputType,
  Wishlist,
  WishlistPaginator,
  WishlistQueryOptions,
  GetParams,
  SettingsQueryOptions,
  CreateOrderPaymentInput,
  SetupIntentInfo,
  PaymentIntentCollection,
  Card,
  BestSellingProductQueryOptions,
  UpdateEmailUserInput,
  EmailChangeResponse,
  VerificationEmailUserInput,
  StoreNoticeQueryOptions,
  StoreNoticePaginator,
  StoreNotice,
  FAQS,
  FaqsQueryOptions,
  FaqsPaginator,
  ShopMapLocation,
  RefundQueryOptions,
  RefundReasonPaginator,
  TermsAndConditionsQueryOptions,
  TermsAndConditionsPaginator,
  FlashSaleQueryOptions,
  FlashSalePaginator,
  FlashSale,
  RefundPolicyPaginator,
  RefundPolicyQueryOptions,
  SingleFlashSale,
  FlashSaleProductsQueryOptions,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
//@ts-ignore
import { OTPVerifyResponse } from '@/types';
import { HttpClientDotnet } from './http-client-dotnet';
import { getAuthCredentials } from '../utils/auth-utils';

class Client {
  products = {
    all: ({
      type,
      categories,
      name,
      shop_id,
      author,
      manufacturer,
      min_price,
      max_price,
      tags,
      ...params
    }: Partial<ProductQueryOptions>) =>
      HttpClientDotnet.get<ProductPaginator>('api/product/products', {
        category: categories,
        name: name,
        shopId: shop_id,
        ...params,
        search: HttpClientDotnet.formatSearchParams({
          categories,
          name,
          shop_id,
          tags,
          status: 'publish',
        }),
      }),
    popular: (params: Partial<PopularProductQueryOptions>) =>
      HttpClient.get<Product[]>(API_ENDPOINTS.PRODUCTS_POPULAR, params),

    bestSelling: (params: Partial<BestSellingProductQueryOptions>) =>
      HttpClient.get<Product[]>(API_ENDPOINTS.BEST_SELLING_PRODUCTS, params),

    questions: ({ question, ...params }: QuestionQueryOptions) =>
      HttpClient.get<QuestionPaginator>(API_ENDPOINTS.PRODUCTS_QUESTIONS, {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({
          question,
        }),
      }),

    get: ({ slug, language }: GetParams) =>
      HttpClientDotnet.get<Product>(`${'api/product/product'}/${slug}`, {}),

    createFeedback: (input: CreateFeedbackInput) =>
      HttpClient.post<Feedback>(API_ENDPOINTS.FEEDBACK, input),
    createAbuseReport: (input: CreateAbuseReportInput) =>
      HttpClient.post<Review>(
        API_ENDPOINTS.PRODUCTS_REVIEWS_ABUSE_REPORT,
        input,
      ),
    createQuestion: (input: CreateQuestionInput) =>
      HttpClient.post<Review>(API_ENDPOINTS.PRODUCTS_QUESTIONS, input),
    getProductsByFlashSale: ({ slug, language }: GetParams) => {
      return HttpClient.get<Product>(
        `${API_ENDPOINTS.PRODUCTS_BY_FLASH_SALE}`,
        {
          language,
          slug,
        },
      );
    },
  };
  myQuestions = {
    all: (params: MyQuestionQueryOptions) =>
      HttpClientDotnet.get<QuestionPaginator>(
        `api/question/questions/${params.id}`,
        {
          with: 'user',
          orderBy: 'created_at',
          sortedBy: 'desc',
          ...params,
        },
      ),
  };
  myReports = {
    all: (params: MyReportsQueryOptions) =>
      HttpClient.get<QuestionPaginator>(API_ENDPOINTS.MY_REPORTS, {
        with: 'user',
        orderBy: 'created_at',
        sortedBy: 'desc',
        ...params,
      }),
  };
  reviews = {
    all: ({ rating, ...params }: ReviewQueryOptions) =>
      HttpClientDotnet.get<ReviewPaginator>('api/rating/reviews', {
        searchJoin: 'and',
        with: 'user',
        ...params,
        search: HttpClient.formatSearchParams({
          rating,
        }),
      }),
    get: ({ id }: { id: string }) =>
      HttpClient.get<Review>(`${API_ENDPOINTS.PRODUCTS_REVIEWS}/${id}`),
    create: (input: CreateReviewInput) =>
      HttpClient.post<ReviewResponse>(API_ENDPOINTS.PRODUCTS_REVIEWS, input),
    update: (input: UpdateReviewInput) =>
      HttpClient.put<ReviewResponse>(
        `${API_ENDPOINTS.PRODUCTS_REVIEWS}/${input.id}`,
        input,
      ),
  };
  categories = {
    all: ({ type, ...params }: Partial<CategoryQueryOptions>) =>
      HttpClientDotnet.get<CategoryPaginator>('api/category/category', {
        searchJoin: 'and',
        ...params,
        ...(type && { search: HttpClientDotnet.formatSearchParams({ type }) }),
      }),
  };
  subcategories = {
    all: ({ type, ...params }: Partial<CategoryQueryOptions>) =>
      HttpClientDotnet.get<CategoryPaginator>(
        'api/subcategorylist/getsubcategories',
        {
          ...params,
        },
      ),
  };
  tags = {
    all: ({ type, ...params }: Partial<TagQueryOptions>) =>
      HttpClient.get<TagPaginator>(API_ENDPOINTS.TAGS, {
        searchJoin: 'and',
        ...params,
        ...(type && { search: HttpClient.formatSearchParams({ type }) }),
      }),
  };
  types = {
    all: (params?: Partial<TypeQueryOptions>) =>
      HttpClient.get<Type[]>(API_ENDPOINTS.TYPES, params),
    get: ({ slug, language }: { slug: string; language: string }) =>
      HttpClient.get<Type>(`${API_ENDPOINTS.TYPES}/${slug}`, { language }),
  };
  shops = {
    all: (params: Partial<ShopQueryOptions>) =>
      HttpClientDotnet.get<ShopPaginator>('api/shop/shop', {
        search: HttpClientDotnet.formatSearchParams({
          isActive: '1',
        }),
        ...params,
      }),
    get: (slug: string) =>
      HttpClientDotnet.get<Shop>(`${'api/shop/slug'}/${slug}`),

    searchNearShops: (input: ShopMapLocation) =>
      HttpClient.get<any>(API_ENDPOINTS.NEAR_SHOPS, input),

    getSearchNearShops: ({ lat, lng }: ShopMapLocation) =>
      HttpClient.get<any>(`${API_ENDPOINTS.NEAR_SHOPS}/${lat}/${lng}`),
  };
  storeNotice = {
    all: ({ shop_id, shops, ...params }: Partial<StoreNoticeQueryOptions>) => {
      return HttpClient.get<StoreNoticePaginator>(API_ENDPOINTS.STORE_NOTICES, {
        searchJoin: 'and',
        shop_id: shop_id,
        ...params,
        search: HttpClient.formatSearchParams({ shop_id, shops }),
      });
    },
  };
  stripe = {
    createCheckoutSession: (input: any) => {
      return HttpClientDotnet.post<any>(
        `api/StripePaymentGateway/createcheckoutsession/?orderId=${
          input.orderId
        }&CouponId=${19}`,
        input,
      );
    },
  };

  authors = {
    all: ({ name, ...params }: Partial<AuthorQueryOptions>) => {
      return HttpClient.get<AuthorPaginator>(API_ENDPOINTS.AUTHORS, {
        ...params,
        searchJoin: 'and',
        search: HttpClient.formatSearchParams({
          name,
        }),
      });
    },
    top: ({ type, ...params }: Partial<AuthorQueryOptions>) =>
      HttpClient.get<Author[]>(API_ENDPOINTS.AUTHORS_TOP, {
        ...params,
        search: HttpClient.formatSearchParams({
          type,
        }),
      }),
    get: ({ slug, language }: { slug: string; language?: string }) =>
      HttpClient.get<Author>(`${API_ENDPOINTS.AUTHORS}/${slug}`, {
        language,
      }),
  };
  manufacturers = {
    all: ({ name, type, ...params }: Partial<ManufacturerQueryOptions>) =>
      HttpClientDotnet.get<ManufacturerPaginator>(
        'api/manufacturers/manufacturers',
        {
          ...params,
          search: HttpClient.formatSearchParams({
            name,
            type,
          }),
        },
      ),
    top: ({ type, ...params }: Partial<ManufacturerQueryOptions>) =>
      HttpClient.get<Manufacturer[]>(API_ENDPOINTS.MANUFACTURERS_TOP, {
        ...params,
        search: HttpClient.formatSearchParams({
          type,
        }),
      }),
    get: ({ slug, language }: { slug: string; language?: string }) =>
      HttpClient.get<Manufacturer>(`${API_ENDPOINTS.MANUFACTURERS}/${slug}`, {
        language,
      }),
  };
  make = {
    all: ({ name, type, ...params }: Partial<ManufacturerQueryOptions>) =>
      HttpClientDotnet.get<ManufacturerPaginator>(
        'api/manufactureModel/getmanufactureModel',
        {
          ...params,
          search: HttpClient.formatSearchParams({
            name,
            type,
          }),
        },
      ),
    top: ({ type, ...params }: Partial<ManufacturerQueryOptions>) =>
      HttpClient.get<Manufacturer[]>(API_ENDPOINTS.MANUFACTURERS_TOP, {
        ...params,
        search: HttpClient.formatSearchParams({
          type,
        }),
      }),
    get: ({ slug, language }: { slug: string; language?: string }) =>
      HttpClient.get<Manufacturer>(`${API_ENDPOINTS.MANUFACTURERS}/${slug}`, {
        language,
      }),
  };
  engine = {
    all: ({ name, type, ...params }: Partial<ManufacturerQueryOptions>) =>
      HttpClientDotnet.get<ManufacturerPaginator>('api/engine/getengines', {
        ...params,
        search: HttpClient.formatSearchParams({
          name,
          type,
        }),
      }),
  };
  coupons = {
    all: (params: Partial<CouponQueryOptions>) =>
      HttpClient.get<CouponPaginator>(API_ENDPOINTS.COUPONS, params),
    verify: (input: VerifyCouponInputType) =>
      HttpClient.post<VerifyCouponResponse>(
        API_ENDPOINTS.COUPONS_VERIFY,
        input,
      ),
  };
  orders = {
    all: (params: Partial<OrderQueryOptions>) =>
      HttpClientDotnet.get<OrderPaginator>(`order/all-orders/${params.id}`, {
        with: 'refund',
        ...params,
      }),
    get: (id: any) => HttpClientDotnet.get<Order>(`order/${id}`),
    create: (input: CreateOrderInput) =>
      HttpClientDotnet.post<Order>('order/order', input),
    refunds: (params: Pick<QueryOptions, 'limit'>) =>
      HttpClient.get<RefundPaginator>(API_ENDPOINTS.ORDERS_REFUNDS, {
        with: 'refund_policy;order',
        ...params,
      }),
    createRefund: (input: CreateRefundInput) =>
      HttpClient.post<Refund>(API_ENDPOINTS.ORDERS_REFUNDS, input),
    payment: (input: CreateOrderPaymentInput) =>
      HttpClient.post<any>(API_ENDPOINTS.ORDERS_PAYMENT, input),
    savePaymentMethod: (input: any) =>
      HttpClient.post<any>(API_ENDPOINTS.SAVE_PAYMENT_METHOD, input),

    downloadable: (query?: OrderQueryOptions) =>
      HttpClient.get<DownloadableFilePaginator>(
        API_ENDPOINTS.ORDERS_DOWNLOADS,
        query,
      ),
    verify: (input: CheckoutVerificationInput) =>
      HttpClientDotnet.post<VerifiedCheckoutData>('order/order/verify', input),
    generateDownloadLink: (input: { digital_file_id: string }) =>
      HttpClient.post<string>(
        API_ENDPOINTS.GENERATE_DOWNLOADABLE_PRODUCT_LINK,
        input,
      ),
    getPaymentIntentOriginal: ({
      tracking_number,
    }: {
      tracking_number: string;
    }) =>
      HttpClient.get<PaymentIntentCollection>(API_ENDPOINTS.PAYMENT_INTENT, {
        tracking_number,
      }),
    getPaymentIntent: ({
      tracking_number,
      payment_gateway,
      recall_gateway,
    }: {
      tracking_number: string;
      payment_gateway?: string;
      recall_gateway?: boolean;
    }) =>
      HttpClient.get<PaymentIntentCollection>(API_ENDPOINTS.PAYMENT_INTENT, {
        tracking_number,
        payment_gateway,
        recall_gateway,
      }),
  };
  refundReason = {
    all: ({ type, ...params }: Partial<RefundQueryOptions>) =>
      HttpClient.get<RefundReasonPaginator>(API_ENDPOINTS.REFUNDS_REASONS, {
        searchJoin: 'and',
        ...params,
        ...(type && { search: HttpClient.formatSearchParams({ type }) }),
      }),
  };
  users = {
    me: () => {
      const { id } = getAuthCredentials();
      return HttpClientDotnet.get<User>('api/User/user/' + id);
    },
    update: (user: UpdateUserInput) =>
      HttpClientDotnet.put<User>(`api/user/user/${user.id}`, user),
    updateAddress: (user: UpdateUserInput) =>
      HttpClientDotnet.put<User>(`api/user/useraddress/${user.id}`, user),
    updateContact: (user: UpdateUserInput) =>
      HttpClientDotnet.put<User>(`api/user/phonenumber/${user.id}`, user),
    updatePassword: (user: ChangePasswordUserInput) =>
      HttpClientDotnet.post<User>(`api/auth/change-password`, user),
    login: (input: LoginUserInput) =>
      HttpClientDotnet.get<AuthResponse>('api/auth/login', input),
    socialLogin: (input: SocialLoginInputType) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.SOCIAL_LOGIN, input),
    sendOtpCode: (input: SendOtpCodeInputType) =>
      HttpClient.post<OTPResponse>(API_ENDPOINTS.SEND_OTP_CODE, input),
    verifyOtpCode: (input: VerifyOtpInputType) =>
      HttpClient.post<OTPVerifyResponse>(API_ENDPOINTS.VERIFY_OTP_CODE, input),
    OtpLogin: (input: OtpLoginInputType) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.OTP_LOGIN, input),
    register: (input: RegisterUserInput) =>
      HttpClientDotnet.post<AuthResponse>('api/auth/register', input),
    forgotPassword: (input: ForgotPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_FORGOT_PASSWORD,
        input,
      ),
    verifyForgotPasswordToken: (input: VerifyForgotPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_VERIFY_FORGOT_PASSWORD_TOKEN,
        input,
      ),
    resetPassword: (input: ResetPasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_RESET_PASSWORD,
        input,
      ),
    changePassword: (input: ChangePasswordUserInput) =>
      HttpClient.post<PasswordChangeResponse>(
        API_ENDPOINTS.USERS_CHANGE_PASSWORD,
        input,
      ),
    updateEmail: (input: UpdateEmailUserInput) =>
      HttpClient.post<EmailChangeResponse>(
        API_ENDPOINTS.USERS_UPDATE_EMAIL,
        input,
      ),
    fetchUser: ({ id }: { id: any }) => {
      return HttpClientDotnet.get<User>('api/User/user/' + id);
    },
    logout: () => HttpClientDotnet.post<boolean>('api/auth/logout', {}),
    deleteAddress: ({ id }: { id: string }) =>
      HttpClient.delete<boolean>(`${API_ENDPOINTS.USERS_ADDRESS}/${id}`),
    subscribe: (input: { email: string }) =>
      HttpClient.post<any>(API_ENDPOINTS.USERS_SUBSCRIBE_TO_NEWSLETTER, input),
    contactUs: (input: CreateContactUsInput) =>
      HttpClient.post<any>(API_ENDPOINTS.USERS_CONTACT_US, input),
    resendVerificationEmail: () => {
      return HttpClient.post<VerificationEmailUserInput>(
        API_ENDPOINTS.SEND_VERIFICATION_EMAIL,
        {},
      );
    },
  };

  wishlist = {
    all: (params: WishlistQueryOptions) =>
      HttpClientDotnet.get<WishlistPaginator>(
        `api/product/my-wishlist/${params.id}`,
        {
          orderBy: 'created_at',
          sortedBy: 'desc',
          ...params,
        },
      ),
    toggle: (input: { product_id: string; language?: string }) =>
      HttpClientDotnet.post<{ in_wishlist: boolean }>(
        'api/product/mywishlist',
        input,
      ),
    remove: (id: string) =>
      HttpClientDotnet.delete<Wishlist>(`api/product/wishlist/${id}`),
    checkIsInWishlist: ({ product_id }: { product_id: string }) => {
      const { id } = getAuthCredentials();
      return HttpClientDotnet.get<boolean>(
        `api/product/mywishlist/${id}/${product_id}`,
      );
    },
  };
  settings = {
    all: (params?: SettingsQueryOptions) =>
      HttpClientDotnet.get<Settings>('api/settings/settings', { ...params }),
    upload: (input: File[]) => {
      let formData = new FormData();
      input.forEach((attachment) => {
        formData.append('file', attachment);
      });
      return HttpClientDotnet.post<Attachment[]>(
        'api/Product/upload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
    },
  };
  cards = {
    all: (params?: any) =>
      HttpClient.get<Card[]>(API_ENDPOINTS.CARDS, { ...params }),
    remove: ({ id }: { id: string }) =>
      HttpClient.delete<any>(`${API_ENDPOINTS.CARDS}/${id}`),
    addPaymentMethod: (method_key: any) =>
      HttpClient.post<any>(API_ENDPOINTS.CARDS, method_key),
    makeDefaultPaymentMethod: (input: any) =>
      HttpClient.post<any>(API_ENDPOINTS.SET_DEFAULT_CARD, input),
  };

  faqs = {
    // all: (params?: any) =>
    //   HttpClient.get<FAQS[]>(API_ENDPOINTS.FAQS, { ...params }),
    all: ({ faq_type, issued_by, ...params }: Partial<FaqsQueryOptions>) =>
      HttpClientDotnet.get<FaqsPaginator>('api/faq/myFaqs', {
        ...params,
        search: HttpClient.formatSearchParams({
          faq_type,
          issued_by,
        }),
      }),
    get: (id: string) => HttpClient.get<FAQS>(`${API_ENDPOINTS.FAQS}/${id}`),
  };

  termsAndConditions = {
    // all: (params?: any) =>
    //   HttpClient.get<FAQS[]>(API_ENDPOINTS.FAQS, { ...params }),
    all: ({
      type,
      issued_by,
      ...params
    }: Partial<TermsAndConditionsQueryOptions>) =>
      HttpClient.get<TermsAndConditionsPaginator>(
        API_ENDPOINTS.TERMS_AND_CONDITIONS,
        {
          searchJoin: 'and',
          ...params,
          search: HttpClient.formatSearchParams({
            type,
            issued_by,
          }),
        },
      ),
    get: (id: string) =>
      HttpClient.get<FAQS>(`${API_ENDPOINTS.TERMS_AND_CONDITIONS}/${id}`),
  };
  flashSale = {
    // all: (params?: any) =>
    //   HttpClient.get<FAQS[]>(API_ENDPOINTS.FAQS, { ...params }),
    all: ({ ...params }: Partial<FlashSaleQueryOptions>) =>
      HttpClient.get<FlashSalePaginator>(API_ENDPOINTS.FLASH_SALE, {
        ...params,
      }),
    get: ({ slug, language }: { slug: string; language?: string }) => {
      return HttpClient.get<FlashSale>(`${API_ENDPOINTS.FLASH_SALE}/${slug}`, {
        language,
        with: 'products',
      });
    },
    getProductsByFlashSale: ({
      slug,
      ...params
    }: FlashSaleProductsQueryOptions) => {
      return HttpClient.get<ProductPaginator>(
        API_ENDPOINTS.PRODUCTS_BY_FLASH_SALE,
        {
          searchJoin: 'and',
          slug,
          ...params,
        },
      );
    },
  };

  refundPolicies = {
    all: ({
      title,
      status,
      target,
      ...params
    }: Partial<RefundPolicyQueryOptions>) =>
      HttpClient.get<RefundPolicyPaginator>(API_ENDPOINTS.REFUND_POLICIES, {
        searchJoin: 'and',
        ...params,
        search: HttpClient.formatSearchParams({
          title,
          target,
          status,
        }),

        with: 'shop;refunds',
      }),
  };

  homePageClient = {
    getAllPages: async (): Promise<HomePage[]> => {
      try {
        const response = await HttpClientDotnet.get<{ result: HomePage[] }>(
          '/api/HomePage/GetAllPages',
        );
        return response.result;
      } catch (error) {
        console.error('Error fetching home pages:', error);
        throw error;
      }
    },
    getPage: async (id: number): Promise<HomePage[]> => {
      try {
        const response = await HttpClientDotnet.get<{ result: HomePage[] }>(
          `/api/HomePage/GetAllPages/${id}`,
        );
        return response.result;
      } catch (error) {
        console.error('Error fetching home pages:', error);
        throw error;
      }
    },

    updateHomePage: async (id: number, pageData: HomePage): Promise<number> => {
      try {
        const response = await HttpClientDotnet.put<number>(
          `/api/HomePage/UpdatePages/${id}`,
          pageData,
        );
        return response;
      } catch (error) {
        console.error('Error updating HomePage:', error);
        throw error;
      }
    },

    deletePage: async (id: number): Promise<boolean> => {
      if (typeof id !== 'number') {
        throw new Error('Invalid ID type passed to the delete endpoint.');
      }
      try {
        const response = await HttpClientDotnet.delete<boolean>(
          `/api/HomePage/DeletePages/${id}`,
        );
        return response;
      } catch (error) {
        console.error('Error deleting HomePage:', error);
        throw error;
      }
    },
  };
}

const client = new Client();

export default client;

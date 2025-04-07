import {
  AuthResponse,
  LoginInput,
  RegisterInput,
  User,
  ChangePasswordInput,
  ForgetPasswordInput,
  VerifyForgetPasswordTokenInput,
  ResetPasswordInput,
  MakeAdminInput,
  BlockUserInput,
  WalletPointsInput,
  UpdateUser,
  QueryOptionsType,
  UserPaginator,
  UserQueryOptions,
  VendorQueryOptionsType,
  KeyInput,
  LicensedDomainPaginator,
  LicenseAdditionalData,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const userClient = {
  me: () => {
    return HttpClient.get<User>(API_ENDPOINTS.ME);
  },
  login: (variables: LoginInput) => {
    return HttpClientDotnet.get<AuthResponse>('api/auth/login', variables);
  },
  logout: () => {
    return HttpClientDotnet.post<any>('api/auth/logout', {});
  },
  register: (variables: RegisterInput) => {
    return HttpClientDotnet.post<AuthResponse>('api/auth/register', variables);
  },
  update: ({ id, input }: { id: string; input: UpdateUser }) => {
    return HttpClient.put<User>(`${API_ENDPOINTS.USERS}/${id}`, input);
  },


  changePassword: (variables: ChangePasswordInput) => {
    return HttpClientDotnet.post<any>('api/auth/change-password', variables);
  },

  
  forgetPassword: (email: { email: string }) => {
    return HttpClientDotnet.post<any>('api/auth/forget-password', email); 
  },
  

  verifyForgetPasswordToken: (variables: VerifyForgetPasswordTokenInput) => {
    return HttpClientDotnet.post<any>(
      API_ENDPOINTS.VERIFY_FORGET_PASSWORD_TOKEN,
      variables,
    );
  },
  resetPassword: (variables: ResetPasswordInput) => {
    return HttpClientDotnet.post<any>(API_ENDPOINTS.RESET_PASSWORD, variables);
  },
  makeAdmin: (variables: MakeAdminInput) => {
    return HttpClientDotnet.post<any>(
      'api/user/user/makeadmin/' + variables.user_id,
      variables,
    );
  },
  block: (variables: BlockUserInput) => {
    return HttpClientDotnet.post<any>(
      'api/user/user/ban/' + variables.id,
      variables,
    );
  },
  unblock: (variables: BlockUserInput) => {
    return HttpClientDotnet.post<any>(
      'api/user/user/active/' + variables.id,
      variables,
    );
  },
  addWalletPoints: (variables: WalletPointsInput) => {
    return HttpClient.post<any>(API_ENDPOINTS.ADD_WALLET_POINTS, variables);
  },
  addLicenseKey: (variables: KeyInput) => {
    return HttpClient.post<any>(
      API_ENDPOINTS.ADD_LICENSE_KEY_VERIFY,
      variables,
    );
  },

  fetchUsers: ({ name, ...params }: Partial<UserQueryOptions>) => {
    return HttpClientDotnet.get<UserPaginator>('api/User/users', {
      credentials: false,
      searchJoin: 'and',
      with: 'wallet',
      ...params,
      search: HttpClientDotnet.formatSearchParams({ name }),
    });
  },
  fetchAdmins: ({ ...params }: Partial<UserQueryOptions>) => {
    return HttpClientDotnet.get<UserPaginator>('api/user/admins', {
      ...params,
    });
  },
  fetchUser: ({ id }: { id: any }) => {
    return HttpClientDotnet.get<User>('api/User/user/' + id);
  },
  resendVerificationEmail: () => {
    return HttpClient.post<any>(API_ENDPOINTS.SEND_VERIFICATION_EMAIL, {});
  },
  updateEmail: ({ email }: { email: string }) => {
    return HttpClient.post<any>(API_ENDPOINTS.UPDATE_EMAIL, { email });
  },
  fetchVendors: ({ isActive, ...params }: Partial<UserQueryOptions>) => {
    return HttpClientDotnet.get<UserPaginator>('api/user/vendors', {
      isActive,
      ...params,
    });
  },
  fetchCustomers: ({ ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.CUSTOMERS, {
      searchJoin: 'and',
      with: 'wallet',
      ...params,
    });
  },
  getMyStaffs: ({
    is_active,
    shop_id,
    name,
    ...params
  }: Partial<UserQueryOptions & { shop_id: string }>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.MY_STAFFS, {
      searchJoin: 'and',
      shop_id,
      ...params,
      search: HttpClient.formatSearchParams({ name, is_active }),
    });
  },
  getAllStaffs: ({ is_active, name, ...params }: Partial<UserQueryOptions>) => {
    return HttpClient.get<UserPaginator>(API_ENDPOINTS.ALL_STAFFS, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ name, is_active }),
    });
  },
};

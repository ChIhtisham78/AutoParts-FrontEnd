import { HttpClient } from '@/data/client/http-client';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { HttpClientDotnet } from './http-client-dotnet';

export const dashboardClient = {
  analytics({ vendorId }: any) {
    return HttpClientDotnet.get<any>('api/analytics/analytics', {
      vendorId,
    });
  },
};

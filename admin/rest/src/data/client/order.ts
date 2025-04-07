import {
  Order,
  CreateOrderInput,
  OrderQueryOptions,
  OrderPaginator,
  QueryOptions,
  InvoiceTranslatedText,
  GenerateInvoiceDownloadUrlInput,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const orderClient = {
  ...crudFactory<Order, QueryOptions, CreateOrderInput>('order/order'),
  get: ({ id, language }: { id: string; language: string }) => {
    return HttpClientDotnet.get<Order>(`order/${id}`, {
      language,
    });
  },
  paginated: ({ tracking_number, ...params }: Partial<OrderQueryOptions>) => {
    return HttpClientDotnet.get<OrderPaginator>('order/orders', {
      ...params,
      search: HttpClient.formatSearchParams({ tracking_number }),
    });
  },
  downloadInvoice: (input: GenerateInvoiceDownloadUrlInput) => {
    return HttpClientDotnet.post<string>(
      `api/Invoice/download-invoice-url`,
      input,
      { responseType: 'blob' },
    );
  },
  orderSeen({ id }: { id: string }) {
    return HttpClient.post<any>(`${API_ENDPOINTS.ORDER_SEEN}/${id}`, id);
  },
};

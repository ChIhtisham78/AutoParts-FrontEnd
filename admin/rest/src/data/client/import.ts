import { HttpClient } from './http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const importClient = {
  importCsv: async (url: string, variables: any) => {
    let formData = new FormData();
    formData.append('file', variables?.csv);
    formData.append('shopId', variables?.shop_id);
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await HttpClientDotnet.post<any>(url, formData, options);
    return response.data;
  },
};

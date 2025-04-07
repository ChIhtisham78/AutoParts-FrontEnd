import { HttpClient } from './http-client';
import { API_ENDPOINTS } from './api-endpoints';
import { Attachment } from '@/types';
import { HttpClientDotnet } from './http-client-dotnet';

export const uploadClient = {
  upload: async (variables: any) => {
    console.log(variables[0], 'variables');
    let formData = new FormData();
    variables.forEach((attachment: any) => {
      formData.append('file', attachment);
    });
    console.log(formData, 'formData');
    const options = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return HttpClientDotnet.post<any>(
      'api/product/upload/image',
      formData,
      // options,
    );
  },
};

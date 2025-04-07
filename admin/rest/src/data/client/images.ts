import { crudFactory } from '@/data/client/curd-factory';
import { API_ENDPOINTS } from './api-endpoints';
import { FlashSaleImage } from '@/types';
import { HttpClientDotnet } from './http-client-dotnet';

interface FlashSaleImageQueryOptions {
  language: string;
}

export const flashSaleImageClient = {
  ...crudFactory<FlashSaleImage, FlashSaleImageQueryOptions, FlashSaleImage>(API_ENDPOINTS.FLASH_SALE_IMAGES),
    createImage: (imageData: FormData) =>
      HttpClientDotnet.post<number>(`/api/FlashSale/upload-image`, imageData),

  getAllImages: async () => {
    const response = await HttpClientDotnet.get<FlashSaleImage[]>(`/api/FlashSale/get-images`);
    return response;
  },

  deleteImage: (id: number) => HttpClientDotnet.delete<boolean>(`/api/FlashSale/delete-image/${id}`),

};

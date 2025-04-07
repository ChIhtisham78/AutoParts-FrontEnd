import { crudFactory } from '@/data/client/curd-factory';
import { API_ENDPOINTS } from './api-endpoints';
import { HomePage } from '@/types';
import { HttpClientDotnet } from './http-client-dotnet';

interface HomePageQueryOptions {
  language: string;
}

export const homePageClient = {
  ...crudFactory<HomePage, HomePageQueryOptions, HomePage>(
    API_ENDPOINTS.HOME_PAGES,
  ),
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

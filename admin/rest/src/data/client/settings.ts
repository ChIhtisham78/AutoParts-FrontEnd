import { Settings, SettingsInput, SettingsOptionsInput } from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from '@/data/client/http-client';
import { HttpClientDotnet } from './http-client-dotnet';

export const settingsClient = {
  ...crudFactory<Settings, any, SettingsOptionsInput>(API_ENDPOINTS.SETTINGS),
  all({ language }: { language: string }) {
    return HttpClientDotnet.get<Settings>('api/Settings/settings', {
      language,
    });
  },
  update: ({ ...data }: SettingsInput) => {
    return HttpClient.post<Settings>(API_ENDPOINTS.SETTINGS, { ...data });
  },
};

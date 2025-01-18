import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            // Тут можна додати авторизаційні заголовки
            // const token = getToken();
            // if (token) {
            //   headers.set('authorization', `Bearer ${token}`);
            // }
            return headers;
        },
    }),
    endpoints: () => ({}),
    tagTypes: ['User', 'Post'], // Додайте ваші теги для кешування
});

import { baseApi } from './baseApi';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UpdateUserDto {
    name?: string;
    email?: string;
}

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => 'users',
            providesTags: ['User'],
        }),

        getUserById: builder.query<User, number>({
            query: (id) => `users/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'User', id }],
        }),

        updateUser: builder.mutation<User, { id: number; data: UpdateUserDto }>({
            query: ({ id, data }) => ({
                url: `users/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: 'User', id },
                'User',
            ],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useUpdateUserMutation,
} = userApi;

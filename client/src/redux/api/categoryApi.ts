import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategory } from './types'

export const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/categories/`,
    }),
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        addCategory: builder.mutation<ICategory, Partial<ICategory>>({
            query(category) {
                return {
                    url: 'my-profile/categories',
                    method: 'POST',
                    credentials: 'include',
                    body: category,
                }
            },
            invalidatesTags: [{ type: 'Categories', id: 'LIST' }],
            transformResponse: (result: { data: { category: ICategory } }) =>
                result.data.category,
        }),

        updateCategory: builder.mutation<ICategory, Partial<ICategory>>({
            query(category) {
                return {
                    url: `my-profile/categories/${category.id}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: category,
                }
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'Categories', id },
            ],
            transformResponse: (result: { data: { category: ICategory } }) =>
                result.data.category,
        }),

        getCategory: builder.query<ICategory, number>({
            query(id) {
                return {
                    url: `my-profile/categories/${id}`,
                    credentials: 'include',
                }
            },
            providesTags: (_result, _error, id) => [{ type: 'Categories', id }],
            transformResponse: (result: { data: { category: ICategory } }) =>
                result.data.category,
        }),

        getAllCategories: builder.query<ICategory[], void>({
            query() {
                return {
                    url: 'my-profile/categories/',
                    credentials: 'include',
                }
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Categories' as const,
                              id,
                          })),
                          { type: 'Categories', id: 'LIST' },
                      ]
                    : [{ type: 'Categories', id: 'LIST' }],
            transformResponse: (results: {
                data: { categories: ICategory[] }
            }) => results.data.categories,
        }),

        deleteCategory: builder.mutation<void, number>({
            query(id) {
                return {
                    url: `my-profile/categories/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: 'Categories', id },
                { type: 'Categories', id: 'LIST' },
            ],
        }),
    }),
})

export const {
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryQuery,
    useGetAllCategoriesQuery,
    useDeleteCategoryMutation,
} = categoryApi

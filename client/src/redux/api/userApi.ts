import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUser } from '../features/userSlice'
import { IUser } from './types'
// import { ProfileInput } from '../../pages/profile/profile.name'

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/users/`,
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getMe: builder.query<IUser, null>({
            query() {
                return {
                    url: 'profile',
                    credentials: 'include',
                }
            },
            transformResponse: (result: { data: { user: IUser } }) =>
                result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data))
                } catch (error) {}
            },
        }),

        updateUser: builder.mutation<IUser, Partial<IUser>>({
            query(data) {
                return {
                    url: 'profile/update-profile',
                    method: 'PATCH',
                    credentials: 'include',
                    body: data,
                }
            },
        }),
    }),
})

export const { useGetMeQuery, useUpdateUserMutation } = userApi

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITask } from './types'

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/to-do-list/`,
    }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        addTask: builder.mutation<ITask, Partial<ITask>>({
            query(task) {
                return {
                    url: 'to-do-list/add',
                    method: 'POST',
                    credentials: 'include',
                    body: task,
                }
            },
            invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
            transformResponse: (result: { data: { task: ITask } }) =>
                result.data.task,
        }),

        updateTask: builder.mutation<ITask, Partial<ITask>>({
            query(task) {
                return {
                    url: `to-do-list/update/${task.id}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: task,
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Tasks', id }],
            transformResponse: (result: { data: { task: ITask } }) =>
                result.data.task,
        }),

        getTask: builder.query<ITask, string>({
            query(id) {
                return {
                    url: `to-do-list/${id}`,
                    credentials: 'include',
                }
            },
            providesTags: (_result, _error, id) => [{ type: 'Tasks', id }],
        }),

        getAllTasks: builder.query<ITask[], void>({
            query() {
                return {
                    url: 'to-do-list/',
                    credentials: 'include',
                }
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Tasks' as const,
                              id,
                          })),
                          { type: 'Tasks', id: 'LIST' },
                      ]
                    : [{ type: 'Tasks', id: 'LIST' }],
            transformResponse: (results: { data: { tasks: ITask[] } }) =>
                results.data.tasks,
        }),
        //     async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //         try {
        //             const { task } = await queryFulfilled
        //             dispatch(taskState(task))
        //         } catch (error) {}
        //     },
        // }),
        deleteTask: builder.mutation<void, number>({
            query(id) {
                return {
                    url: `to-do-list/delete/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: 'Tasks', id },
                { type: 'Tasks', id: 'LIST' },
            ],
        }),
    }),
})

export const {
    useAddTaskMutation,
    useUpdateTaskMutation,
    useGetAllTasksQuery,
    useDeleteTaskMutation,
} = todoApi

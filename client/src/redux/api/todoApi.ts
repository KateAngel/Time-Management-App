import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITask, ITaskAPI, ITaskCreate, ITaskUpdate } from './types'
import { DateTime } from 'luxon'

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/to-do-list/`,
    }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        addTask: builder.mutation<ITask, ITask>({
            query(task) {
                console.log('Created Task:', task)

                const transformedTask: ITaskCreate = {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    dueDate: task.dueDate,
                    projectId: task.project.id,
                }

                return {
                    url: 'my-profile/to-do-list',
                    method: 'POST',
                    credentials: 'include',
                    body: transformedTask,
                }
            },
            invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
            transformResponse: (result: { data: { task: ITask } }) =>
                result.data.task,
        }),

        updateTask: builder.mutation<ITask, ITask>({
            query(task) {
                console.log('Updating Task:', task)

                const transformedTask: ITaskUpdate = {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    dueDate: task.dueDate,
                    projectId: task.project.id,
                }

                return {
                    url: `my-profile/to-do-list/${task.id}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: transformedTask,
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Tasks', id }],
            transformResponse: (result: { data: { task: ITask } }) =>
                result.data.task,
        }),

        getTask: builder.query<ITask, string>({
            query(id) {
                return {
                    url: `my-profile/to-do-list/${id}`,
                    credentials: 'include',
                }
            },
            providesTags: (_result, _error, id) => [{ type: 'Tasks', id }],
        }),

        getAllTasks: builder.query<ITask[], void>({
            query() {
                return {
                    url: 'my-profile/to-do-list/',
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
            transformResponse: (results: {
                data: { tasks: ITaskAPI[] }
            }): ITask[] =>
                results.data.tasks.map((task) => ({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    dueDate: task.dueDate
                        ? DateTime.fromISO(task.dueDate)
                        : undefined,
                    created_at: DateTime.fromISO(task.created_at),
                    updated_at: DateTime.fromISO(task.updated_at),
                    project: task.project,
                    //category: task.category,
                })),

            //     async onQueryStarted(args, { dispatch, queryFulfilled }) {
            //         try {
            //             const { task } = await queryFulfilled
            //             dispatch(taskState(task))
            //         } catch (error) {}
            //     },
        }),
        deleteTask: builder.mutation<void, string>({
            query(id) {
                return {
                    url: `my-profile/to-do-list/${id}`,
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

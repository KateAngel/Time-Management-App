import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProject, IProjectAPI, IProjectCreate, IProjectUpdate } from './types'
import { DateTime } from 'luxon'

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/projects/`,
    }),
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        addProject: builder.mutation<IProject, IProject>({
            query(project) {
                const transformedProject: IProjectCreate = {
                    projectTitle: project.projectTitle,
                    description: project.description,
                    status: project.status,
                    dueDate: project.dueDate,
                    categoryId: project.category.id,
                }

                return {
                    url: 'my-profile/projects',
                    method: 'POST',
                    credentials: 'include',
                    body: transformedProject,
                }
            },
            invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
            transformResponse: (result: { data: { project: IProject } }) =>
                result.data.project,
        }),

        updateProject: builder.mutation<IProject, IProject>({
            query(project) {
                const transformedProject: IProjectUpdate = {
                    projectTitle: project.projectTitle,
                    description: project.description,
                    status: project.status,
                    dueDate: project.dueDate,
                    categoryId: project.category.id,
                }

                return {
                    url: `my-profile/projects/${project.id}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: transformedProject,
                }
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'Projects', id },
            ],
            transformResponse: (result: { data: { project: IProject } }) =>
                result.data.project,
        }),

        getProject: builder.query<IProject, number>({
            query(id) {
                return {
                    url: `my-profile/projects/${id}`,
                    credentials: 'include',
                }
            },
            providesTags: (_result, _error, id) => [{ type: 'Projects', id }],
            transformResponse: (result: { data: { project: IProject } }) =>
                result.data.project,
        }),

        getAllProjects: builder.query<IProject[], void>({
            query() {
                return {
                    url: 'my-profile/projects/',
                    credentials: 'include',
                }
            },

            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Projects' as const,
                              id,
                          })),
                          { type: 'Projects', id: 'LIST' },
                      ]
                    : [{ type: 'Projects', id: 'LIST' }],
            transformResponse: (results: {
                data: { projects: IProjectAPI[] }
            }): IProject[] =>
                results.data.projects.map((project) => ({
                    id: project.id,
                    projectTitle: project.projectTitle,
                    description: project.description,
                    status: project.status,
                    dueDate: project.dueDate
                        ? DateTime.fromISO(project.dueDate)
                        : undefined,
                    created_at: DateTime.fromISO(project.created_at),
                    updated_at: DateTime.fromISO(project.updated_at),
                    category: project.category,
                })),
        }),

        deleteProject: builder.mutation<void, number>({
            query(id) {
                return {
                    url: `my-profile/projects/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: 'Projects', id },
                { type: 'Projects', id: 'LIST' },
            ],
        }),
    }),
})

export const {
    useAddProjectMutation,
    useUpdateProjectMutation,
    useGetAllProjectsQuery,
    useDeleteProjectMutation,
} = projectApi

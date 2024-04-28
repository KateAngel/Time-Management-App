import { nativeEnum, number, object, string, TypeOf, z } from 'zod'
import { ProjectStatus } from '../entities/project.entity'

export const ProjectSchema = object({
    projectTitle: string({
        required_error: 'Project Title is required',
        invalid_type_error: 'Project Title must be a string',
    }),
    description: string(),
    status: z.optional(nativeEnum(ProjectStatus)),
    dueDate: z.coerce.date({
        required_error: 'Due Date is required',
    }),
    categoryId: number({ required_error: 'Category is required' }),
})

export const createProjectSchema = object({
    body: ProjectSchema
})

const params = {
    params: object({
        projectId: string(), // number() in database, but receiced as string from request
    }),
}

export const getProjectSchema = object({
    ...params,
})

export const updateProjectSchema = object({
    ...params,
    body: ProjectSchema,
})

export const deleteProjectSchema = object({
    ...params,
})

export type CreateProjectInput = TypeOf<typeof createProjectSchema>['body']
export type GetProjectInput = TypeOf<typeof getProjectSchema>['params']
export type UpdateProjectInput = TypeOf<typeof updateProjectSchema>
export type DeleteProjectInput = TypeOf<typeof deleteProjectSchema>['params']

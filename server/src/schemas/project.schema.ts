import { number, object, string, TypeOf, z } from 'zod'
import { ProjectStatus } from '../entities/project.entity'
import { ProjectCategory } from '../entities/project.category.entity'

export const createProjectSchema = object({
  body: object({
    projectTitle: string({
      required_error: 'Project Title is required',
      invalid_type_error: "Project Title must be a string"
    }),
    description: string(),
    status: z.optional(z.nativeEnum(ProjectStatus)),
    dueDate: z.coerce.date({
      required_error: 'Due Date is required',
    }),
    category: z.instanceof(ProjectCategory),
  }),
})

const params = {
  params: object({
    projectId: number(),
  }),
}

export const getProjectSchema = object({
  ...params,
})

export const updateProjectSchema = object({
  ...params,
  body: object({
    projectTitle: string(),
    description: string(),
    status: z.optional(z.nativeEnum(ProjectStatus)),
    dueDate: z.coerce.date(),
    category: z.instanceof(ProjectCategory),
  }).partial(),
})

export const deleteProjectSchema = object({
  ...params,
})

export type CreateProjectInput = TypeOf<typeof createProjectSchema>['body']
export type GetProjectInput = TypeOf<typeof getProjectSchema>['params']
export type UpdateProjectInput = TypeOf<typeof updateProjectSchema>
export type DeleteProjectInput = TypeOf<typeof deleteProjectSchema>['params']
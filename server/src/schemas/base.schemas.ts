import { z } from 'zod'
import { TaskStatus } from '../entities/task.entity'
import { ProjectStatus } from '../entities/project.entity'

export const idSchema = z.number()
export const createdAtSchema = z.string()
export const updatedAtSchema = z.string()

export const modelSchema = z.object({
    id: idSchema,
    created_at: createdAtSchema,
    updated_at: updatedAtSchema,
})

export const userSchema = z.object({
    email: z.string(),
})

export const projectCategorySchema = z.object({
    category: z.string(),
})

export const taskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.nativeEnum(TaskStatus),
    dueDate: z.string(),
    projectId: idSchema,
})

export const projectTitleSchema = z.object({
    projectTitle: z.string(),
    description: z.string(),
    status: z.nativeEnum(ProjectStatus),
    dueDate: z.string(),
    categoryId: idSchema,
})

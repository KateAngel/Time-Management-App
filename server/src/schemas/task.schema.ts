import { nativeEnum, number, object, string, TypeOf, z, ZodSchema } from 'zod'
import { TaskStatus } from '../entities/task.entity'

export const taskSchema = object({
    title: string({
        required_error: 'Project Title is required',
        invalid_type_error: 'Project Title must be a string',
    }),
    description: string().optional(),
    status: nativeEnum(TaskStatus),
    dueDate: z.coerce.date({
        required_error: 'Due Date is required',
    }),
    projectId: number({
        required_error: 'Project is required',
    }),
})

export const createTaskSchema = object({
    body: taskSchema,
})

const params = {
    params: object({
        taskId: string(),
    }),
}

export const getTaskSchema = object({
    ...params,
})

export const updateTaskSchema = object({
    ...params,
    body: taskSchema,
})

export const deleteTaskSchema = object({
    ...params,
})

export type CreateTaskInput = TypeOf<typeof createTaskSchema>['body']
export type GetTaskInput = TypeOf<typeof getTaskSchema>['params']
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>['params']

import { object, string, TypeOf, z, ZodSchema } from 'zod'
import { TaskStatus } from '../entities/task.entity'
import { ProjectTitle } from '../entities/project.entity'
import { ProjectCategory } from '../entities/project.category.entity'
import { NextFunction, Request, Response } from 'express'
import { idSchema, projectTitleSchema, taskSchema } from './base.schemas'

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

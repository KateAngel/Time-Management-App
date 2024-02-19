import { object, string, TypeOf, z } from 'zod';
import { TaskStatus } from '../entities/task.entity'
import { ProjectTitle } from '../entities/project.entity'
import { ProjectCategory } from '../entities/project.category.entity'

export const createTaskSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string(),
    status: z.optional(z.nativeEnum(TaskStatus)),
    dueDate: z.coerce.date({
      required_error: 'Due Date is required',
    }),
    category: z.instanceof(ProjectCategory),
    project: z.instanceof(ProjectTitle),
  }),
});

const params = {
  params: object({
    taskId: string(),
  }),
};

export const getTaskSchema = object({
  ...params,
});

export const updateTaskSchema = object({
  ...params,
  body: object({
    title: string(),
    description: string(),
    status: z.optional(z.nativeEnum(TaskStatus)),
    dueDate: z.coerce.date(),
    category: z.instanceof(ProjectCategory),
    project: z.instanceof(ProjectTitle),
  }).partial(),
});

export const deleteTaskSchema = object({
  ...params,
});

export type CreateTaskInput = TypeOf<typeof createTaskSchema>['body'];
export type GetTaskInput = TypeOf<typeof getTaskSchema>['params'];
export type UpdateTaskInput = TypeOf<typeof updateTaskSchema>;
export type DeleteTaskInput = TypeOf<typeof deleteTaskSchema>['params'];
import { object, number, string, TypeOf } from 'zod';

export const createProjectCategorySchema = object({
  body: object({
    projectCategory: string({
      required_error: 'Project Category is required',
    }),
    description: string(),
  }),
});

const params = {
  params: object({
    categoryId: string(), // number() in database, but receiced as string from request
  }),
};

export const getProjectCategorySchema = object({
  ...params,
});

export const updateProjectCategorySchema = object({
  ...params,
  body: object({
    projectCategory: string(),
    description: string(),
  }).partial(),
});

export const deleteProjectCategorySchema = object({
  ...params,
});

export type CreateProjectCategoryInput = TypeOf<typeof createProjectCategorySchema>['body'];
export type GetProjectCategoryInput = TypeOf<typeof getProjectCategorySchema>['params'];
export type UpdateProjectCategoryInput = TypeOf<typeof updateProjectCategorySchema>;
export type DeleteProjectCategoryInput = TypeOf<typeof deleteProjectCategorySchema>['params'];
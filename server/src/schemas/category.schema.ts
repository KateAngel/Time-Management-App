import { object, number, string, TypeOf } from 'zod'

export const categorySchema = object({
    projectCategory: string({
        required_error: 'Project Category is required',
    }),
    description: string(),
})

export const createCategorySchema = object({
    body: categorySchema,
})

const params = {
    params: object({
        categoryId: string(), // number() in database, but receiced as string from request
    }),
}

export const getCategorySchema = object({
    ...params,
})

export const updateCategorySchema = object({
    ...params,
    body: categorySchema.partial(),
})

export const deleteCategorySchema = object({
    ...params,
})

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>['body']
export type GetCategoryInput = TypeOf<typeof getCategorySchema>['params']
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>['params']

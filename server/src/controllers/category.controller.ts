import { NextFunction, Request, Response } from 'express'
import {
    CreateCategoryInput,
    DeleteCategoryInput,
    GetCategoryInput,
    UpdateCategoryInput,
} from '../schemas/category.schema'
import {
    createCategory,
    getAllCategories,
    getCategory,
} from '../services/category.service'
import { findUserById } from '../services/user.service'
import AppError from '../utils/appError'

export const createCategoryHandler = async (
    req: Request<{}, {}, CreateCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await findUserById(res.locals.user.id as string)

        const category = await createCategory(req.body, user!)

        res.status(201).json({
            status: 'success',
            data: {
                category,
            },
        })
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Category with that title already exist',
            })
        }
        next(err)
    }
}

export const getCategoryHandler = async (
    req: Request<GetCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await getCategory(parseInt(req.params.categoryId))

        if (!category) {
            return next(new AppError(404, 'Category with that ID not found'))
        }

        res.status(200).json({
            status: 'success',
            data: {
                category,
            },
        })
    } catch (err: any) {
        next(err)
    }
}

export const getCategoriesHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const categories = await getAllCategories()

        res.status(200).json({
            status: 'success',
            results: categories.length,
            data: {
                categories,
            },
        })
    } catch (err: any) {
        next(err)
    }
}

export const updateCategoryHandler = async (
    req: Request<
        UpdateCategoryInput['params'],
        {},
        UpdateCategoryInput['body']
    >,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await getCategory(parseInt(req.params.categoryId))

        if (!category) {
            return next(new AppError(404, 'Category with that ID not found'))
        }

        Object.assign(category, req.body)

        const updatedCategory = await category.save()

        res.status(200).json({
            status: 'success',
            data: {
                post: updatedCategory,
            },
        })
    } catch (err: any) {
        next(err)
    }
}

export const deleteCategoryHandler = async (
    req: Request<DeleteCategoryInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const category = await getCategory(parseInt(req.params.categoryId))

        if (!category) {
            return next(new AppError(404, 'Category with that ID not found'))
        }

        await category.remove()

        res.status(204).json({
            status: 'success',
            data: null,
        })
    } catch (err: any) {
        next(err)
    }
}

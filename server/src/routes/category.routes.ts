import express from 'express'
import {
    createCategoryHandler,
    getCategoryHandler,
    getCategoriesHandler,
    updateCategoryHandler,
    deleteCategoryHandler,
} from '../controllers/category.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import {
    getCategorySchema,
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
} from '../schemas/category.schema'

const router = express.Router()

router.use(deserializeUser, requireUser)

router
    .route('/my-profile/categories')
    .post(validate(createCategorySchema), createCategoryHandler)
    .get(getCategoriesHandler)

router
    .route('/my-profile/categories/:categoryId')
    .get(validate(getCategorySchema), getCategoryHandler)
    .patch(validate(updateCategorySchema), updateCategoryHandler)
    .delete(validate(deleteCategorySchema), deleteCategoryHandler)

export default router

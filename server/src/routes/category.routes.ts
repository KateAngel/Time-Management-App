import express from 'express'
import {
    createProjectCategoryHandler, getProjectCategoryHandler, getProjectCategoriesHandler, updateProjectCategoryHandler, deleteProjectCategoryHandler
} from '../controllers/project.category.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import { getProjectCategorySchema, createProjectCategorySchema, updateProjectCategorySchema, deleteProjectCategorySchema } from '../schemas/project.category.schema'

const router = express.Router()

router.use(deserializeUser, requireUser)

router
    .route('/my-profile/categories')
    .post(createProjectCategoryHandler, validate(createProjectCategorySchema))
    .get(getProjectCategoriesHandler)

router
    .route('/my-profile/categories/:categoryId')
    .get(getProjectCategoryHandler)
    .patch(updateProjectCategoryHandler)
    .delete(deleteProjectCategoryHandler)

export default router

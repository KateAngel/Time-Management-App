import express from 'express'
import {
    createProjectHandler, getProjectHandler, getProjectsHandler, updateProjectHandler, deleteProjectHandler
} from '../controllers/project.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import { getProjectSchema, createProjectSchema, updateProjectSchema, deleteProjectSchema } from '../schemas/project.schema'

const router = express.Router()

router.use(deserializeUser, requireUser)

router
    .route('/my-profile/projects')
    .post(createProjectHandler, validate(createProjectSchema))
    .get(getProjectsHandler)

router
    .route('/my-profile/projects/:projectId')
    .get(getProjectHandler)
    .patch(updateProjectHandler)
    .delete(deleteProjectHandler)

export default router

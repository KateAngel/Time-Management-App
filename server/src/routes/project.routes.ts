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
    .route('/')
    .post(createProjectHandler, validate(createProjectSchema))
    .get(getProjectsHandler)

router
    .route('/:projectId')
    .get(getProjectHandler)
    //.patch(validate(updateProjectSchema), updateProjectHandler)
   // .delete(validate(deleteProjectSchema), deleteProjectHandler)

export default router

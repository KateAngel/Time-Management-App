import express from 'express'
import {
    createTaskHandler, getTaskHandler, getTasksHandler, updateTaskHandler, deleteTaskHandler
} from '../controllers/task.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import { getTaskSchema, createTaskSchema, updateTaskSchema, deleteTaskSchema } from '../schemas/task.schema'

const router = express.Router()

router.use(deserializeUser, requireUser)

router
    .route('/')
    .post(createTaskHandler, validate(createTaskSchema))
    .get(getTasksHandler)

router
    .route('/:taskId')
    .get(validate(getTaskSchema), getTaskHandler)
    .patch(validate(updateTaskSchema), updateTaskHandler)
    .delete(validate(deleteTaskSchema), deleteTaskHandler)

export default router

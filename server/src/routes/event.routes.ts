import express from 'express'
import {
    createEventHandler,
    getEventHandler,
    getEventsHandler,
    updateEventHandler,
    deleteEventHandler,
} from '../controllers/event.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'
import { validate } from '../middleware/validate'
import {
    getEventSchema,
    createEventSchema,
    updateEventSchema,
    deleteEventSchema,
} from '../schemas/event.schema'

const router = express.Router()

router.use(deserializeUser, requireUser)

router
    .route('/my-profile/calendar')
    .post(validate(createEventSchema), createEventHandler)
    .get(getEventsHandler)

router
    .route('/my-profile/calendar/:eventId')
    .get(validate(getEventSchema), getEventHandler)
    .patch(validate(updateEventSchema), updateEventHandler)
    .delete(validate(deleteEventSchema), deleteEventHandler)

export default router

import express from 'express'
import {
    getMeHandler,
    editProfileHandler,
} from '../controllers/user.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'

const router = express.Router()

router.use(deserializeUser, requireUser)

router.get('/my-profile', getMeHandler)
router.patch('/my-profile/profile-info', editProfileHandler)

export default router

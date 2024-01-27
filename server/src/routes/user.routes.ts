import express from 'express'
import { getMeHandler, editProfileHandler } from '../controllers/user.controller'
import { deserializeUser } from '../middleware/deserializeUser'
import { requireUser } from '../middleware/requireUser'

const router = express.Router()

router.use(deserializeUser, requireUser)

// Get currently logged in user
router.get('/profile', getMeHandler)
router.patch('/profile/update-profile', editProfileHandler)

export default router

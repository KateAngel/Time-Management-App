import { NextFunction, Request, Response } from 'express'
import { EditUserInput } from '../schemas/user.schema'
import { editUser } from '../services/user.service'

export const getMeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user

        res.status(200).status(200).json({
            status: 'success',
            data: {
                user,
            },
        })
    } catch (err: any) {
        next(err)
    }
}

export const editProfileHandler = async (
    req: Request<{}, {}, EditUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user
        const { name, age } = req.body
        const updateUser = await editUser(user.id, { name, age })
        await updateUser.save()

        res.status(200).status(200).json({
            status: 'success',
            data: {
                user,
            },
        })
    } catch (err: any) {
        next(err)
    }
}

import { NextFunction, Request, Response } from 'express'
import {
    CreateEventInput,
    DeleteEventInput,
    GetEventInput,
    UpdateEventInput,
} from '../schemas/event.schema'
import {
    createEvent,
    getAllEvents,
    findEvents,
    getEvent,
} from '../services/event.service'
import { findUserById } from '../services/user.service'
import AppError from '../utils/appError'
import Event from '../entities/event.entity'

export const createEventHandler = async (
    req: Request<{}, {}, CreateEventInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await findUserById(res.locals.user.id as string)

        if (!user) {
            return next(new AppError(404, 'User with that ID not found'))
        }

        const transformedEvent: Partial<Event> = {
            ...req.body,
            startDate: req.body.startDate ? new Date(req.body.startDate) : undefined,
            endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
            user,
        }

        const event = await createEvent(transformedEvent)

        res.status(201).json({
            status: 'success',
            data: {
                event,
            },
        })
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'Event with that title already exist',
            })
        }
        next(err)
    }
}

export const getEventHandler = async (
    req: Request<GetEventInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const event = await getEvent(req.params.eventId)

        if (!event) {
            return next(new AppError(404, 'Event with that ID not found'))
        }

        res.status(200).json({
            status: 'success',
            data: {
                event,
            },
        })
    } catch (err: any) {
        next(err)
    }
}

export const getEventsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const events = await getAllEvents()

        res.status(200).json({
            status: 'success',
            results: events.length,
            data: {
                events,
            },
        })
    } catch (err: any) {
        next(err)
    }
}

export const updateEventHandler = async (
    req: Request<UpdateEventInput['params'], {}, UpdateEventInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const event = await getEvent(req.params.eventId)

        if (!event) {
            return next(new AppError(404, 'Event with that ID not found'))
        }

        Object.assign(event, req.body)

        const updatedEvent = await event.save()

        res.status(200).json({
            status: 'success',
            data: {
                post: updatedEvent,
            },
        })
    } catch (err: any) {
        next(err)
    }
}

export const deleteEventHandler = async (
    req: Request<DeleteEventInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const event = await getEvent(req.params.eventId)

        if (!event) {
            return next(new AppError(404, 'Event with that ID not found'))
        }

        await event.remove()

        res.status(204).json({
            status: 'success',
            data: null,
        })
    } catch (err: any) {
        next(err)
    }
}

import { nativeEnum, number, object, string, TypeOf, z, ZodSchema } from 'zod'
import { EventStatus } from '../entities/event.entity'

export const eventSchema = object({
    title: string({
        required_error: 'Project Title is required',
        invalid_type_error: 'Project Title must be a string',
    }),
    description: string().optional(),
    status: nativeEnum(EventStatus),
    startDate: z.coerce.date({
        required_error: 'Due Date is required',
    }),
    endDate: z.coerce.date({
        required_error: 'Due Date is required',
    }),
})

export const createEventSchema = object({
    body: eventSchema,
})

const params = {
    params: object({
        eventId: string(),
    }),
}

export const getEventSchema = object({
    ...params,
})

export const updateEventSchema = object({
    ...params,
    body: eventSchema,
})

export const deleteEventSchema = object({
    ...params,
})

export type CreateEventInput = TypeOf<typeof createEventSchema>['body']
export type GetEventInput = TypeOf<typeof getEventSchema>['params']
export type UpdateEventInput = TypeOf<typeof updateEventSchema>
export type DeleteEventInput = TypeOf<typeof deleteEventSchema>['params']
import {
    FindOptionsRelations,
    FindOptionsSelect,
    FindOptionsWhere,
} from 'typeorm'
import { Event } from '../entities/event.entity'
import { AppDataSource } from '../utils/data-source'

const eventRepository = AppDataSource.getRepository(Event)

export const createEvent = async (event: Partial<Event>) => {
    return await eventRepository.save(eventRepository.create(event))
}

export const getEvent = async (eventId: string) => {
    return await eventRepository.findOneBy({ id: eventId })
}

export const getAllEvents = async () => {
    return await eventRepository.find()
}

export const findEvents = async (
    where: FindOptionsWhere<Event> = {},
    select: FindOptionsSelect<Event> = {},
    relations: FindOptionsRelations<Event> = {}
) => {
    return await eventRepository.find({
        where,
        select,
        relations,
    })
}

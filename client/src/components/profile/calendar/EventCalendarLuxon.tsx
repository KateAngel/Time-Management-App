import { FC, useEffect, useState, MouseEvent, ComponentType } from 'react'
import {
    Calendar,
    luxonLocalizer,
    Components,
    ToolbarProps as BaseToolbarProps,
} from 'react-big-calendar'
import { DateTime } from 'luxon'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { toast } from 'react-toastify'
import FullScreenLoader from '../../FullScreenLoader'
import { useGetAllEventsQuery } from '../../../redux/api/eventApi'
import { IEvent } from '../../../redux/api/types'
import CustomToolbar from './CustomToolbar'

interface CalendarProps {
    onSelectEvent: (event: IEvent) => void
    onSelectSlot: ({ start, end }: { start: Date; end: Date }) => void
}

interface ToolbarProps extends BaseToolbarProps<Event, object> {}

const EventCalendar: FC<CalendarProps> = ({ onSelectEvent, onSelectSlot }) => {
    const { isLoading, isError, error, data: events } = useGetAllEventsQuery()

    const filteredEvents =
        events?.filter((event) => event.startDate && event.endDate) || []

    interface ErrorType {
        data: {
            error: {
                message: string
            }[]
            message: string
        }
    }

    useEffect(() => {
        if (isError) {
            const errorData = error as ErrorType

            if (Array.isArray(errorData.data.error)) {
                errorData.data.error.forEach((el) =>
                    toast.error(el.message, {
                        position: 'top-right',
                    }),
                )
            } else {
                toast.error(errorData.data.message, {
                    position: 'top-right',
                })
            }
        }
    }, [error, isError, isLoading])

    const customComponents: Components<IEvent, object> = {
        toolbar: CustomToolbar as ComponentType<ToolbarProps>,
    }

    if (isLoading) {
        return <FullScreenLoader />
    }

    return (
        <Calendar
            selectable
            localizer={luxonLocalizer(DateTime)}
            defaultView="month"
            views={['month', 'week', 'day', 'agenda']}
            events={filteredEvents}
            startAccessor={(event) =>
                event.startDate ? event.startDate.toJSDate() : new Date()
            }
            endAccessor={(event) =>
                event.endDate ? event.endDate.toJSDate() : new Date()
            }
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            components={customComponents}
            style={{
                height: 900,
            }}
        />
    )
}

export default EventCalendar

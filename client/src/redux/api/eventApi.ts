import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IEvent, IEventAPI, IEventCreate } from './types'
import { DateTime } from 'luxon'

const BASE_URL = process.env.REACT_APP_SERVER_ENDPOINT as string

export const eventApi = createApi({
    reducerPath: 'eventApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/calendar/`,
    }),
    tagTypes: ['Events'],
    endpoints: (builder) => ({
        addEvent: builder.mutation<IEvent, IEvent>({
            query(event) {
                //console.log('Created Event:', event)

                // const transformedEvent: IEventCreate = {
                //     title: event.title,
                //     description: event.description,
                //     startDate: event.startDate,
                //     endDate: event.endDate,
                //     allDay: event.allDay,
                //     status: event.status,
                // }

                return {
                    url: 'my-profile/calendar/',
                    method: 'POST',
                    credentials: 'include',
                    body: event, //transformedEvent,
                }
            },
            invalidatesTags: [{ type: 'Events', id: 'LIST' }],
            transformResponse: (result: { data: { event: IEvent } }) =>
                result.data.event,
        }),

        updateEvent: builder.mutation<IEvent, Partial<IEvent>>({
            query(event) {
                //console.log('Updating Task:', task)

                // const transformedEvent: IEventUpdate = {
                //     title: event.title,
                //     description: event.description,
                //     startDate: event.startDate,
                //     endDate: event.endDate,
                //     allDay: event.allDay,
                //     status: event.status,
                // }

                return {
                    url: `my-profile/calendar/${event.id}`,
                    method: 'PATCH',
                    credentials: 'include',
                    body: event, //transformedEvent,
                }
            },
            invalidatesTags: (result, error, { id }) => [
                { type: 'Events', id },
            ],
            transformResponse: (result: { data: { event: IEvent } }) =>
                result.data.event,
        }),

        getTask: builder.query<IEvent, string>({
            query(id) {
                return {
                    url: `my-profile/calendar/${id}`,
                    credentials: 'include',
                }
            },
            providesTags: (_result, _error, id) => [{ type: 'Events', id }],
        }),

        getAllEvents: builder.query<IEvent[], void>({
            query() {
                return {
                    url: 'my-profile/calendar/',
                    credentials: 'include',
                }
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Events' as const,
                              id,
                          })),
                          { type: 'Events', id: 'LIST' },
                      ]
                    : [{ type: 'Events', id: 'LIST' }],
            transformResponse: (results: {
                data: { events: IEventAPI[] }
            }): IEvent[] =>
                results.data.events.map((event) => ({
                    id: event.id,
                    title: event.title,
                    description: event.description,
                    startDate: event.startDate
                        ? DateTime.fromISO(event.startDate)
                        : undefined,
                    endDate: event.endDate
                        ? DateTime.fromISO(event.endDate)
                        : undefined,
                    allDay: event.allDay,
                    status: event.status,
                    created_at: DateTime.fromISO(event.created_at),
                    updated_at: DateTime.fromISO(event.updated_at),
                })),
        }),
        deleteEvent: builder.mutation<void, string>({
            query(id) {
                return {
                    url: `my-profile/calendar/${id}`,
                    method: 'DELETE',
                    credentials: 'include',
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: 'Events', id },
                { type: 'Events', id: 'LIST' },
            ],
        }),
    }),
})

export const {
    useAddEventMutation,
    useUpdateEventMutation,
    useGetAllEventsQuery,
    useDeleteEventMutation,
} = eventApi

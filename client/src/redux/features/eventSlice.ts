import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEvent } from '../api/types'

interface IEventState {
    events: IEvent[]
}

const initialState: IEventState = {
    events: [],
}

export const eventSlice = createSlice({
    initialState,
    name: 'todoSlice',
    reducers: {
        taskState(state, action: PayloadAction<IEvent[]>) {
            state.events = action.payload
        },
    },
})

export default eventSlice.reducer

export const { taskState } = eventSlice.actions

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITask } from '../api/types'

interface ITaskState {
    tasks: ITask[]
}

const initialState: ITaskState = {
    tasks: [],
}

export const todoSlice = createSlice({
    initialState,
    name: 'todoSlice',
    reducers: {
        taskState(state, action: PayloadAction<ITask[]>) {
            state.tasks = action.payload
        },
    },
})

export default todoSlice.reducer

export const { taskState } = todoSlice.actions

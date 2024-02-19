import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProject } from '../api/types'

interface IProjectState {
    projects: IProject[]
}

const initialState: IProjectState = {
    projects: [],
}

export const projectSlice = createSlice({
    initialState,
    name: 'projectSlice',
    reducers: {
        projectState(state, action: PayloadAction<IProject[]>) {
            state.projects = action.payload
        },
    },
})

export default projectSlice.reducer

export const { projectState } = projectSlice.actions

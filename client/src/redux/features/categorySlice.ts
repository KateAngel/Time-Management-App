import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory } from '../api/types'

interface ICategoryState {
    categories: ICategory[]
}

const initialState: ICategoryState = {
    categories: [],
}

export const categorySlice = createSlice({
    initialState,
    name: 'categorySlice',
    reducers: {
        categoryState(state, action: PayloadAction<ICategory[]>) {
            state.categories = action.payload
        },
    },
})

export default categorySlice.reducer

export const { categoryState } = categorySlice.actions

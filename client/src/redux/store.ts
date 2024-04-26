import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authApi } from './api/authApi'
import { userApi } from './api/userApi'
import { categoryApi } from './api/categoryApi'
import { projectApi } from './api/projectApi'
import { todoApi } from './api/todoApi'
import userReducer from './features/userSlice'
import categoryReducer from './features/categorySlice'
import projectReducer from './features/projectSlice'
import todoReducer from './features/todoSlice'

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
        userState: userReducer,
        categoryState: categoryReducer,
        projectState: projectReducer,
        todoState: todoReducer,
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat([
            // 'serializableCheck: false' fixed error after changing to DateTime in api/projectAPI.
            // Not sure yet that this is a good solution.
            authApi.middleware,
            userApi.middleware,
            categoryApi.middleware,
            projectApi.middleware,
            todoApi.middleware,
        ]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

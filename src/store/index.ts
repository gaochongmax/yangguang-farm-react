import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth-slice'
import userReducer from './reducers/user-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

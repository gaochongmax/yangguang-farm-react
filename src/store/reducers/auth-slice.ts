import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { AppDispatch } from '..'
import { http } from '@/utils'

const initialValue: boolean = false

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialValue,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => state = action.payload
  }
})

export const selectAuth = (state: RootState) => state.auth

export const { setAuth } = authSlice.actions

export const setAuthByRequest = () => async (dispatch: AppDispatch) => {
  let res = initialValue
  try {
    res = await http<boolean>('/site/check-login')
  } catch (e) {
    throw e
  } finally {
    dispatch(setAuth(res))
    return res
  }
}

export default authSlice.reducer

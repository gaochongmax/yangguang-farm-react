import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { AppDispatch } from '..'
import type { User } from '@/types'
import { http } from '@/utils'

const initialValue: User = {
  name: '',
  mobile: '',
  role: 0,
  avatar_id: '',
  avatar_url: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => state = action.payload
  }
})

export const selectUser = (state: RootState) => state.user

export const { setUser } = userSlice.actions

export const setUserByRequest = () => async (dispatch: AppDispatch) => {
  let res = initialValue
  try {
    res = await http<User>('/user/profile')
  } catch (e) {
    throw e
  } finally {
    dispatch(setUser(res))
    return res
  }
}

export default userSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'
import { AppDispatch } from '..'

interface CounterState {
  value: number
}

const initialValue: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialValue,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const selectCount = (state: RootState) => state.counter.value

export const incrementAsync = (amount: number) => (dispatch: AppDispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch(incrementByAmount(amount))
      resolve(123)
    }, 3000)
  })
}

export default counterSlice.reducer

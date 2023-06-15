import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'

const initialState = {
  data: [],
  error: null,
  loading: false,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      const data = state.data.find((item) => item?._id === action.payload?._id)
      if (data) {
        state.data = state.data.map((item) => {
          if (item?._id === action.payload?._id) {
            item.quantity += 1
            return item;
          } else {
            return item;
          }
        })
      } else {
        state.data.push({...action.payload, quantity: 1})
      }
      console.log(state.data)
    },
    remove: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload)
    }

  },
  extraReducers: (builder) => {
    
  }
})

export const { add, remove } = cartSlice.actions

export default cartSlice.reducer
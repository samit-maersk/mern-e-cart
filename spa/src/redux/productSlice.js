import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  error: {},
  loading: false,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productById: (state, action) => {

    }
  },
})

export const { productById } = productSlice.actions

export default productSlice.reducer
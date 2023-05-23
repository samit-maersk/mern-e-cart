import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  error: {},
  loading: false,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryById: (state, action) => {

    }
  },
})

export const { categoryById } = categorySlice.actions

export default categorySlice.reducer
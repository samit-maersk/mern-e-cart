import { configureStore } from '@reduxjs/toolkit'
import authReducer, { userInfo } from './authSlice'
import categoryReducer, { allCategory } from './categorySlice'
import productReducer from './productSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
  },
})

store.dispatch(userInfo())

store.dispatch(allCategory())
import { configureStore } from '@reduxjs/toolkit'
import authReducer, { userInfo } from './authSlice'
import categoryReducer, { allCategory } from './categorySlice'
import productReducer, { allProduct } from './productSlice'
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
})

store.dispatch(userInfo())
store.dispatch(allCategory())
store.dispatch(allProduct())
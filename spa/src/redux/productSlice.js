import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'

export const allProduct = createAsyncThunk(
  "product/all",
  async () => {
    return axios.get('/products').then((res) => res.data);
  }
);

export const addProduct = createAsyncThunk(
  "product/add",
  async (payload) => {
    return axios.post('/products', payload).then((res) => res.data);
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (payload) => {
    return axios.put(`/products/${payload.id}`, payload.data).then((res) => res.data);
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id) => {
    return axios.delete(`/products/${id}`).then((res) => id);
  }
);

const initialState = {
  data: [],
  error: null,
  loading: false,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      //read
      .addCase(allProduct.pending, (state) => {
        state.loading = true;
        state.data = []
      })
      .addCase(allProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(allProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //create
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload)
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((item) => item._id === action.payload.id)
        if(index !== -1) state.data[index] = action.payload
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //delete
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item._id !== action.payload)
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
})

//export const { productById } = productSlice.actions

export default productSlice.reducer
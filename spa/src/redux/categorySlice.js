import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'

export const allCategory = createAsyncThunk(
  "category/all",
  async () => {
    return axios.get('/category').then((res) => res.data);
  }
);

export const addCategory = createAsyncThunk(
  "category/add",
  async (payload) => {
    return axios.post('/category', payload).then((res) => res.data);
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async (payload) => {
    return axios.put(`/category/${payload.id}`, payload.data).then((res) => res.data);
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    return axios.delete(`/category/${id}`).then((res) => id);
  }
);

const initialState = {
  data: [],
  error: null,
  loading: false,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      //read
      .addCase(allCategory.pending, (state) => {
        state.loading = true;
        state.data = []
      })
      .addCase(allCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(allCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //create
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload)
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //update
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex((item) => item._id === action.payload.id)
        if(index !== -1) state.data[index] = action.payload
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //delete
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((item) => item._id !== action.payload)
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
})

//export const { } = categorySlice.actions

export default categorySlice.reducer
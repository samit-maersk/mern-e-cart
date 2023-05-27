import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../axios'

const db = [
  {
    "_id": "646cd49393feab804681bce7",
    "name": "Beverage",
    "description": "Beverage safasfasfsfasfasfasfas a sfa sf asf asf asf asf asf as ",
    "__v": 0
  },
  {
      "_id": "646cd4a493feab804681bce9",
      "name": "Bakery",
      "description": "Bakery",
      "__v": 0
  },
  {
      "_id": "646cd4b093feab804681bceb",
      "name": "Nonfood & Pharmacy",
      "description": "Nonfood & Pharmacy",
      "__v": 0
  },
  {
    "_id": "646cd4a493feab804681bce9",
    "name": "Bakery",
    "description": "Bakery",
    "__v": 0
},
{
    "_id": "646cd4b093feab804681bceb",
    "name": "Nonfood & Pharmacy",
    "description": "Nonfood & Pharmacy",
    "__v": 0
}
];

export const allCategory = createAsyncThunk(
  "category/all",
  () => {
    return Promise.all(db);
  }
);

export const addCategory = createAsyncThunk(
  "category/add",
  (payload) => {
    return Promise.resolve(payload);
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  (payload) => {
    return Promise.resolve(payload);
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  (id) => {
    return Promise.resolve(id);
  }
);

const initialState = {
  data: [],
  error: {},
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
        const index = state.data.findIndex((item) => item._id === action.payload)
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
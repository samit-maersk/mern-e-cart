import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const login = createAsyncThunk(
  "auth/login",
  async ({ payload, navigate ,toast}) => {
    console.log(payload)
    axios.post('/login', payload)
      .then(res => {
        toast.success(res.data.message);
        navigate("/");
        localStorage.setItem('token', res.data.token)
        return res.data
      })
      .catch(err => {
        toast.error(`Login Failed ${err.message}`);
        return err.response.data
      })
  }
);

export const userInfo = createAsyncThunk(
  "auth/userInfo",
  async ({ toast}) => {
    axios.get('/user-info')
      .then(res => {
        return res.data
      })
      .catch(err => {
        toast.error(err.message);
        return err.response.data
      })
  }
);

const initialState = {
  user: {},
  error: {},
  loading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(userInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../axios'

export const login = createAsyncThunk(
  "auth/login",
  async ({ payload, navigate ,toast}) => {
    return axios.post('/login', payload)
      .then(res => {
        toast.success(res.data.message);
        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        return res.data
      })
      .then(data => {
        return axios.get('/user-info')
      })
      .then(res => {
        navigate('/', { state: { isLoggedIn: true } })
        return res.data
      })
      // .catch(err => {
      //   toast.error(`Login Failed ${err.message}`);
      //   return err.response.data
      // })
  }
);

export const userInfo = createAsyncThunk(
  "auth/userInfo",
  async () => {
    return axios.get('/user-info')
      .then(res => {
        return res.data
      })
      // .catch(err => {
      //   return err.response.data
      // })
  }
);

const initialState = {
  user: {},
  error: null,
  loading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
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
        state.user = action.payload
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
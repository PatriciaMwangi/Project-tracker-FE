// src/features/auth/forgotPasswordSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = "https://project-tracker-be-jwpt.onrender.com";

// Async thunk to handle forgot password API call
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    successMessage: '',
    errorMessage: '',
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.successMessage = '';
      state.errorMessage = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.successMessage = '';
        state.errorMessage = '';
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.msg;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || 'Something went wrong';
      });
  },
});

export const { resetState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;

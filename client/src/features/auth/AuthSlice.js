import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  email: null,
  isAdmin: false,
  token: null,  // Added token state
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.email = action.payload.user.email;
      state.isAdmin = action.payload.isAdmin;
      state.token = action.payload.token;  // Store token
    },
    clearUser: (state) => {
      state.user = null;
      state.email = null;
      state.isAdmin = false;
      state.token = null;  // Clear token on logout
    }
  }
});

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.isAdmin;
export const selectToken = (state) => state.auth.token;  // Selector for token

export const { setUser, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;

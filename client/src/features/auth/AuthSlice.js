import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  email: null,
  isAdmin: false
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.email = action.payload.user.email;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.user = null;
      state.email = null;
      state.isAdmin = false;
    }
  }
});

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export const { setUser, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;
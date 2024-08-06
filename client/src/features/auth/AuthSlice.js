import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAdmin: false
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAdmin = false;
    }
  }
});

export const { setUser, clearUser } = AuthSlice.actions;
export default AuthSlice.reducer;
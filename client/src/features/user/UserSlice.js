import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,  // Tracks whether the user is logged in
  user: null,  // Holds the user information (name, email, profile picture)
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action for logging in and setting user data
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;  // Payload contains user details like name, email, etc.
    },
    
    // Action for logging out and clearing user data
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;  // Clear user data
    },
    
    // Action for updating user details after the user is logged in
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };  // Update user details with the new data
      }
    },
  },
});

export const { loginSuccess, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Admin',
  email: 'admin@example.com',
  profilePicture: '/profile-pic.png',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;

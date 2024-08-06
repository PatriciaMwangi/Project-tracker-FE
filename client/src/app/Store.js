import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'; // Import the reducer

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

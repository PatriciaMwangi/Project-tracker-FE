// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/AuthSlice';
import projectsReducer from './features/projects/ProjectsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  }
});

export default store;

// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/AuthSlice';
import projectsReducer from './features/projects/ProjectsSlice';
import cohortsReducer from './features/cohorts/CohortsSlice';
import userReducer from './features/user/UserSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    cohorts: cohortsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions
        ignoredActions: ['auth/setUser'],
        // Ignore paths in the state
        ignoredPaths: ['auth.user'],
      },
    }),
});

export default store;

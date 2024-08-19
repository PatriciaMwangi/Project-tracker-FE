// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/AuthSlice';
import projectsReducer from './features/projects/ProjectsSlice';
import cohortsReducer from './features/cohorts/CohortsSlice';
import userReducer from './features/user/UserSlice';
import forgotPasswordReducer from './features/forgotPasswords/ForgotPasswordSlice';
import resetPasswordReducer from './features/forgotPasswords/ResetPasswordSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    cohorts: cohortsReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
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

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import cinemahallReducer from '../features/admin/CinemahallSlice'
import clientReducer from '../features/client/ClientSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cinemahall: cinemahallReducer,
    client: clientReducer,
  },
});

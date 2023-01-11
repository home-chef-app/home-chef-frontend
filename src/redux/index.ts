import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users';
import sellersReducer from './sellers';
import stateReducer from './appState';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    appState: stateReducer,
    users: usersReducer,
    sellers: sellersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export type RootState = ReturnType<typeof store.getState>;

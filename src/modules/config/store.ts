import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import loginReducer from '../authentication/presentation/login-slice';
import authenticationReducer from '../authentication/presentation/authentication-slice';

export const store = configureStore({
  reducer: {
    login : loginReducer,
    authentication : authenticationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

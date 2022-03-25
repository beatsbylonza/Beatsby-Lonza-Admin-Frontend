import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import loginReducer from '../authentication/presentation/login-slice';
import authenticationReducer from '../authentication/presentation/authentication-slice';
import getAllOrdersReducer from '../orders/presentation/get-all-orders-slice';

export const store = configureStore({
  reducer: {
    login : loginReducer,
    authentication : authenticationReducer,
    getAllOrders: getAllOrdersReducer
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

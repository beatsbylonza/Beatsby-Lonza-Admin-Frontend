import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import loginReducer from '../authentication/presentation/login-slice';
import authenticationReducer from '../authentication/presentation/authentication-slice';
import getAllOrdersReducer from '../orders/presentation/get-all-orders-slice';
import getAllCustomersReducer from '../customers/presentation/get-all-customers-slice';
import getAllProductsReducer  from '../products/presentation/get-all-products-slice';

export const store = configureStore({
  reducer: {
    login : loginReducer,
    authentication : authenticationReducer,
    getAllOrders: getAllOrdersReducer,
    getAllCustomers: getAllCustomersReducer,
    getAllProducts: getAllProductsReducer,
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

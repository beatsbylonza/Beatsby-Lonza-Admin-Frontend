import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../config/store';
import UserModel from '../core/domain/user.model';
import { LoginProps } from '../core/props/authentication.props';
import LoginUserUsecase from '../core/usecases/login-user.usecase';
import { LoginRepositoryResponse } from '../data/repository/authentication-repository';

export enum LoginState {
  initial,
  inProgress,
  success,
  fails,
}
const initialState  = {
  status: LoginState.initial
};


export const loginUser = createAsyncThunk(
  'counter/fetchCount',
  async (loginProps: LoginProps) => {
    
    const response : LoginRepositoryResponse  = await LoginUserUsecase({
      email: loginProps.email,
      password: loginProps.password,
    });
    
    return response;
  }
);

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers: (builder : any) => {
      builder
        .addCase(loginUser.pending, (state : any, action : any) => {
          state.status = LoginState.inProgress;
        })
        .addCase(loginUser.fulfilled, (state : any, action : PayloadAction<{message: string, token: string}>) => {
          // localStorage.setItem('authentication', action.payload.data.token);
          // console.log(action.payload);
          
          state.status = LoginState.success;
        });
    },
});

export const selectLogin = (state: RootState) => state.login.status;

export default loginSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../config/store';

const initialState = {};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
      loginInProgress: (state) =>{

      },
      loginSuccess: (state) =>{

      },
      loginFails: (state) =>{

      },
    },

});

export const { loginInProgress, loginSuccess, loginFails } = loginSlice.actions;

export default loginSlice.reducer;

export const selectLogin = (state: RootState) => state;

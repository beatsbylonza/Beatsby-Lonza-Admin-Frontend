import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../config/store";
import UserModel from "../core/domain/user.model";

/* Authentication status state */
export enum AuthenticationState{
    initial,
    inProgress,
    success,
    fail
}

/* Authentication State Interface */

const initialState : {
    status: AuthenticationState,
    user?: UserModel,
} = {
    status: AuthenticationState.initial,
}

/* Main Slice */

export const authenticationSlice = createSlice({
    name:'authentication',
    initialState,
    reducers : {
        authenticationInProgress : (state) => {
            
            state.status = AuthenticationState.inProgress;
        },
        authenticationSuccess : (state) => {

            state.status = AuthenticationState.success;
        },
        authenticationFails : (state) => {

            state.status = AuthenticationState.fail;
        },
    },
});

export const { authenticationInProgress, authenticationSuccess, authenticationFails } = authenticationSlice.actions;
export const selectAuthentication = (state : RootState) => state;

export default authenticationSlice.reducer;
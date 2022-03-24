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
        authenticationInitial : (state) => {
            state.status = AuthenticationState.initial;
            state.user = undefined;
        },
        authenticationInProgress : (state) => {
            state.status = AuthenticationState.inProgress;
        },
        authenticationSuccess : (state, action:  PayloadAction<UserModel>) => {
            state.user = action.payload;
            state.status = AuthenticationState.success;
        },
        authenticationFails : (state) => {
            state.status = AuthenticationState.fail;
        },
    },
});

export const { authenticationInProgress, authenticationSuccess, authenticationFails, authenticationInitial } = authenticationSlice.actions;
export const selectAuthentication = (state : RootState) => state.authentication;

export default authenticationSlice.reducer;
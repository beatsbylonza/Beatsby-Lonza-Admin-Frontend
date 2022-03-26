import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserModel from "../../authentication/core/domain/user.model";
import { RootState } from "../../config/store";
import { GetAllCustomersProps } from "../core/customers.props";
import GetAllCustomersUsecase from "../core/usecases/get-all-customers.usecase";
import { GetAllCustomersRepositoryResponse } from "../data/repository/customers.repository";

export enum GetAllCustomersState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetAllCustomersState,
    data: Array<UserModel>
} = {
    status: GetAllCustomersState.initial,
    data: [],
}

export const getAllCustomers = createAsyncThunk('getAllCustomers',
    async (props : GetAllCustomersProps) => {

        const response : GetAllCustomersRepositoryResponse = await GetAllCustomersUsecase(props);

        return response.data;
    }
)

/* Main Slice */
export const getAllCustomersSlice = createSlice({
    name:'getAllCustomers',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getAllCustomers.pending, (state: any)=>{
            state.status = GetAllCustomersState.inProgress;
        }).addCase(getAllCustomers.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<UserModel>}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetAllCustomersState.success;
        })
    }
});

// export const {  } = getAllCustomersSlice.actions;


export const selectGetAllCustomers = (state : RootState) => state.getAllCustomers;

export default getAllCustomersSlice.reducer;
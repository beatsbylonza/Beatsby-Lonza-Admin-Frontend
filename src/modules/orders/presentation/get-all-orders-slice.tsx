import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../config/store";
import { OrderModel } from "../core/domain/order.model";
import { GetAllOrdersProps } from "../core/order.props";
import GetAllOrdersUsecase from "../core/usecases/get-all-orders.usecase";
import { GetAllOrderRepositoryResponse } from "../data/repository/order-repository";

export enum GetAllOrdersState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetAllOrdersState,
    data: Array<OrderModel>
} = {
    status: GetAllOrdersState.initial,
    data: [],
}

export const getAllOrders = createAsyncThunk('getAllOrders',
    async (props : GetAllOrdersProps) => {

        const response : GetAllOrderRepositoryResponse = await GetAllOrdersUsecase(props);

        return response.data;
    }
)

/* Main Slice */
export const getAllOrdersSlice = createSlice({
    name:'getAllOrders',
    initialState,
    reducers : {},
    extraReducers: (builder: any) => {
        builder.addCase(getAllOrders.pending, (state: any)=>{
            state.status = GetAllOrdersState.inProgress;
        }).addCase(getAllOrders.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<OrderModel>}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetAllOrdersState.success;
        })
    }
});

// export const {  } = getAllOrdersSlice.actions;


export const selectGetAllOrders = (state : RootState) => state.getAllOrders;

export default getAllOrdersSlice.reducer;
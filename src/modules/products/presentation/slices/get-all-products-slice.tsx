import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../config/store";
import { ProductModel } from "../../core/domain/product.model";
import { GetAllProductsProps } from "../../core/products.props";
import GetAllProductsUsecase from "../../core/usecases/get-all-products.usecase";
import { GetAllProductsRepositoryResponse } from "../../data/repository/products.repository";


export enum GetAllProductsState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: GetAllProductsState,
    data: Array<ProductModel>
} = {
    status: GetAllProductsState.initial,
    data: [],
}

export const getAllProducts = createAsyncThunk('getAllProducts',
    async (props : GetAllProductsProps) => {

        const response : GetAllProductsRepositoryResponse = await GetAllProductsUsecase(props);

        return response.data;
    }
)

/* Main Slice */
export const getAllProductsSlice = createSlice({
    name:'getAllProducts',
    initialState,
    reducers : {
    },
    extraReducers: (builder: any) => {
        builder.addCase(getAllProducts.pending, (state: any)=>{
            state.status = GetAllProductsState.inProgress;
        }).addCase(getAllProducts.fulfilled, (state: any, action : PayloadAction<{message: string, data: Array<ProductModel>}> ) => {
            const data = action.payload.data;
            
            state.data = data;
            state.status = GetAllProductsState.success;
        })
    }
});

// export const {  } = getAllProductsSlice.actions;


export const selectGetAllProducts = (state : RootState) => state.getAllProducts;

export default getAllProductsSlice.reducer;
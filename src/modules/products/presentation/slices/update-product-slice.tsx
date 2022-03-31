import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../config/store";
import { UpdateProductProps } from "../../core/products.props";
import UpdateProductUsecase from "../../core/usecases/update-product.usecase";
import { UpdateProductRepositoryResponse } from "../../data/repository/products.repository";

export enum UpdateProductState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: UpdateProductState,
    message: string,
} = {
    status: UpdateProductState.initial,
    message: ''
}

export const updateProduct = createAsyncThunk('UpdateProduct',
    async (props : UpdateProductProps) => {

        const response : UpdateProductRepositoryResponse = await UpdateProductUsecase(props);

        return response.data;
    }
)

/* Main Slice */
export const updateProductSlice = createSlice({
    name:'UpdateProduct',
    initialState,
    reducers : {
        updateProductInitial: (state) => {
            
            state.status = UpdateProductState.initial;
            state.message = '';
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(updateProduct.pending, (state: any)=>{

            state.status = UpdateProductState.inProgress;
        }).addCase(updateProduct.fulfilled, (state: any, action : PayloadAction<{message: string}> ) => {
            
            state.status = UpdateProductState.success;
            state.message = action.payload.message;
        }).addCase(updateProduct.rejected, (state: any, action : PayloadAction<{message: string}>) => {
            
            state.status = UpdateProductState.fail;
            state.message = action.payload.message;
        })
    }
});

export const { updateProductInitial } = updateProductSlice.actions;


export const selectUpdateProduct = (state : RootState) => state.updateProduct;

export default updateProductSlice.reducer;
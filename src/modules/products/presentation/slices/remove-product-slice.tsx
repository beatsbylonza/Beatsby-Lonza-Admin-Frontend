import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../config/store";
import { RemoveProductProps } from "../../core/products.props";
import RemoveProductUsecase from "../../core/usecases/remove-product.usecase";
import { RemoveProductRepositoryResponse } from "../../data/repository/products.repository";

export enum RemoveProductState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: RemoveProductState,
    message: string,
} = {
    status: RemoveProductState.initial,
    message: ''
}

export const removeProduct = createAsyncThunk('RemoveProduct',
    async (props : RemoveProductProps) => {
        const response : RemoveProductRepositoryResponse = await RemoveProductUsecase(props);

        return response.data;
    }
)

/* Main Slice */
export const removeProductSlice = createSlice({
    name:'RemoveProduct',
    initialState,
    reducers : {
        removeProductInitial: (state) => {
            
            state.status = RemoveProductState.initial;
            state.message = '';
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(removeProduct.pending, (state: any)=>{

            state.status = RemoveProductState.inProgress;
        }).addCase(removeProduct.fulfilled, (state: any, action : PayloadAction<{message: string}> ) => {
            
            state.status = RemoveProductState.success;
            state.message = action.payload.message;
        }).addCase(removeProduct.rejected, (state: any, action : PayloadAction<{message: string}>) => {
            
            state.status = RemoveProductState.fail;
            state.message = action.payload.message;
        })
    }
});

export const { removeProductInitial  } = removeProductSlice.actions;


export const selectRemoveProduct = (state : RootState) => state.removeProduct;

export default removeProductSlice.reducer;

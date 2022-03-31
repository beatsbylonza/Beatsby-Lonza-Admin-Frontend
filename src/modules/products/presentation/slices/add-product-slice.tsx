import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../config/store";
import { AddProductProps } from "../../core/products.props";
import AddProductUsecase from "../../core/usecases/add-product.usecase";
import { AddProductRepositoryResponse } from "../../data/repository/products.repository";


export enum AddProductState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: AddProductState,
    message: string,
} = {
    status: AddProductState.initial,
    message: '',
}

export const addProduct = createAsyncThunk('AddProduct',
    async (props : AddProductProps) => {

        const response : AddProductRepositoryResponse = await AddProductUsecase({
            token: props.token,
            formData: props.formData,
        });

        return response.data;
    }
)

/* Main Slice */
export const AddProductSlice = createSlice({
    name:'AddProduct',
    initialState,
    reducers : {
        addProductInitial: (state) => {
            state.status = AddProductState.initial;
            state.message = '';
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(addProduct.pending, (state: any)=>{
            state.status = AddProductState.inProgress;
        }).addCase(addProduct.fulfilled, (state: any, action: PayloadAction<{message : string}>) => {
            state.status = AddProductState.success;
            state.message = action.payload.message;
        }).addCase(addProduct.rejected, (state: any, action: PayloadAction<{message : string}>) => {
            state.status = AddProductState.fail;
            state.message = action.payload.message;
        })
    }
});

export const { addProductInitial } = AddProductSlice.actions;


export const selectAddProduct = (state : RootState) => state.addProduct;

export default AddProductSlice.reducer;
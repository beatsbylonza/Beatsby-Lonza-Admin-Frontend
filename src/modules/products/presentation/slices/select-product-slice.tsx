import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../config/store";
import { ProductModel } from "../../core/domain/product.model";
import { SelectProductProps } from "../../core/products.props";
import SelectProductUsecase from "../../core/usecases/select-product-usecase";
import { SelectProductRepositoryResponse } from "../../data/repository/products.repository";

export enum SelectProductState{
    initial,
    inProgress,
    success,
    fail
}


const initialState : {
    status: SelectProductState,
    message: string,
    data?: ProductModel,
} = {
    status: SelectProductState.initial,
    message: ''
}

export const selectProduct = createAsyncThunk('SelectProduct',
    async (props : SelectProductProps) => {
        const response : SelectProductRepositoryResponse = await SelectProductUsecase(props);

        return response.data;
    }
)

/* Main Slice */
export const selectProductSlice = createSlice({
    name:'SelectProduct',
    initialState,
    reducers : {
        selectProductInitial: (state) => {
            
            state.status = SelectProductState.initial;
            state.message = '';
            state.data = undefined;
        }
    },
    extraReducers: (builder: any) => {
        builder.addCase(selectProduct.pending, (state: any)=>{

            state.status = SelectProductState.inProgress;
        }).addCase(selectProduct.fulfilled, (state: any, action : PayloadAction<{message: string, data: ProductModel}> ) => {
            
            state.status = SelectProductState.success;
            state.message = action.payload.message;
            state.data = action.payload.data;
        })
        .addCase(selectProduct.rejected, (state: any, action : PayloadAction<{message: string, data: ProductModel}>) => {
            state.status = SelectProductState.fail;
            state.message = action.payload.message;
        })
    }
});

export const {  selectProductInitial } = selectProductSlice.actions;


export const selectSelectProduct = (state : RootState) => state.selectProduct;

export default selectProductSlice.reducer;
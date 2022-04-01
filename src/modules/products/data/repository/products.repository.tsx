import axios from "axios"
import { REACT_APP_API_URL } from "../../../shared/constants"
import { ProductModel } from "../../core/domain/product.model"
import { AddProductProps, GetAllProductsProps, RemoveProductProps, SelectProductProps, UpdateProductProps } from "../../core/products.props"

export interface GetAllProductsRepositoryResponse{
    data : {
        message: string,
        data: Array<ProductModel>
    }
}

export interface AddProductRepositoryResponse{
    data: { 
        message: string,
    }
}

export interface RemoveProductRepositoryResponse{
    data: {
        message: string,
    }
}

export interface UpdateProductRepositoryResponse{
    data: {
        message: string,
    }
}

export interface SelectProductRepositoryResponse{
    data: {
        message: string,

        data: ProductModel
    }
}

export function GetAllProductsRepository(props: GetAllProductsProps) : Promise<GetAllProductsRepositoryResponse>{
    return axios.get(`${REACT_APP_API_URL}/products`,{
        headers: {
            Authorization : `Bearer ${props.token}`,
        }
    });
}

export function AddProductRepository(props: AddProductProps) : Promise<AddProductRepositoryResponse>{
    return axios.post(`${REACT_APP_API_URL}/products/add`, props.formData, {
        headers: {
            'Authorization' : `Bearer ${props.token}`,
            'content-type' : 'multipart/form-data', 
        }
    })
}

export function RemoveProductRepository(props: RemoveProductProps) : Promise<RemoveProductRepositoryResponse>{
    return axios.delete(`${REACT_APP_API_URL}/products/${props.productsId}`, {
        headers: {
            'Authorization' : `Bearer ${props.token}`,
        }
    });
}

export function SelectProductRepository(props: SelectProductProps) : Promise<SelectProductRepositoryResponse>{
    return axios.get(`${REACT_APP_API_URL}/products/${props.productId}`, {
        headers: {
            'Authorization' : `Bearer ${props.token}`,
        }
    });
}

export function UpdateProductRepository(props: UpdateProductProps) : Promise<UpdateProductRepositoryResponse>{
    return axios.put(`${REACT_APP_API_URL}/products/${props.productId}`,props.formData, {
        headers: {
            'Authorization' : `Bearer ${props.token}`,
        }
    });
}
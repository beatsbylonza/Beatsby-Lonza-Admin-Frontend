import axios from "axios"
import { REACT_APP_API_URL } from "../../../shared/constants"
import { ProductModel } from "../../core/domain/product.model"
import { AddProductProps, GetAllProductsProps, RemoveProductProps } from "../../core/products.props"

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
    return axios.delete(`${REACT_APP_API_URL}/products/remove/${props.productsId}`, {
        headers: {
            'Authorization' : `Bearer ${props.token}`,
        }
    });
}
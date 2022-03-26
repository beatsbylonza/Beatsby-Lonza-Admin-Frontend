import axios from "axios"
import { REACT_APP_API_URL } from "../../../shared/constants"
import { ProductModel } from "../../core/domain/product.model"
import { GetAllProductsProps } from "../../core/products.props"

export interface GetAllProductsRepositoryResponse{
    data : {
        message: string,
        data: Array<ProductModel>
    }
}

export function GetAllProductsRepository(props: GetAllProductsProps) : Promise<GetAllProductsRepositoryResponse>{
    return axios.get(`${REACT_APP_API_URL}/products`,{
        headers: {
            Authorization : `Bearer ${props.token}`,
        }
    });
}
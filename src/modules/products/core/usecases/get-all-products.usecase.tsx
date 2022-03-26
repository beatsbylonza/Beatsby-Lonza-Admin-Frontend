import { GetAllProductsRepository, GetAllProductsRepositoryResponse } from "../../data/repository/products.repository";
import { GetAllProductsProps } from "../products.props";

export default function GetAllProductsUsecase(props: GetAllProductsProps) : Promise<GetAllProductsRepositoryResponse>{
    return GetAllProductsRepository(props);
}
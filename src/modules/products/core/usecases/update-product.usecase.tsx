import { UpdateProductRepository, UpdateProductRepositoryResponse } from "../../data/repository/products.repository";
import { UpdateProductProps } from "../products.props";

export default function UpdateProductUsecase(props: UpdateProductProps) : Promise<UpdateProductRepositoryResponse>{
    return UpdateProductRepository(props);
}
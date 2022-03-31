import { AddProductRepository, AddProductRepositoryResponse } from "../../data/repository/products.repository";
import { AddProductProps } from "../products.props";

export default function AddProductUsecase(props: AddProductProps) : Promise<AddProductRepositoryResponse>{
    return AddProductRepository(props);
}
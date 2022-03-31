import { RemoveProductRepository, RemoveProductRepositoryResponse } from "../../data/repository/products.repository";
import { RemoveProductProps } from "../products.props";

export default function RemoveProductUsecase(props: RemoveProductProps) : Promise<RemoveProductRepositoryResponse>{
    return RemoveProductRepository(props);
}

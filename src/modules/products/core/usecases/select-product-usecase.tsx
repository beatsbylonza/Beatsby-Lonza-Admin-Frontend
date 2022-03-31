import { SelectProductRepository, SelectProductRepositoryResponse } from "../../data/repository/products.repository";
import { SelectProductProps } from "../products.props";


export default function SelectProductUsecase(props: SelectProductProps) : Promise<SelectProductRepositoryResponse>{
    return SelectProductRepository(props);
}
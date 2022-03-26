import { GetAllCustomersRepository, GetAllCustomersRepositoryResponse } from "../../data/repository/customers.repository";
import { GetAllCustomersProps } from "../customers.props";

export default function GetAllCustomersUsecase(props: GetAllCustomersProps) : Promise<GetAllCustomersRepositoryResponse>{
    return GetAllCustomersRepository(props);
}
import axios from "axios"
import UserModel from "../../../authentication/core/domain/user.model"
import { REACT_APP_API_URL } from "../../../shared/constants"
import { GetAllCustomersProps } from "../../core/customers.props"

export interface GetAllCustomersRepositoryResponse {
    data: {
        message: string,
        data: Array<UserModel>
    }
}

export function GetAllCustomersRepository(props: GetAllCustomersProps) : Promise<GetAllCustomersRepositoryResponse>{
    return axios.get(`${REACT_APP_API_URL}/customers`, {
        headers: { Authorization: `Bearer ${props.token}`}
    });
}
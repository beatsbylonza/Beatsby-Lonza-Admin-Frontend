import axios from "axios"
import { OrderModel } from "../../core/domain/order.model";
import { REACT_APP_API_URL } from '../../../shared/constants';
import { GetAllOrdersProps } from "../../core/order.props";

/** Get All Order Repository Response */
export interface GetAllOrderRepositoryResponse{
    data: {
        message: string,
        data: Array<OrderModel>
    }
}

export function GetAllOrderRepository(props: GetAllOrdersProps) : Promise<GetAllOrderRepositoryResponse>{
    return axios.get(`${REACT_APP_API_URL}/orders`, { headers : {
        Authorization: `Bearer ${props.token}`
    }});
}
import { GetAllOrderRepositoryResponse, GetAllOrderRepository } from '../../data/repository/order-repository';
import { GetAllOrdersProps } from '../order.props';

export default function GetAllOrdersUsecase(props: GetAllOrdersProps) : Promise<GetAllOrderRepositoryResponse> {
    return GetAllOrderRepository(props);
}
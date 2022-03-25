import { GetAllOrderRepositoryResponse, GetAllOrderRepository } from '../../data/repository/order-repository';
import { GetAllOrdersProps } from '../order.props';

export default function GetAllOrdersUseCase(props: GetAllOrdersProps) : Promise<GetAllOrderRepositoryResponse> {
    return GetAllOrderRepository(props);
}
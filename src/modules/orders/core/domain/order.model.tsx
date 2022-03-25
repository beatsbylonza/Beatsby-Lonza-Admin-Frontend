export interface OrderModel{
    _id: string;
    productId: string;
    customerId: string;
    quantity: number;
    deliveryAddress: string;
    status: string;

    /* Date */
    createdAt: string;
}
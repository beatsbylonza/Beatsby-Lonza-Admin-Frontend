export interface ProductModel {
    _id: string,

    name: string,
    createdAt: string,
    price: {
        value : {
            $numberDecimal: number,
        }
        currency: string,
    },
    stock: number,
    sales: number,
    sold: number,

    category: string,
    color: string,
    description: string,
    imageUrl: string,
    size: string,
    available: string,


}
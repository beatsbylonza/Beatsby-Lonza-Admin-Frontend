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
    available: number,

    category: string,
    colors: Array<string>,
    description: string,
    imageUrl: string,
    sizes: Array<string>,


}
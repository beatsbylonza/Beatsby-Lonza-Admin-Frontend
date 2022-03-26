export interface ProductModel {
    _id: string,

    name: string,
    createdAt: string,
    price: number,
    stock: number,
    sales: number,
    sold: number,

    categories: Array<string>,
    colors: Array<string>,
    description: string,
    imageUrls: Array<string>,
    sizes: Array<string>,
    available: string,


}
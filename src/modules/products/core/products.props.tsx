export interface GetAllProductsProps {
    token : string,
}

export interface AddProductProps {
    token: string,

    formData: FormData,
}

export interface RemoveProductProps{
    token: string,

    productsId: string,
}

export interface UpdateProductProps{
    token: string,

    productId: string,
}

export interface SelectProductProps{
    token: string,

    productId: string,
}
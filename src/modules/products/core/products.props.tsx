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
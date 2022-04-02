
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthenticationState, selectAuthentication } from '../../authentication/presentation/authentication-slice';
import { useAppSelector } from '../../config/hooks';
import SideBarNav from '../../shared/components/sidebar-nav';
import { PRODUCT_CATEGORIES, PRODUCT_COLOR, PRODUCT_SIZES } from '../../shared/constants';
import ProductInfoForm from './product-info-form';
import { addProduct, AddProductState, selectAddProduct } from './slices/add-product-slice';
  

/* Add Product Page Module */
export default function AddProductPage(){

    const authorizationState = useAppSelector(selectAuthentication);
    const addProductState = useAppSelector(selectAddProduct);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /** Add Product On Submit Form */
    function onSubmit(event : any, props: {colors: Array<string>, sizes : Array<string> }){
        event.preventDefault();
        
        
        const formData : FormData = new FormData(event.target);
        
        formData.append('sizes', JSON.stringify(props.sizes));
        formData.append('colors', JSON.stringify(props.colors));

        if(authorizationState.status === AuthenticationState.success){
            if(authorizationState.token)
              dispatch(addProduct({
                  token: authorizationState.token,
                  formData,
                }));
        }
    }

    useEffect(()=>{
        switch(addProductState.status){
            case AddProductState.success:
                navigate('/products');
                break;
        }
    },[addProductState, navigate]);

    
    
    return (
        <section className='flex h-screen space-x-2 overflow-y-auto'>

        <SideBarNav></SideBarNav>

        <section className='container flex flex-col h-full px-4 py-4 mx-auto'>

            <section className='mb-4 space-y-2'>
            
                <div className='text-[2rem] font-bold'>
                    {`Products > Add Product`}
                </div>

            </section>

            <section className='w-full mb-4 space-y-5'>
                <ProductInfoForm onSubmit={onSubmit}></ProductInfoForm>
                
                <div className="flex items-center justify-center w-full gap-5 mt-5 align-center">
                    <button className="px-4 py-2 font-bold text-white bg-blue-400 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline" type="submit" form='product-info-form'>
                        Save
                    </button>
                    <Link className="px-4 py-2 font-bold text-black bg-white border border-blue-100 rounded cursor-pointer hover:bg-gray-300 focus:outline-none focus:shadow-outline" to='/products'>
                        Cancel
                    </Link>
                </div>

            </section>
        
        </section>


        </section>
    );
}
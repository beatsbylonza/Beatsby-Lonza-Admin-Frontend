import { Component, useEffect, useState } from 'react';
import { PRODUCT_CATEGORIES, PRODUCT_COLOR, PRODUCT_SIZES } from '../../shared/constants';
import { ProductModel } from '../core/domain/product.model';
import { Autocomplete, TextField, Chip } from '@mui/material';

export default function ProductInfoForm(props: any){
    const { onSubmit, product }  : { onSubmit: any, product : ProductModel}= props;
    
    const [state, setState] = useState<{
        name: string,
        description: string,
        category: string,
        sizes: Array<string>,
        colors: Array<string>,
        price: number,
        available: number,
        stock: number,
        image: string | undefined,
    }>({
        name: '',
        description: '',
        category: '',
        sizes: [],
        colors: [],
        price: 0,
        available: 0,
        stock: 0,
        image: undefined
    });


    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
                setState((prevState  : any) => ({
                    ...prevState,
                    image: e.target.result,
                }));
            };
            reader.readAsDataURL(event.target.files[0]);
        }

    }

    /** GET Existing data to backend  */
    useEffect(()=>{
        if(product?.imageUrl){
            setState((prevState  : any) => ({
                ...product,
                price: product.price.value.$numberDecimal,
                image: product?.imageUrl? product.imageUrl : undefined,
            }));
        }
        
        setSizes(product?.sizes.length > 0 ? product?.sizes: []);
        setColors(product?.colors.length > 0 ? product?.colors: []);
    },[product]);

    const handleChange = (e: any) => {
        setState((prevState: any) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
    };

    const [colors, setColors] = useState<any>([]);
    const [sizes, setSizes] = useState<any>([]);

    return (
        <form id='product-info-form' className="w-full max-w" onSubmit={(e : any )=> onSubmit(e, { sizes, colors })}>
            <div className="flex flex-wrap w-full px-2 py-5 max-w">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="name">
                        Product Name
                    </label>
                    <input 
                        required 
                        type="text" 
                        placeholder=""  
                        id="name"
                        name="name"
                        value={state?.name}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white"
                    />
                    

                    <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="category">
                        Category
                    </label>
                    <div className="relative">
                        <select 
                            value={state?.category}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-100 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="category"
                            name="category">
                            {
                                PRODUCT_CATEGORIES.map((value: string, index: number)=> <option key={index}>{value}</option> )
                            }
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                
                </div>
                <div className="w-full px-3 md:w-1/2">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="grid-first-name">
                        Product Image
                    </label>
                    <div className="flex justify-center mt-2">
                        <div className="rounded-lg shadow-xl bg-gray-50 w-[400px]">
                            <div className="relative m-4">
                                {
                                    (!state?.image) ?
                                    <>
                                        <label className="inline-block mb-2 text-gray-500">Upload
                                            Image </label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                <div className="flex flex-col items-center justify-center pt-7">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <path fillRule="evenodd"
                                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                            clipRule="evenodd" />
                                                    </svg>
                                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                        Select a photo</p>
                                                </div>
                                            </label>
                                        </div>
                                    </> :
                                        <div className='h-[300px] w-auto relative'>
                                            <img className='top-0 object-contain h-[300px] w-[400px]' src={state?.image} alt=''/>
                                    </div>
                                }
                                <input required={state?.image === undefined ? true : false} onChange={onImageChange} type="file" className="absolute top-0 w-full h-full opacity-0" id='image' name="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap w-full px-2 py-5 max-w">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label 
                        className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                        htmlFor="description">
                        Description
                    </label>
                    <textarea 
                        rows={10} 
                        onChange={handleChange}
                        value={state?.description}
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white" 
                        id="description"
                        name="description"
                        placeholder="" />
                    
                </div>
                
                <div className="flex flex-wrap w-full px-3 mb-6 md:w-1/2 md:mb-0">

                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">

                        <div className='relative'>

                            {/* <select 
                                value={state?.size}
                                className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-100 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="size" 
                                onChange={handleChange}
                                name="size">
                                {
                                    PRODUCT_SIZES.map((value: string, index: number)=> <option key={index}>{value}</option> )
                                }
                            </select> */}
                            <Autocomplete
                                multiple
                                id="size"
                                options={[]}
                                value={sizes}
                                onChange={(_, newValue) => {
                                    setSizes(newValue)
                                }}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) => {
                                        return value.map((option: string, index: number) => (
                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                        ));
                                    }
                                }
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="SIZE"
                                />
                                )}
                            />
                        </div>
                        

                        <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="prize">
                            Price
                        </label>
                        <input 
                            required 
                            id="price" 
                            name="price"
                            value={state?.price}
                            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white" 
                            type="number" 
                            onChange={handleChange}
                            placeholder="" />
                        

                        <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="prize">
                            Stock
                        </label>

                        <input 
                            required 
                            id="stock" 
                            name="stock"
                            value={state?.stock}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white" 
                            type="number" 
                            placeholder="" />

                    </div>

                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">       

                        <div className='relative'>

                            <Autocomplete
                                multiple
                                id="color"
                                options={[]}
                                value={colors}
                                onChange={(_, newValue) => {
                                    setColors(newValue)
                                }}
                                freeSolo
                                renderTags={(value: readonly string[], getTagProps) => {
                                        return value.map((option: string, index: number) => (
                                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                        ));
                                    }
                                }
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="COLOR"
                                />
                                )}
                            />

                        </div>

                        

                        <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="prize">
                            Available   
                        </label>
                        <input 
                            required 
                            id="available" 
                            name="available"
                            value={state?.available}
                            onChange={handleChange}
                            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white" 
                            type="number" 
                            placeholder="" />
                        
                        

                    </div>

                </div>
            </div>
            
        </form>
    );
}
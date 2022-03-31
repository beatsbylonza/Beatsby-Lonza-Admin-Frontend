import { useEffect, useState } from 'react';
import { useAppSelector } from '../../config/hooks';
import { PRODUCT_CATEGORIES, PRODUCT_COLOR, PRODUCT_SIZES } from '../../shared/constants';
import { selectSelectProduct } from './slices/select-product-slice';

export default function ProductInfoForm(props: any){


    const { onSubmit } = props;

    const [image, setImage] = useState<any>(null);

    const selectProductState = useAppSelector(selectSelectProduct);

    const onImageChange = (event: any) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e: any) => {
            setImage(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }

    }

    useEffect(()=>{
        if(selectProductState.data?.imageUrl){
            setImage(selectProductState.data.imageUrl);
        }
    },[selectProductState]);

    

    return (
        <form id='product-info-form' className="w-full max-w" onSubmit={onSubmit}>
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
                        value={selectProductState.data?.name}
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white"
                    />
                    

                    <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="category">
                        Category
                    </label>
                    <div className="relative">
                        <select 
                            value={selectProductState.data?.category}
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
                            <div className="m-4 relative">
                                {
                                    (image === null) ?
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
                                            <img className='top-0 object-contain h-[300px] w-[400px]' src={image} alt={image}/>
                                    </div>
                                }
                                <input required onChange={onImageChange} type="file" className="absolute top-0 w-full h-full opacity-0" id='image' name="image" />
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
                        value={selectProductState.data?.description}
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white" 
                        id="description"
                        name="description"
                        placeholder="" />
                    
                </div>
                
                <div className="flex flex-wrap w-full px-3 mb-6 md:w-1/2 md:mb-0">

                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                        <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="size">
                            Size
                        </label>

                        <div className='relative'>

                            <select 
                                value={selectProductState.data?.size}
                                className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-100 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="size" 
                                name="size">
                                {
                                    PRODUCT_SIZES.map((value: string, index: number)=> <option key={index}>{value}</option> )
                                }
                            </select>
                            
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>

                        </div>
                        

                        <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="prize">
                            Price
                        </label>
                        <input 
                            required 
                            id="price" 
                            name="price"
                            value={selectProductState.data?.price.value.$numberDecimal}
                            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white" 
                            type="number" 
                            placeholder="" />
                        

                        <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="prize">
                            Stock
                        </label>

                        <input 
                            required 
                            id="stock" 
                            name="stock"
                            value={selectProductState.data?.stock}
                            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white" 
                            type="number" 
                            placeholder="" />

                    </div>

                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                        <label 
                            className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" 
                            htmlFor="color">
                            Color
                        </label>

                        

                        <div className='relative'>

                            <select 
                                className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-100 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="color" 
                                name="color">
                                {
                                    PRODUCT_COLOR.map((value: string, index: number)=> <option key={index}>{value}</option> )
                                }
                            </select>
                            
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
                                <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>

                        </div>

                        

                        <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="prize">
                            Available
                        </label>
                        <input 
                            required 
                            id="available" 
                            name="available"
                            value={selectProductState.data?.available}
                            className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border border-gray-400 rounded appearance-none focus:outline-none focus:bg-white" 
                            type="number" 
                            placeholder="" />
                        
                        

                    </div>

                </div>
            </div>
            
        </form>
    );
}
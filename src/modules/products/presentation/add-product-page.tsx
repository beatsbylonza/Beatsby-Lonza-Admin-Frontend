
// import {
//     Link
//   } from 'react-router-dom';
  
import { useState } from 'react';
  import SideBarNav from '../../shared/components/sidebar-nav';
  
  /* Login Page Module */
  export default function AddProductPage(){

    const [image, setImage] = useState<any>(null);
  

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            setImage(e.target.result);
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }
    
      return (
        <section className='flex h-screen space-x-2'>
  
        <SideBarNav></SideBarNav>
  
        <section className='container flex flex-col h-full px-4 py-4 mx-auto'>
  
            <section className='mb-4 space-y-2'>
            
                <div className='text-[2rem] font-bold'>
                    {`Products > Add Product`}
                </div>

            </section>

            <section className='w-full mb-4 space-y-5'>

                <form className="w-full max-w">
                    <div className="flex flex-wrap w-full px-2 py-5 max-w">
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="grid-product-name">
                                Product Name
                            </label>
                            <input className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="grid-product-name" type="text" placeholder="" />
                            <p className="text-xs italic text-red-500">Please fill out this field.</p>

                            <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="grid-category">
                                Category
                            </label>
                            <div className="relative">
                                <select className="block w-full px-4 py-3 pr-8 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500" id="grid-category">
                                    <option>T-Shirt</option>
                                    <option>Stickers</option>
                                    <option>Hoodie</option>
                                    <option>Mask</option>
                                    <option>Socks</option>
                                    <option>Cigar Box</option>
                                    <option>Cap</option>
                                    <option>Slides</option>
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
                                <div className="rounded-lg shadow-xl bg-gray-50 ">
                                    <div className="m-4">
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
                                                        <input onChange={onImageChange} type="file" className="opacity-0" />
                                                    </label>
                                                </div>
                                            </> :
                                             <div className='h-[300px] w-auto relative'>
                                                  <input onChange={onImageChange} type="file" className="absolute top-0 w-full h-full opacity-0"/>
                                                  <img className='top-0 object-contain h-[300px] w-[400px]' src={image} alt={image}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap w-full px-2 py-5 max-w">
                        <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                            <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="grid-product-name">
                                Description
                            </label>
                            <textarea rows={10} className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="grid-product-name" placeholder="" />
                            <p className="text-xs italic text-red-500">Please fill out this field.</p>
                        </div>
                        
                        <div className="flex flex-wrap w-full px-3 mb-6 md:w-1/2 md:mb-0">

                            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                                <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="grid-product-size">
                                    Size
                                </label>
                                <input className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="grid-product-size" type="text" placeholder="" />
                                <p className="text-xs italic text-red-500">Please fill out this field.</p>

                                <label className="block mt-5 mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="grid-product-prize">
                                    Prize
                                </label>
                                <input className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="grid-product-prize" type="number" placeholder="" />
                                <p className="text-xs italic text-red-500">Please fill out this field.</p>

                            </div>

                            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                                <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor="grid-product-color">
                                    Color
                                </label>
                                <input className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white" id="grid-product-color" type="text" placeholder="" />
                                <p className="text-xs italic text-red-500">Please fill out this field.</p>

                            </div>

                        </div>
                        <div className="flex items-center justify-center w-full gap-5 mt-5 align-center">
                            <button className="px-4 py-2 font-bold text-white bg-blue-400 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline" type="button">
                                Save
                            </button>
                            <button className="px-4 py-2 font-bold text-black bg-white border border-blue-100 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline" type="button">
                                Cancel
                            </button>
                        </div>

                    </div>
                  
                </form>
                
            </section>
  
          
          <section className='flex-1' >
            
          </section>
      
        </section>
  
  
      </section>
      );
  }
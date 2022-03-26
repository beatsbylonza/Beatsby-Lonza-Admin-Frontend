
import {
  Link
} from 'react-router-dom';

import SideBarNav from '../../shared/components/sidebar-nav';

/* Login Page Module */
export default function ProductPage(){

    return (
      <section className='h-screen space-x-2 flex'>

      <SideBarNav></SideBarNav>

      <section className='h-full flex flex-col container mx-auto px-4 py-4'>

        <section className='space-y-2 mb-4'>
          
          <div className='text-[2rem] font-bold'>
            Products
          </div>

          <div className='flex space-x-6'>
            
            <input className='border border-black rounded-full py-2 px-4' placeholder='🔎︎ Search' />

            <div className='flex items-center justify-center px-6 border border-black rounded-full cursor-pointer '>
              Delete
            </div>

            <Link className='flex items-center justify-center px-6 bg-[#6792cd] text-white rounded-full cursor-pointer' to={'add'}>
              Add Product
            </Link>
            
          </div>

        </section>

        
        <section className='flex-1' >
          
        </section>
    
      </section>


    </section>
    );
}
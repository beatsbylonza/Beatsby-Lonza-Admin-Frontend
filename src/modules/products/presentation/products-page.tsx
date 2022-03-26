import styles from './products-page.module.css';
import {
  Link
} from 'react-router-dom';

import { useEffect } from 'react';
import { getAllProducts, GetAllProductsState, selectGetAllProducts } from './get-all-products-slice';
import { DataGrid } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { AuthenticationState, selectAuthentication } from '../../authentication/presentation/authentication-slice';
import SideBarNav from '../../shared/components/sidebar-nav';

/* PRODUCT TABLE HEADERS */
const columns = [
  { 
    field: '_id', 
    headerName: 'ID',
    width: 150,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 400,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Price',
    editable: true,
  },
  {
    field: 'stock',
    headerName: 'Stock',
    type: 'number',
    editable: true,
  },
  {
    field: 'sales',
    headerName: 'Sales',
    type: 'number',
  },
  {
    field: 'sold',
    headerName: 'Sold',
    type: 'number',
  },
  {
    field: 'available',
    headerName: 'Available',
    type: 'number',
  }
];


/* Login Page Module */
export default function ProductsPage(){
  const dispatch = useAppDispatch();
  const authorizationState = useAppSelector(selectAuthentication);
  const getAllProductsState = useAppSelector(selectGetAllProducts);

  useEffect(()=>{
    if(authorizationState.status === AuthenticationState.success){
      if(authorizationState.token)
        dispatch(getAllProducts({token: authorizationState.token}));
    }
  },[authorizationState, dispatch]);


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
          <DataGrid
            rows={getAllProductsState.data.length === 0 ? [] : getAllProductsState.data }
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowId={(row) => row._id} 
            disableSelectionOnClick
          />
        </section>
    
      </section>


    </section>
  );
}
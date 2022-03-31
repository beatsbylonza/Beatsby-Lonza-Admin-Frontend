import {
  Link
} from 'react-router-dom';

import { useEffect } from 'react';
import { getAllProducts, selectGetAllProducts } from './slices/get-all-products-slice';
import { DataGrid } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { AuthenticationState, selectAuthentication } from '../../authentication/presentation/authentication-slice';
import SideBarNav from '../../shared/components/sidebar-nav';
import { AiFillEye } from "react-icons/ai";
import { removeProduct, RemoveProductState, selectRemoveProduct } from './slices/remove-product-slice';

/* PRODUCT TABLE HEADERS */
const columns = [
  { 
    field: 'image', 
    headerName: 'Image',
    flex : 1,
    cellClassName: '!flex !justify-center !items-center',
    renderCell: (params : any ) => {
      return (
        <img src={params.row.imageUrl} alt={params.row.imageUrl} className='w-[40px] h-[40px] rounded-lg'></img>
      );
    }
  },
  { 
    field: '_id', 
    headerName: 'ID',
    flex : 2
  },
  {
    field: 'name',
    headerName: 'Name',
    editable: true,
    flex : 4,
  },
  {
    field: 'price',
    headerName: 'Price',
    flex : 1,
    valueGetter: (params : any) => `$ ${params.row.price.value.$numberDecimal}`
  },
  {
    field: 'stock',
    headerName: 'Stock',
    flex : 1,
    type: 'number',
    editable: true,
  },
  {
    field: 'sales',
    headerName: 'Sales',
    flex : 1,
    type: 'number',
  },
  {
    field: 'sold',
    headerName: 'Sold',
    flex : 1,
    type: 'number',
  },
  {
    field: 'available',
    headerName: 'Available',
    flex : 1,
    type: 'number',
  },
  {
    field: 'view',
    headerName: 'View',
    flex : 1,
    cellClassName: '!flex !justify-center !items-center',
    renderCell: (params : any ) => {
      return (
          <AiFillEye className='text-xl text-[#6792cd]'/>
      );
    }
  },
];



/* Login Page Module */
export default function ProductsPage(){
  const dispatch = useAppDispatch();
  const authorizationState = useAppSelector(selectAuthentication);
  const getAllProductsState = useAppSelector(selectGetAllProducts);
  const removeProductState = useAppSelector(selectRemoveProduct);
  let idsToDelete : Array<string> = [];

  useEffect(()=>{
    if(authorizationState.status === AuthenticationState.success){
      if(authorizationState.token)
        dispatch(getAllProducts({token: authorizationState.token}));
    }
  },[authorizationState, dispatch]);

  useEffect(()=>{
    switch(removeProductState.status){
      case RemoveProductState.success: 
          if(authorizationState.status === AuthenticationState.success){
            if(authorizationState.token)
              dispatch(getAllProducts({token: authorizationState.token}));
          }
        break;
    }
  },[removeProductState, dispatch, authorizationState]);

  function deleteIds(){

    if(authorizationState.status === AuthenticationState.success){
      
      if(authorizationState.token){
        for(let i=0; i < idsToDelete.length; i++){
          dispatch(removeProduct({
            token: authorizationState.token,
            productsId: idsToDelete[i],
          }));
        }
      }
    }
  }

  return (
    <section className='flex h-screen space-x-2'>

      <SideBarNav></SideBarNav>

      <section className='container flex flex-col h-full px-4 py-4 mx-auto'>

        <section className='mb-4 space-y-2'>
          
          <div className='text-[2rem] font-bold'>
            Products
          </div>

          <div className='flex space-x-6'>
            
            <input className='px-4 py-2 border border-black rounded-full' placeholder='🔎︎ Search' />

            <button className='flex items-center justify-center px-6 border border-black rounded-full cursor-pointer' onClick={deleteIds}>
              Delete
            </button>

            <Link className='flex items-center justify-center px-6 bg-[#6792cd] text-white rounded-full cursor-pointer' to={'add'}>
              Add Product
            </Link>
            
          </div>

        </section>

        
        <section className='flex-1' >
          <DataGrid
            rows={getAllProductsState.data.length === 0 ? [] : getAllProductsState.data }
            columns={columns}
            pageSize={9}
            rowsPerPageOptions={[5]}
            checkboxSelection
            getRowId={(row) => row._id} 
            disableSelectionOnClick
            onSelectionModelChange={
              ( ids : any )=>{
                idsToDelete = ids;
              }
            }
          />
        </section>
    
      </section>


    </section>
  );
}
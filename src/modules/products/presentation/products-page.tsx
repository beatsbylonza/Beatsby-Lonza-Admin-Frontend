import {
  Link, useLocation, useNavigate
} from 'react-router-dom';

import { useEffect, useState, useMemo } from 'react';
import { getAllProducts, selectGetAllProducts } from './slices/get-all-products-slice';
import { DataGrid } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { AuthenticationState, selectAuthentication } from '../../authentication/presentation/authentication-slice';
import SideBarNav from '../../shared/components/sidebar-nav';
import { AiFillEye } from "react-icons/ai";
import { removeProduct, RemoveProductState, selectRemoveProduct } from './slices/remove-product-slice';
import { Dialog } from '@mui/material';
import ProductInfoForm from './product-info-form';
import { selectProduct, selectProductInitial, SelectProductState, selectSelectProduct } from './slices/select-product-slice';
import { selectUpdateProduct, updateProduct, UpdateProductState } from './slices/update-product-slice';
import { useDispatch } from 'react-redux';


/* PRODUCT TABLE HEADERS */
const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex : 4,
    renderCell: (params : any ) => {
      return (
        <div className='flex items-center justify-center space-x-4'>
          <img src={params.row.imageUrl} alt={params.row.imageUrl} className='w-[40px] h-[40px] rounded-lg'></img>
          <span>{params.row.name}</span>
        </div>

      );
    }
  },
  {
    field: 'category',
    headerName: 'Category',
    flex : 2,
  },
  {
    field: 'price',
    headerName: 'Price',
    flex : 1,
    renderCell: (params : any ) => {
      return (
        <span className='text-green-700 font-bold'>
          $ {params.row.price.value.$numberDecimal}.00
        </span>
      );
    }
  },
  {
    field: 'sales',
    headerName: 'Sales',
    flex : 1,
    renderCell: (params : any ) => {
      return (
        <span className='text-green-700 font-bold'>
          $ {params.row.sales}.00
        </span>
      );
    }
  },
  {
    field: 'stock',
    headerName: 'Stock',
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
        <Link className=' cursor-pointer' to={{
          search: `?product_id=${params.row._id}`,
        }}>
          <AiFillEye className='text-xl '/>
        </Link>
      );
    }
  },
];

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}


/* Login Page Module */
export default function ProductsPage(){
  const dispatch = useAppDispatch();
  const authorizationState = useAppSelector(selectAuthentication);
  const getAllProductsState = useAppSelector(selectGetAllProducts);
  const selectProductState = useAppSelector(selectSelectProduct);
  const removeProductState = useAppSelector(selectRemoveProduct);
  const updateProductState = useAppSelector(selectUpdateProduct);
  let idsToDelete : Array<string> = [];
  
  const [update, setUpdate] = useState(false);

  let query = useQuery();

  useEffect(()=>{
    switch(selectProductState.status){
      case SelectProductState.success:
        setUpdate(true);
        break;
      case SelectProductState.initial:
        setUpdate(false);
        break;
    }
  },[selectProductState]);

  useEffect(()=>{

    const productId = query.get('product_id');
    if(productId){
      switch(authorizationState.status){
        case AuthenticationState.success:

            if(authorizationState.token)
              dispatch(selectProduct({
                token: authorizationState.token,
                productId,
              }))

            break;
      }
    }else{
      dispatch(selectProductInitial());
    }
    
  },[query, authorizationState, dispatch]);

  
  const handleClose = () => {
    setUpdate(false);
  };

  useEffect(()=>{
    if(authorizationState.status === AuthenticationState.success){
      if(authorizationState.token)
        dispatch(getAllProducts({token: authorizationState.token}));
    }
  },[authorizationState,updateProductState , dispatch]);

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
    <section>

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

      <UpdateProductDialog open={update} onClose={handleClose}></UpdateProductDialog>
    </section>
  );
}

function UpdateProductDialog(props : any) {
  const { open } = props;
  
  let query = useQuery();
  
  const selectProductState = useAppSelector(selectSelectProduct);
  const authorizationState = useAppSelector(selectAuthentication);
  const updateProductState = useAppSelector(selectUpdateProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
      switch(updateProductState.status){
          case UpdateProductState.success:
              navigate('/products');
              break;
      }
  },[updateProductState, navigate]);
  
  /** Add Product On Submit Form */
  function onSubmit(event : any){
      event.preventDefault();
      
      const formData : FormData = new FormData(event.target);
      const productId = query.get('product_id');


      if(
        productId &&
        authorizationState.status === AuthenticationState.success){
          if(authorizationState.token)
            dispatch(updateProduct({
                token: authorizationState.token,
                formData,
                productId: productId,
              }));
      }
  }


  return (
    <Dialog open={open} fullWidth={true} maxWidth='xl'>

      <ProductInfoForm product={selectProductState.data} onSubmit={onSubmit}></ProductInfoForm>
      
      <div className="flex items-center justify-center w-full gap-5 mb-5 align-center">
          <button className="px-4 py-2 font-bold text-white bg-blue-400 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline" type="submit" form='product-info-form'>
              Update  
          </button>
          <Link className="px-4 py-2 font-bold text-black bg-white border border-blue-100 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline"
            to={'/products'}
            >
              Cancel
          </Link>
      </div>

     
    </Dialog>
  );
}
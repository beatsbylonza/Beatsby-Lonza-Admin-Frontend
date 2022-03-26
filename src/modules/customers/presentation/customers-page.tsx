import {
  Link
} from 'react-router-dom';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { AuthenticationState, selectAuthentication } from '../../authentication/presentation/authentication-slice';
import { getAllCustomers, selectGetAllCustomers } from './get-all-customers-slice';
import SideBarNav from '../../shared/components/sidebar-nav';
import { DataGrid } from '@mui/x-data-grid';
import UserModel from '../../authentication/core/domain/user.model';


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
    width: 250,
    valueGetter: (params: any) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 180,
  },
  {
    field: 'contactNumber',
    headerName: 'Contact Number',
    width: 150,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 300,
    valueGetter: (params: any) =>
      `${params.row.street || ''} ${params.row.city || ''} ${params.row.state || ''} ${params.row.zopcode || ''}`,
  }
];


export default function CustomersPage() {
  
  const dispatch = useAppDispatch();
  const authenticationState = useAppSelector(selectAuthentication);
  const getAllCustomersState = useAppSelector(selectGetAllCustomers);

  useEffect(()=>{
    if(authenticationState.status === AuthenticationState.success){
      if(authenticationState.token)
        dispatch(getAllCustomers({token: authenticationState.token}));
    }
  },[authenticationState,dispatch]);

  return (
    <section className='h-screen space-x-2 flex'>

      <SideBarNav></SideBarNav>

      <section className='h-full flex flex-col container mx-auto px-4 py-4'>

        <section className='space-y-2 mb-4'>
          
          <div className='text-[2rem] font-bold'>
            Customers
          </div>

          <div className='flex space-x-6'>
            
            <input className='border border-black rounded-full py-2 px-4' placeholder='🔎︎ Search' />

            <div className='flex items-center justify-center px-6 border border-black rounded-full cursor-pointer '>
              Delete
            </div>
            
          </div>

        </section>

        
        <section className='flex-1' >
          <DataGrid
            rows={getAllCustomersState.data.length === 0 ? [] : getAllCustomersState.data }
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


import { useAppDispatch, useAppSelector } from '../../config/hooks';
import { getAllOrders, selectGetAllOrders } from './get-all-orders-slice';
import { selectAuthentication } from '../../authentication/presentation/authentication-slice';
import { DataGrid } from '@mui/x-data-grid';
import SideBarNav from '../../shared/components/sidebar-nav';
import { useEffect } from 'react';

/* Orders TABLE HEADERS */
const columns = [
  { 
    field: '_id', 
    headerName: 'ID',
    width: 150,
  },
  {
    field: 'productId',
    headerName: 'Product ID',
    width: 200,
  },
  {
    field: 'customerId',
    headerName: 'Customer ID',
    width: 200,
  },
  {
    field: 'deliveryAddress',
    headerName: 'Delivery Address',
    width: 300,
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
    type: 'number',
    width: 90,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
  },
];


export default function OrdersPage() {

  const getAllOrdersState  = useAppSelector(selectGetAllOrders);
  const authenticationState  = useAppSelector(selectAuthentication);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(authenticationState.token){
      /** Get All Orders fetch */
      dispatch(getAllOrders({token: authenticationState.token}));
    }
  },[ authenticationState, dispatch ]);


    return (<section className='h-screen space-x-2 flex'>

    <SideBarNav></SideBarNav>

    <section className='h-full flex flex-col container mx-auto px-4 py-4'>

      <section className='space-y-2 mb-4'>
          
          <div className='text-[2rem] font-bold'>
            Orders
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
          rows={getAllOrdersState.data.length === 0 ? [] : getAllOrdersState.data }
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
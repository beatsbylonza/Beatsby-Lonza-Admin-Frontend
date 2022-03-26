// import styles from './shared.module.css';
import {
  NavLink
} from 'react-router-dom';

import logo from '../../../assets/image/logo.png';
import Logout from '../../shared/components/logout';


export default function SideBarNav(){
    return(
        <aside className='flex flex-col justify-center w-[250px] bg-[#6792cd] h-full py-4'>

          <div className='w-full mb-2'>
            <img alt="logo" src={logo} className='object-contain h-full'/>
          </div>
          
          <NavLink  
            to="/orders"
            className={({isActive}) =>
             (!isActive ? "" : "link-active")
            }>
            <div className='tab-container'>
                Orders
            </div>
          </NavLink>

          <NavLink 
           to="/products"
           className={({isActive}) =>
            (!isActive ? "" : "link-active")
           }>
            <div className='tab-container'>
                Products
            </div>
          </NavLink>

          <NavLink 
          to="/customers"
          className={({isActive}) =>
            (!isActive ? "" : "link-active")
          }>
            <div className='tab-container'>
                Customers
            </div>
          </NavLink>

          <div className='flex justify-end flex-1 items-end'>
            <Logout />
          </div>


        </aside>
    );
}
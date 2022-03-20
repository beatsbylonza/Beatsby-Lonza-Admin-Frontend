import styles from './orders-page.module.css';
import {
  Link
} from 'react-router-dom';
import { orders } from '../../shared/fixtures/data-fixture';

import logo from '../../../assets/image/logo.png';
import { useState, useEffect } from 'react';
import { OrderModel } from '../core/domain/order.model';

export default function OrdersPage() {

  const [currentOrders, setCurrentOrders] = useState<Array<OrderModel>>([]);
  const [sortedOrders, setSortedOrders] = useState<Array<OrderModel>>([]);
  const [sort, setSort] = useState('date');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(()=>{
    const tempOrders : any = orders.sort((a : any, b : any) =>
      a.date > b.date ? 1 : b.date > a.date ? -1 : 0
    )
    setSortedOrders(tempOrders);
    setCurrentOrders(tempOrders);
    setLoading(false);
  },[])

  const sortFunction = (type : string) => {
    setSort(type)
    currentOrders.sort((a : any, b : any) => a[type] > b[type] ? 1 : b[type] > a[type] ? -1 : 0)
  }

  const back = () =>{
    if(page > 1){
      setCurrentOrders(()=>{
        return sortedOrders.slice((page-2)* 7, (page-1) *7)
      })
      setPage(prev => prev-1);
      setSearchValue('');
    }
  }

  const forward = () =>{
    if(searchValue === ''){
      if(page < Math.ceil(orders.length / 7)){
        setCurrentOrders(()=>{
          return sortedOrders.slice((page)* 7, (page+1) *7)
        })
        setPage(prev => prev+1);
        setSearchValue('');
      }
    }else{
      if(page < Math.ceil(currentOrders.length / 7)){
        setCurrentOrders(()=>{
          return sortedOrders.slice((page)* 7, (page+1) *7)
        })
        setPage(prev => prev+1);
        setSearchValue('');
      }
    }
  }

  const search = (value : string) =>{
    setSearchValue(value);
    setPage(1)
    setCurrentOrders(() => {
      const tempOrders = sortedOrders.filter((order) => {

        if (order.date.toLowerCase().includes(value, 0) || order.productID.toLowerCase().includes(value, 0) || order.orderID.toLowerCase().includes(value, 0) || order.customerID.toLowerCase().includes(value, 0) || order.address.toLowerCase().includes(value, 0) || order.status.toLowerCase().includes(value, 0)) {
          return order;
        }else{
          return null
        }
      });
      return tempOrders;
    });
  }

  if(loading){
    return <div>Loading</div>
  }else{
    return (
      <div className={styles.container}>
        <div className={styles.leftNavigation}>
          <div className={styles.imageContainer}>
            <img alt="logo" src={logo} className={styles.image}/>
          </div>
          <Link to="/orders">
            <div className={`${styles.tabContainer} ${styles.active}`}>
                Orders
            </div>
          </Link>
          <Link to="/products">
            <div className={styles.tabContainer}>
                Products
            </div>
          </Link>
          <Link to="/customers">
            <div className={styles.tabContainer}>
                Customers
            </div>
          </Link>
          <Link to="/">
            <div className={styles.logoutContainer}>
                <div className={styles.logout}>
                    LOGOUT
                </div>
            </div>
          </Link>
        </div>
        <div className={styles.contentContainer}>
  
          <div className={styles.headingContainer}>
            <div className={styles.titleContainer}>
              Orders
            </div>
  
            <div className={styles.buttonContainer}>
  
              <input className={styles.search} placeholder='🔎︎ Search' value={searchValue} onChange={(event)=> search(event.target.value.toLocaleLowerCase())}/>
  
  
              <div className={styles.deleteContainer}>
                Delete
              </div>
            </div>
          </div>
  
          <div className={styles.gridContainerHeading}>
              <div className={styles.item}></div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('date')}}>Date  {sort === 'date' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('productID')}}>Product ID  {sort === 'productID' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('orderID')}}>Order ID  {sort === 'orderID' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('customerID')}}>Customer ID  {sort === 'customerID' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('quantity')}}>Quantity  {sort === 'quantity' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('address')}}>Address  {sort === 'address' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('status')}}>Status  {sort === 'status' ? <span>▼</span> : <span>►</span>}</div>
          </div>
        
          {
            currentOrders.map((order, index)=>{
              if(index < 7){
                return(
                  <div className={styles.gridContainer} key={index}>
                    <div className={styles.item}><input type="checkbox" id={order._id} name={order._id} value={order._id} /></div>
                    <div className={styles.item}>{order.date}</div>
                    <div className={styles.item}>{order.productID}</div>
                    <div className={styles.item}>{order.orderID}</div>
                    <div className={styles.item}>{order.customerID}</div>
                    <div className={styles.item}>{order.quantity}</div>
                    <div className={styles.item}>{order.address}</div>
                    <div className={styles.item}>{order.status}</div>
                  </div>
                )
              }else{
                return null
              }
            })
          }

          <div className={styles.arrowContainer}>
            <div className={styles.arrowLeft} onClick={back}>◄</div>
            {
              searchValue === '' ?
              <p>{page} of {Math.ceil(sortedOrders.length / 7)}</p>:
              <p>{page} of {Math.ceil(currentOrders.length / 7)}</p>
            }
            <div className={styles.arrowRight}  onClick={forward}>►</div>
          </div>
          
        </div>
      </div>
    );
  }
}
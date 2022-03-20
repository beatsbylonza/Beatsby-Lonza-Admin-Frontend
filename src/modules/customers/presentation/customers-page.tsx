import {
  Link
} from 'react-router-dom';
import logo from '../../../assets/image/logo.png';

import { customers } from '../../shared/fixtures/data-fixture';
import { useState, useEffect } from 'react';
import styles from './customers-page.module.css';
import { CustomerModel } from '../core/domain/customer.model';

export default function CustomersPage() {
  const [currentCustomers, setCurrentCustomers] = useState<Array<CustomerModel>>([]);
  const [sortedCustomers, setSortedCustomers] = useState<Array<CustomerModel>>([]);
  const [sort, setSort] = useState('date');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(()=>{
    const tempCustomers :  any = customers.sort((a : any , b: any) =>
      a.date > b.date ? 1 : b.date > a.date ? -1 : 0
    )
    setSortedCustomers(tempCustomers);
    setCurrentCustomers(tempCustomers);
    setLoading(false);
  },[])

  const sortFunction = (type : string ) => {
    setSort(type)
    if(type === 'name'){
      currentCustomers.sort((a : CustomerModel, b: CustomerModel) => `${a.firstName} ${a.middleName} ${a.lastName}` > `${b.firstName} ${b.middleName} ${b.lastName}` ? 1 : `${b.firstName} ${b.middleName} ${b.lastName}` > `${a.firstName} ${a.middleName} ${a.lastName}` ? -1 : 0)
    }else if(type === 'address'){
      currentCustomers.sort((a : CustomerModel, b: CustomerModel) => `${a.street} ${a.city} ${a.state} ${a.zipCode}` > `${b.street} ${b.city} ${b.state} ${b.zipCode}` ? 1 : `${b.street} ${b.city} ${b.state} ${b.zipCode}` > `${a.street} ${a.city} ${a.state} ${a.zipCode}` ? -1 : 0)
    }else{
      currentCustomers.sort((a: any, b: any) => a[type] > b[type] ? 1 : b[type] > a[type] ? -1 : 0)
    }
  }

  const back = () =>{
    if(page > 1){
      setCurrentCustomers(()=>{
        return sortedCustomers.slice((page-2)* 7, (page-1) *7)
      })
      setPage(prev => prev-1);
      setSearchValue('');
    }
  }

  const forward = () =>{
    if(searchValue === ''){
      if(page < Math.ceil(customers.length / 7)){
        setCurrentCustomers(()=>{
          return sortedCustomers.slice((page)* 7, (page+1) *7)
        })
        setPage(prev => prev+1);
        setSearchValue('');
      }
    }else{
      if(page < Math.ceil(currentCustomers.length / 7)){
        setCurrentCustomers(()=>{
          return sortedCustomers.slice((page)* 7, (page+1) *7)
        })
        setPage(prev => prev+1);
        setSearchValue('');
      }
    }
  }

  const search = (value : string) =>{
    setSearchValue(value);
    setPage(1)
    setCurrentCustomers(() => {
      const tempCustomers = sortedCustomers.filter((customer : CustomerModel) => {

        if (customer.firstName.toLowerCase().includes(value, 0) || customer.middleName.toLowerCase().includes(value, 0) || customer.lastName.toLowerCase().includes(value, 0) || customer._id.toLowerCase().includes(value, 0) || customer.street.toLowerCase().includes(value, 0) || customer.city.toLowerCase().includes(value, 0) || customer.state.toLowerCase().includes(value, 0) || customer.zipCode.toLowerCase().includes(value, 0) || customer.email.toLowerCase().includes(value, 0) || customer.contactNumber.toLowerCase().includes(value, 0)) {
          return customer;
        }else{
          return null
        }
      });
      return tempCustomers;
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
            <div className={styles.tabContainer}>
                Orders
            </div>
          </Link>
          <Link to="/products">
            <div className={styles.tabContainer}>
                Products
            </div>
          </Link>
          <Link to="/customers">
            <div className={`${styles.tabContainer} ${styles.active}`}>
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
              Customers
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
              <div className={styles.itemHeader} onClick={()=>{sortFunction('name')}}>Name  {sort === 'name' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('userID')}}>User ID  {sort === 'userID' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('address')}}>Address {sort === 'address' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('email')}}>Email {sort === 'email' ? <span>▼</span> : <span>►</span>}</div>
              <div className={styles.itemHeader} onClick={()=>{sortFunction('contactNumber')}}>Contact Number  {sort === 'contactNumber' ? <span>▼</span> : <span>►</span>}</div>
          </div>
        
          {
            currentCustomers.map((customer : CustomerModel, index)=>{
              if(index < 7){
                return(
                  <div className={styles.gridContainer} key={index}>
                    <div className={styles.item}><input type="checkbox" id={customer._id} name={customer._id} value={customer._id} /></div>
                    <div className={styles.item}>{`${customer.firstName} ${customer.middleName} ${customer.lastName}`}</div>
                    <div className={styles.item}>{customer._id}</div>
                    <div className={styles.item}>{`${customer.street} ${customer.city} ${customer.state} ${customer.zipCode}`}</div>
                    <div className={styles.item}>{customer.email}</div>
                    <div className={styles.item}>{customer.contactNumber}</div>
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
              <p>{page} of {Math.ceil(sortedCustomers.length / 7)}</p>:
              <p>{page} of {Math.ceil(currentCustomers.length / 7)}</p>
            }
            <div className={styles.arrowRight}  onClick={forward}>►</div>
          </div>
          
        </div>
      </div>
    );
  }
}

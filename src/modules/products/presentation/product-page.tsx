import styles from './product-page.module.css';
import {
  Link
} from 'react-router-dom';

import logo from '../../../assets/image/logo.png';

/* Login Page Module */
export default function ProductPage(){

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
            <div className={`${styles.tabContainer} ${styles.active}`}>
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
                {`Product > Add Product`}
              </div>
          </div>

          <div className={styles.mainContentContainer}>
            <div className={styles.mainContentLeft}>
              <div className={styles.nameContainer}>

              </div>
              <div className={styles.categoryContainer}>

              </div>
              <div className={styles.descriptionContainer}>

              </div>
            </div>

            <div className={styles.mainContentRight}>
              <div className={styles.productImageContainer}>

              </div>
              <div className={styles.priceContainer}>

              </div>
              <div className={styles.sizeAndColorContainer}>
                <div className={styles.sizeContainer}>

                </div>
                <div className={styles.colorContainer}>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
}
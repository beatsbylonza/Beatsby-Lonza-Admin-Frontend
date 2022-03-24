import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './modules/authentication/presentation/login-page';
import CustomersPage from './modules/customers/presentation/customers-page';
import OrdersPage from './modules/orders/presentation/orders-page';
import ProductsPage from './modules/products/presentation/products-page';
import PrivateRouteWrapper from './modules/shared/components/private-route';
import Product from './modules/products/presentation/product-page';

function App() {

  
  
  return (
     <Router>
          <div>
            <Routes>
              <Route element={<PrivateRouteWrapper index />}>
                <Route path='/' element={<LoginPage />}></Route>
              </Route>
              <Route element={<PrivateRouteWrapper />}>
                <Route path='orders/*' element={<OrdersPage />}></Route>
              </Route>
              <Route element={<PrivateRouteWrapper />}>
                <Route path='customers/*' element={<CustomersPage />}></Route>
              </Route>
              <Route element={<PrivateRouteWrapper />}>
                <Route path='products/' element={<ProductsPage />}></Route>
              </Route>
              <Route element={<PrivateRouteWrapper />}>
                <Route path='products/:id' element={<Product />}></Route>
              </Route>
            </Routes>
          </div>
      </Router>
  );
}

export default App;

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
<<<<<<< HEAD
import PrivateRouteWrapper from './modules/shared/components/private-route';
=======
import Product from './modules/products/presentation/product-page';
>>>>>>> 655324b9682ad68df6b6ce3cfc4211767b8a41f9

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
                <Route path='products/:id' element={<ProductsPage />}></Route>
              </Route>
            </Routes>
          </div>
      </Router>
  );
}

export default App;

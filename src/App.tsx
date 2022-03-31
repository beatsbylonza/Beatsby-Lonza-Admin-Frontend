
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
import AddProductPage from './modules/products/presentation/add-product-page';

function App() {

  
  
  return (
     <Router>
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
                <Route path='products/add' element={<AddProductPage />}></Route>
              </Route>
            </Routes>
      </Router>
  );
}

export default App;

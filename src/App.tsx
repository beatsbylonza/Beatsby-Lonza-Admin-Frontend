import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './modules/authentication/presentation/login-page';
import CustomersPage from './modules/customers/presentation/customers-page';
import OrdersPage from './modules/orders/presentation/orders-page';
import ProductsPage from './modules/products/presentation/products-page';
import Product from './modules/products/presentation/product-page';

function App() {
  return (
     <Router>
          <div>
            <Routes>
              <Route path='/' element={<LoginPage />}></Route>
              <Route path='orders/*' element={<OrdersPage />}></Route>
              <Route path='customers/*' element={<CustomersPage />}></Route>
              <Route path='products/' element={<ProductsPage />}></Route>
              <Route path='products/:id' element={<Product />}></Route>
            </Routes>
          </div>
      </Router>
  );
}

export default App;

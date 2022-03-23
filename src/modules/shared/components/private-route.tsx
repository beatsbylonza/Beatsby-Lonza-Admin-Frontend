
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRouteWrapper () {
  return true ? <Outlet /> : <Navigate to="/" />;
};
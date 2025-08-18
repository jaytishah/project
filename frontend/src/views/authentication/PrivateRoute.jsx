import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) {
    console.log('user info not found');
    
  }

  return userInfo ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
export default PrivateRoute;

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getAuthToken } from './auth/jwt';

export const RequireAuthLayout = () => {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

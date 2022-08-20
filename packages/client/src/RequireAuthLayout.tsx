import { Navigate, Outlet, useLocation } from 'react-router-dom';

const getAuthToken = () => localStorage.getItem('ACCESS_TOKEN');

export const RequireAuthLayout = () => {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

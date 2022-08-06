import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BasicInfoModal from './components/register-modals/BasicInfoModal';
import Home from './pages/Home';
import UserPage from './components/user/UserPage';
import { RequireAuthLayout } from './RequireAuthLayout';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<BasicInfoModal />} />
        <Route element={<RequireAuthLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

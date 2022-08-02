import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import BasicInfoModal from './components/register-modals/BasicInfoModal';
import Home from './pages/Home';
import UserPage from './components/user/UserPage';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<BasicInfoModal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

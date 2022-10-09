import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import { RequireAuthLayout } from './RequireAuthLayout';
import Timeline from './pages/Timeline';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<Timeline />} />
        <Route element={<RequireAuthLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage';
import BasicInfoModal from './components/register-modals/BasicInfoModal';
import Home from './pages/Home';
import UserPage from './components/user/UserPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<BasicInfoModal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

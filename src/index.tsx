import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import LoginPage from './pages/LoginPage';
import BasicInfoModal from './components/register-modals/BasicInfoModal';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<BasicInfoModal />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

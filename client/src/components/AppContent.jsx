// AppContent.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer.jsx';
import { Register } from '../pages/Auth/Register';
import { Login } from '../pages/Auth/Login';
import Home from '../pages/Home';
import { SpotFormPage } from '../pages/SpotFormPage';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-spot" element={<SpotFormPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppContent;

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Register } from '../pages/Auth/Register';
import { Login } from '../pages/Auth/Login';
import Home from '../pages/Home';

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default AppContent;
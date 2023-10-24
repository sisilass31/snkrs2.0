import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';



function App() {
  const token = localStorage.getItem('token');
  console.log('Token:', token);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/" /> : <Register />}
      />
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;

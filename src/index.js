import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./pages/Login"
import { useAuth } from "./authProvider"
import Users from "./pages/User/Users"
import { AuthProvider } from "./authProvider"
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/*" element={!user ?? <Navigate to="/login" /> ? <Login /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/users" />} />
        <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider >
      <App />
    </AuthProvider>
  </React.StrictMode>
);

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

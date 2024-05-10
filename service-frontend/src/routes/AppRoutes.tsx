import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Tour from "../pages/Tour/Tours";
import Tournament from "../pages/Tournament/Tournament";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours" element={<Tour />} />
      <Route path="/tournaments" element={<Tournament />} />
    </Routes>
  );
};

export default AppRoutes;

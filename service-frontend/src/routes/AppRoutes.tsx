import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Tour from "../pages/Tour/Tours";
import Tournament from "../pages/Tournament/Tournament";
import { RootState } from "../reduxSlices/store";
import { useSelector } from "react-redux";
import useSetUser from "../hooks/useSetUser";

const AppRoutes: React.FC = () => {
  useSetUser();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Routes>
      {user.Id != "" ? (
        <Route path="/" element={<Tour />} />
      ) : (
        <Route path="/" element={<Login />} />
      )}

      <Route path="/register" element={<Register />} />
      <Route path="/tournaments" element={<Tournament />} />
    </Routes>
  );
};

export default AppRoutes;

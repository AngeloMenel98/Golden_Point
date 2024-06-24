import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Tour from "../pages/admin/Tour/Tours";
import ToursUser from "../pages/user/Tour/Tours";
import Tournament from "../pages/admin/Tournament/Tournament";
import { RootState } from "../reduxSlices/store";
import { useSelector } from "react-redux";
import useSetUser from "../hooks/useSetUser";
import TournamentUser from "../pages/user/Tournament/Tournament";
import Matches from "../pages/admin/Matches/Matches";

const AppRoutes: React.FC = () => {
  useSetUser();
  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user && user.Role == "admin";

  return (
    <Routes>
      {isAdmin && <Route path="/" element={<Tour />} />}
      <Route path="/" element={user ? <ToursUser /> : <Login />} />

      <Route path="/register" element={<Register />} />
      <Route
        path="/tournaments"
        element={isAdmin ? <Tournament /> : <TournamentUser />}
      />
      <Route path="/matches" element={isAdmin ? <Matches /> : <></>} />
    </Routes>
  );
};

export default AppRoutes;

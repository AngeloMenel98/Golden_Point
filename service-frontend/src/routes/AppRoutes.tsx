import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Tour from "../pages/admin/Tour/Tours";
import ToursUser from "../pages/user/Tour/Tours";
import Tournament from "../pages/admin/Tournament/Tournament";
import { RootState } from "../reduxSlices/store";
import { useSelector } from "react-redux";
import Matches from "../pages/admin/Matches/Matches";
import MatchesUser from "../pages/user/Matches/Matches";
import TournamentUser from "../pages/user/Tournament/Tournament";
import Rankings from "../pages/admin/Ranking/Ranking";

import { jwtDecode } from "jwt-decode";
import useSetUser from "../hooks/useSetUser";

interface DecodedToken {
  id: string;
  username: string;
  email: string;
  isSingle: boolean;
  role: string; // Cambia esto según la estructura de tu token
}

const AppRoutes: React.FC = () => {
  const location = useLocation();

  useSetUser();

  const user = useSelector((state: RootState) => state.user.user);
  /*const [usertt, setUsertt] = useState<DecodedToken | null>(null);


  useEffect(() => {
    // Obtener token del estado (navegación) o de localStorage
    const tokenFromNavigate = location.state?.token;
    const tokenFromStorage = localStorage.getItem("token");

    const token = tokenFromNavigate || tokenFromStorage;
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUsertt(decodedToken);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, [location.state]);*/

  const isAdmin = user && user.Role == "admin";
  //(usertt && usertt?.role == "admin") ||

  return (
    <div>
      <Routes>
        {isAdmin && <Route path="/" element={<Tour />} />}
        <Route path="/" element={user ? <ToursUser /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/tournaments"
          element={isAdmin ? <Tournament /> : <TournamentUser />}
        />
        <Route
          path="/matches"
          element={isAdmin ? <Matches /> : <MatchesUser />}
        />
        <Route path="/ranking" element={<Rankings />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;

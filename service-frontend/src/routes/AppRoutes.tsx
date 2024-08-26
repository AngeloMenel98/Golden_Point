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
import Matches from "../pages/admin/Matches/Matches";
import MatchesUser from "../pages/user/Matches/Matches";
import TournamentUser from "../pages/user/Tournament/Tournament";
import Rankings from "../pages/admin/Ranking/Ranking";

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
      <Route
        path="/matches"
        element={isAdmin ? <Matches /> : <MatchesUser />}
      />
      <Route path="/ranking" element={<Rankings />} />
    </Routes>
  );
};

export default AppRoutes;

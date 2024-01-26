import React from "react";
import Navbar from "../components/NavBar/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1>Bienvenido a My React App</h1>
      {/* Contenido adicional de la página principal */}
    </div>
  );
};

export default Home;

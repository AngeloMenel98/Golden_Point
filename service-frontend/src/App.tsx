import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { usersApi, clubsApi, toursApi } from "./apiServices/index";

interface Club {
  id: string;
  clubName: string;
  availableFrom: string;
  availableTo: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  isSingle: boolean;
  isDeleted: boolean;
}

function App() {
  const [userData, setUserData] = useState<User>();
  const [tourCode, setTourCode] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await usersApi.getUserByUsername("pablito");
        setUserData(data);
      } catch (error) {
        console.error("Error al obtener datos de los clubes", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateTour = async () => {
    const tourData = {
      userId: "1e2179a0-abbb-40f0-897b-9aa4745d44fc",
      title: "Carlos Paz Tour",
    };

    try {
      await toursApi.createTour(tourData);
      console.log("Tour creado con exito");
    } catch (error) {
      console.error("Error al crear tour", error);
    }
  };
  const handleCodeSubmit = async () => {
    const tourUser = {
      userId: "fd737ff4-c111-4d57-bd30-9198e42d0796",
      tourCode: tourCode,
    };
    try {
      await toursApi.addUserToTour(tourUser);
      console.log("Usuario agregado con exito");
    } catch (e) {
      console.error("Error al agregar usuario", e);
    }
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTourCode(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <p key={userData?.id}>
            User ID: {userData?.id}, Username: {userData?.username}
          </p>
        </div>
        <button onClick={handleCreateTour}>Crear Tour</button>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Ingresa un código"
            value={tourCode}
            onChange={handleCodeChange}
          />
          <button onClick={handleCodeSubmit}>Enviar</button>
        </div>
      </header>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import apiService from "./helpers/apiService";

interface Club {
  id: string;
  clubName: string;
  availableFrom: string;
  availableTo: string;
}

function App() {
  const [clubData, setClubData] = useState<Club[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getClubs();
        setClubData(data);
      } catch (error) {
        console.error("Error al obtener datos de los clubes", error);
      }
    };

    fetchData();
  }, []);

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
          {clubData.map((club) => (
            <p key={club.id}>
              Club ID: {club.id}, Name: {club.clubName}
            </p>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;

const BASE_URL = "http://localhost:8080/api/club";

const clubsApi = {
  getClubs: async () => {
    try {
      const response = await fetch(`${BASE_URL}/clubs`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor");
      }

      const data = await response.json();
      return data;
    } catch (e) {
      console.error("Error en la solicitud:", e);
    }
  },
};

export default clubsApi;

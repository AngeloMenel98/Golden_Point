const BASE_URL = "http://localhost:8080";

const apiService = {
  getClubs: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/club/clubs`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud al servidor");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error en la solicitud: chau`);
    }
  },
};

export default apiService;

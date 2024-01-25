const BASE_URL = "http://localhost:8080/api/tour";

interface TourData {
  userId: string;
  title: string;
}

interface TourUser {
  userId: string;
  tourCode: string;
}

const toursApi = {
  createTour: async (tourData: TourData) => {
    try {
      const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourData),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();
      console.log("Tour created succesfully:", data);
    } catch (e) {
      console.error("Petition Error:", e);
    }
  },
  addUserToTour: async (tourUser: TourUser) => {
    try {
      const response = await fetch(`${BASE_URL}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tourUser),
      });

      if (!response.ok) {
        throw new Error("Server Error in Petition");
      }

      const data = await response.json();
      console.log("User added to Tour succesfully:", data);
    } catch (e) {
      console.error("Petition Error:", e);
    }
  },
  getTours: async () => {
    try {
      const response = await fetch(`${BASE_URL}/tours`, {
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
export default toursApi;

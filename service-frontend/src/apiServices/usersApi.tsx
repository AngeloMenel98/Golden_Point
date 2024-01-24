const BASE_URL = "http://localhost:8080/api";

interface UserData {
  username: string;
  email: string;
  password: string;
  isSingle: boolean;
  userRole: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  location: string;
  coins: number;
}

const usersApi = {
  createUser: async (userData: UserData) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();
      console.log("Usuario creado con éxito:", data);
    } catch (e) {
      console.error("Error en la solicitud:", e);
    }
  },
  getUserByUsername: async (userName: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${userName}`, {
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
export default usersApi;

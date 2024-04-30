import React, { ReactNode, createContext, useEffect, useReducer } from "react";

interface User {
  // Define la estructura de un usuario
  // Puedes ajustar esto según la estructura real de tu usuario
  id: string;
  username: string;
  // Otros campos si es necesario
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthAction {
  type: string;
  payload?: User | string;
}

const INITIAL_STATE: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null") as User | null,
  loading: false,
  error: null,
};

export const AuthContext = createContext<AuthState>(INITIAL_STATE);

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload as User,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload as string,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

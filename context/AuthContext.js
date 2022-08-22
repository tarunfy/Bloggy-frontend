import { Center, Spinner } from "@chakra-ui/react";
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext(null);

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
      };

    case "UPDATE":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    default:
      return { ...state };
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    loading: true,
    user: null,
  });
  useEffect(() => {
    //get current user:
    async function getCurrentUser() {
      const res = await fetch("/api/user/currentUser");

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "LOGIN", payload: data.user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    }
    getCurrentUser();
  }, []);

  if (state.loading)
    return (
      <Center h="100vh" w="100vw">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

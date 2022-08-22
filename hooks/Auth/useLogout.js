import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    await fetch("/api/user/logout");

    dispatch({ type: "LOGOUT" });
  };

  return logout;
};

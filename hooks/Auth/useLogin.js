import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (username, password) => {
    let error;
    setIsLoading(true);

    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      error = data.error;
      setIsLoading(false);
      return error;
    }

    if (res.ok) {
      //dispatch an action:
      dispatch({ type: "LOGIN", payload: data.user });
      setIsLoading(false);
    }
  };
  return { login, isLoading };
};

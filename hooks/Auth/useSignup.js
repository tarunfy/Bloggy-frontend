import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password, username, fullname) => {
    let error;
    setIsLoading(true);

    const res = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        username,
        fullname,
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

  return { isLoading, signup };
};

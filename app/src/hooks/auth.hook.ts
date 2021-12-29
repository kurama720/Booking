import { useState, useCallback, useEffect } from "react";
import { LocalKey, LocalStorage } from "ts-localstorage";

const storageName = "userData" as LocalKey<any>;

export const useAuth = () => {
  const [token, setToken] = useState<null | string>(null);
  const [requestStatus, setRequestStatus] = useState<null | number>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const login = useCallback((jwtToken, status) => {
    setToken(jwtToken);
    setRequestStatus(status);
    setErrorMessage("");

    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
        status: requestStatus,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setRequestStatus(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = LocalStorage.getItem(storageName);

    if (data && data.token) {
      login(data.token, data.status);
    }
  }, [login]);

  return {
    login,
    logout,
    token,
    requestStatus,
    setErrorMessage,
    errorMessage,
  };
};

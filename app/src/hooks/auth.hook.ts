import { useCallback, useEffect, useState } from "react";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { JWT } from "./auth.hook.interface";

const storageName = "userData" as LocalKey<JWT>;

export const useAuth = () => {
  const [token, setToken] = useState<object | null>(null);
  const [requestStatus, setRequestStatus] = useState<null | number>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [check, isCheck] = useState<boolean>(false);

  const login = useCallback((jwtToken, status, checked) => {
    setToken(jwtToken);
    setRequestStatus(status);
    setErrorMessage("");
    isCheck(checked);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: jwtToken,
        status,
        checked,
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

    if (data && data.token && data.checked) {
      login(data.token, data.status, data.checked);
    }
  }, [login]);

  return {
    login,
    logout,
    token,
    requestStatus,
    setErrorMessage,
    errorMessage,
    check,
  };
};

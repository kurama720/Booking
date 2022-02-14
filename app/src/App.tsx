import React, { useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LocalKey, LocalStorage } from "ts-localstorage";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./hooks/routes.hook";
import { AuthContext } from "./context/Context";
import { JWT } from "./hooks/auth.hook.interface";

function App() {
  const {
    login,
    logout,
    token,
    requestStatus,
    setErrorMessage,
    errorMessage,
    check,
  } = useAuth();
  const storageName = "userData" as LocalKey<JWT>;
  const data = LocalStorage.getItem(storageName);
  const isAuth = !!data;
  const routes = useRoutes(isAuth);
  const ctx = useMemo(
    () => ({
      login,
      logout,
      token,
      requestStatus,
      setErrorMessage,
      errorMessage,
      check,
    }),
    [login, logout, token, requestStatus, setErrorMessage, errorMessage, check]
  );

  return (
    <AuthContext.Provider value={ctx}>
      <div className="App flex flex-col min-h-screen h-full bg-gray-50">
        <Router>{routes}</Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

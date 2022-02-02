import React, { useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./hooks/routes.hook";
import { AuthContext } from "./context/Context";
import Footer from "./components/Footer/Footer";

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
  const isAuth = !!token;
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
      <div className="App flex flex-col min-h-screen h-full">
        <Router>{routes}</Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

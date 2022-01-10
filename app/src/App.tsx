import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "../../app/src/hooks/auth.hook";
import {useRoutes} from "../src/hooks/routes.hook";
import {AuthContext} from './context/Context'

function App() {
  const {
    login,
    logout,
    token,
    requestStatus,
    setErrorMessage,
    errorMessage,
    check} = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
      <AuthContext.Provider value={{
        login,
        logout,
        token,
        requestStatus,
        setErrorMessage,
        errorMessage,
        check
      }}>
        <div className="App">
          <Router>{routes}</Router>
        </div>
      </AuthContext.Provider>
  );
}

export default App;

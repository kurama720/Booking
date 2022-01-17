import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "../../app/src/hooks/auth.hook";
import {useRoutes} from "../src/hooks/routes.hook";
import {AuthContext} from './context/Context'
import Footer from "./components/Footer/Footer";

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
        <div className="App flex flex-col min-h-screen h-full">
          <Router>{routes}</Router>
          <Footer/>
        </div>
      </AuthContext.Provider>
  );
}

export default App;

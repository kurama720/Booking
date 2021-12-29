import React, { useEffect, useState } from "react";
import UserLogInPage from "./pages/UserLogInPage/UserLoginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../app/src/hooks/auth.hook";
import { useRoutes } from "../src/hooks/routes.hook";
import { Paths } from "../src/paths/path";

function App() {
  const { token } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
    <div className="App">
      <Router>{routes}</Router>
    </div>
  );
}

export default App;

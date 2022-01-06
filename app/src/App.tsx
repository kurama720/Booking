import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "../../app/src/hooks/auth.hook";
import {useRoutes} from "../src/hooks/routes.hook";

function App() {
  const {token} = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);

  return (
      <div className="App">
        <Router>{routes}</Router>
      </div>
  );
}

export default App;

import React from "react";
import UserLogInPage from "./pages/UserLogInPage/UserLoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Paths } from "./paths/path";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={Paths.LOG_IN} element={<UserLogInPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

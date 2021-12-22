import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Paths} from "./paths/paths";
import SignUpPage from "./pages/SignUpPage";


function App() {
  return (
    <div className="App">
     <Routes>
         <Route path={Paths.SIGN_UP} element={<SignUpPage />}/>
     </Routes>
    </div>
  );
}

export default App;

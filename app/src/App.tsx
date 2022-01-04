import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import {Paths} from "./paths/paths";
import SignUpPage from "./pages/SignUpPage";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path={Paths.SIGN_UP} element={<SignUpPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

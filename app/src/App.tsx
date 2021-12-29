import React from 'react';
import './App.css';
import Footer from "./components/Footer/Footer";
import {BrowserRouter as Router, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>

            </Routes>
        </Router>
      <Footer />
    </div>
  );
}

export default App;

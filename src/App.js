import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/Home';

const baseUrl = "http://raspberrypi.local:30578";

function App() {


  return (
    <div className="App">
      <Router>

        <Routes>
          <Route exact path="/" element={<HomePage />}/>

          <Route path="*" element={<h4>Page not found</h4>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RubiksSolver from './components/RubiksSolver';
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RubiksSolver />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
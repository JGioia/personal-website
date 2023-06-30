import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import BallApp from './balls/BallApp';
import QRApp from './qr/QRApp';
import AutoSelectApp from "./autoselect/AutoSelectApp";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/qr" element={<QRApp/>} />
        <Route path="/autoselect" element={<AutoSelectApp/>} />
        <Route path="*" element={<BallApp/>} />
      </Routes>
    </Router>
  );
}
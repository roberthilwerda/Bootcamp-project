import "./App.css";
import Homepage from "./pages/Homepage";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import GenrePage from "./pages/GenrePage";
import LandingPage from "./pages/LandingPage";
import useHttp from "./hooks/use-http";

function App() {

  return (
    <div className={`main`}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/genre-detail/:genre" element={<GenrePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

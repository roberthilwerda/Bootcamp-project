import "./App.css";
import Homepage from "./pages/Homepage";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import GenrePage from "./pages/GenrePage";
import LandingPage from "./pages/LandingPage";
import useHttp from "./hooks/use-http";

function App() {
  const state = useSelector((state) => state);
  const isLoggedIn = !!state.auth.loginData.accessToken;

  console.log(isLoggedIn);

  return (
    <div className={`main`}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<LandingPage />} />
            {isLoggedIn && <Route path="/home" element={<Homepage />} />}
            {isLoggedIn && <Route path="/genre-detail/:genre" element={<GenrePage />} />}
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

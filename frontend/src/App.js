import "./App.css";
import Homepage from "./pages/Homepage";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { validateUser } from "./lib/api";
import GenrePage from "./pages/GenrePage";
import LandingPage from "./pages/LandingPage";
import useHttp from "./hooks/use-http";
import { authActions } from "./store/auth-slice";

function App() {
  const { sendRequest, status, data, error } = useHttp(validateUser);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  const userID = localStorage.getItem("userID");
  const isLoggedIn = !!state.auth.loginData.userID;

  useEffect(() => {
    if (state.auth.loginData.name === null && userID && accessToken) {
      sendRequest({ userID: userID, accessToken: accessToken });
    }
  }, [sendRequest, state.auth.loginData, accessToken, userID]);

  useEffect(() => {
    console.log(status)
    if(status === 'completed' && data){

        console.log("boom")
        dispatch(authActions.setCredentials(
          {
            email: data.email,
            name: data.name,
            picture: data.picture_url,
            accessToken: accessToken,
            userID: data.user_id,
          }
        ))
      }
    
  }, [status, data, accessToken, dispatch])

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

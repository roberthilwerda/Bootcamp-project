import "./App.css";
import Homepage from "./pages/Homepage";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import GenrePage from "./pages/GenrePage";
import { fetchData } from "./store/genre-actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch])

  return (
    <div className={`main`}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} exact />

            <Route path="/login" element={<Login />} exact />

            <Route path="/genre-detail/:genre" element={<GenrePage />} exact />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

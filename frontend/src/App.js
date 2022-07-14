import "./App.css";
import Homepage from "./pages/Homepage";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
            <Route path="/" element={<Homepage />}  />


            <Route path="/genre-detail/:genre" element={<GenrePage />}  />
          </Routes>
        </Layout>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

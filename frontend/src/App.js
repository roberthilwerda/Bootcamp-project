import "./App.css";
import Header from "./components/Header";
import WidgetsPage from "./components/WidgetsPage";
import React, { useState } from "react";

function App() {
  const [showHomePage, setShowHomePage] = useState(true);

  return (
    <div className={`main`}>
      <Header
        setShowHomePage={() => setShowHomePage(true)}
        unsetShowHomePage={() => setShowHomePage(false)}
        showHomePage={showHomePage}
      />
      <WidgetsPage
        setShowHomePage={() => setShowHomePage(true)}
        unsetShowHomePage={() => setShowHomePage(false)}
        showHomePage={showHomePage}
      />
    </div>
  );
}

export default App;

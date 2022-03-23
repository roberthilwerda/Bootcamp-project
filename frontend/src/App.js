import "./App.css";
import Header from './components/Header';
import WidgetsPage from "./components/WidgetsPage";



function App() {
  return (
    <div className={`main`}>
      <Header></Header>
      <WidgetsPage></WidgetsPage>
    </div>
  );
}

export default App;

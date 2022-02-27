import "./App.css";
import Header from './components/Header';
import Widgets from "./components/Widgets";


function App() {
  return (
    <div className={`main`}>
      <Header></Header>
      <Widgets></Widgets>
    </div>
  );
}

export default App;

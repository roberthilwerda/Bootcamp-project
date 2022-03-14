import "./WidgetsPage.css";
import StatsByGenre from "../widgets/StatsByGenre";
import StatsByParam from "../widgets/StatsByParam";
import { useState } from "react";

const WidgetsPage = () => {
  let trendingGenres = ["Jazz", "Rock", "Blues", "Classical", "EDM", "Reggae",];
  let [pageContent, setPageContent] = useState();

  let [apiData, setApiData] = useState("Click to fetch");

  async function fetchGenresHandler() {
    const response = await fetch("http://localhost:8000/get_all_genres");
    const data = await response.json();

    console.log(data);
    setApiData(data[0].name);
  }

  const clickHandler = () => {
    console.log("testtest")
  }

  return (
    <div className="widgetspage__wrapper">
      <div className="widgetspage__col">
        <div style={{ fontSize: 30 }} className="widgetspage__title">
          Most trending genres
        </div>
        <StatsByGenre genre={"jazz"} filter={`some genre`} onClick={clickHandler}/>
        <StatsByGenre genre={"pop"} filter={`some genre`} />
        <StatsByGenre genre={"jazz"} filter={`some genre`} />
        <StatsByGenre genre={"jazz"} filter={`some genre`} />
        <StatsByGenre genre={"pop"} filter={`some genre`} />
        <StatsByGenre genre={"jazz"} filter={`some genre`} />
      </div>

      <div className="chart__col">Chart here</div>
      
      <button onClick={fetchGenresHandler}> Click here</button>
      <div>{apiData}</div>
    </div>
  );
};

export default WidgetsPage;

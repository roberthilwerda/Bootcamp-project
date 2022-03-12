import "./WidgetsPage.css";
import StatsByGenre from "../widgets/StatsByGenre";
import StatsByParam from "../widgets/StatsByParam";
import { useState } from "react";

const WidgetsPage = () => {
  let [apiData, setApiData] = useState("Click to fetch");

  async function fetchGenresHandler() {
    const response = await fetch("http://localhost:8000/get_all_genres");
    const data = await response.json();

    console.log(data)
    // setApiData(data[0]);
  }

  return (
    <div className="widgetspage__wrapper">
      <div className="widgetspage__col">
        <div style={{ fontSize: 30 }} className="widgetspage__title">
          Statistics by genre
        </div>
        <StatsByGenre genre={"jazz"} filter={`some genre`} />
        <StatsByGenre genre={"pop"} filter={`some genre`} />
        <StatsByGenre genre={"jazz"} filter={`some genre`} />
      </div>
      <div className="widgetspage__col">
        <div style={{ fontSize: 30 }} className="widgetspage__title">
          Statistics by variable
        </div>
        <StatsByParam param={"views"} filter={`some parameters`} />
        <StatsByParam param={"chart"} filter={`some parameters`} />
        <StatsByParam param={"chart"} filter={`some parameters`} />
      </div>
      <button onClick={fetchGenresHandler}> Click here</button>
      <div>{apiData}</div>
    </div>
  );
};

export default WidgetsPage;

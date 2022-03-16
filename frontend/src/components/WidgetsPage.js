import "./WidgetsPage.css";
import StatsByGenre from "../widgets/StatsByGenre";
import GenrePage from "./GenrePage";
import { useState } from "react";

const WidgetsPage = () => {
  let trendingGenres = ["Jazz", "Rock", "Blues", "Classical", "EDM", "Reggae"];

  let [apiData, setApiData] = useState("Click to fetch");

  async function fetchGenresHandler() {
    const response = await fetch("http://localhost:8000/");
    const data = await response.json();

    console.log(data);
    setApiData(data[0].name);
  }

  const onClickHandler = (genre) => {
    setPageContent(
      <div className="genre_page__wrapper">

        <div className="genre_page__back" onClick={goBackClickHandler}>
          <div>ᐸ</div>
        </div>

        <div className="genre_page__title">
          <div>{genre}</div>
        </div>

        <div className="genre_page__body">
          <GenrePage genre={genre}></GenrePage>
        </div>

      </div>
    );
  };

  const goBackClickHandler = () => {
    setPageContent(initialPageContent);
  };

  const initialPageContent = (
    <div className="widgetspage__wrapper">
      <div className="widgetspage__col">
        <div style={{ fontSize: 30 }} className="widgetspage__title">
          Most trending genres
        </div>
        <StatsByGenre
          genre={"jazz"}
          filter={`some genre`}
          onClickHandler={onClickHandler}
        />
        <StatsByGenre
          genre={"pop"}
          filter={`some genre`}
          onClickHandler={onClickHandler}
        />
        <StatsByGenre
          genre={"jazz"}
          filter={`some genre`}
          onClickHandler={onClickHandler}
        />
        <StatsByGenre
          genre={"jazz"}
          filter={`some genre`}
          onClickHandler={onClickHandler}
        />
        <StatsByGenre
          genre={"pop"}
          filter={`some genre`}
          onClickHandler={onClickHandler}
        />
        <StatsByGenre
          genre={"jazz"}
          filter={`some genre`}
          onClickHandler={onClickHandler}
        />
      </div>

      <div className="chart__col">Chart here</div>

      <button onClick={fetchGenresHandler}>Click here</button>
      <div>{apiData}</div>
    </div>
  );

  let [pageContent, setPageContent] = useState(initialPageContent);

  return pageContent;
};

export default WidgetsPage;

import "./WidgetsPage.css";
import StatsByGenre from "../widgets/StatsByGenre";
import ChartGenre from "../widgets/ChartGenre";
import GenrePage from "./GenrePage";
import { useState } from "react";
import ArtistSlider from "../widgets/ArtistSlider";

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
        <div className="genre_page__title-area">
          <div className="genre_page__back">
            <div className="genre_page__back-icon" onClick={goBackClickHandler}>
              🡨
            </div>
          </div>

          <div className="genre_page__title">
            <h1>{genre} STATS</h1>
          </div>
        </div>

        <div className="genre_page__body">
          <GenrePage genre={genre}></GenrePage>
        </div>

        <ArtistSlider />
      </div>
    );
  };

  const goBackClickHandler = () => {
    setPageContent(initialPageContent);
  };

  const initialPageContent = (
    <div className="widgetspage__wrapper">
      <div className="widgetspage__col">
        <div style={{ fontSize: 20 }} className="widgetspage__title">
          <p>Most popular genres</p>
        </div>

        <div className="widgetspage__body">
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
      </div>

      <div className="chart__col">
        <div style={{ fontSize: 20 }} className="widgetspage__title">
          <p>Trends per genre</p>
        </div>

        <div className="widgetspage__body">

          <div className="chart__item">
            <ChartGenre />
          </div>

          <div className="chart__item">
            <ChartGenre />
          </div>

        </div>
      </div>
    </div>
  );

  let [pageContent, setPageContent] = useState(initialPageContent);

  return pageContent;
};

export default WidgetsPage;

import "./WidgetsPage.css";
import StatsByGenre from "../widgets/StatsByGenre";
import ChartGenre from "../widgets/ChartGenre";
import GenrePage from "./GenrePage";
import { useState } from "react";
import ArtistSlider from "../widgets/ArtistSlider";

const WidgetsPage = () => {
  let trendingGenres = [
    { id: 1, genre: "Jazz", imageUrl: "https://i.scdn.co/image/ab6761610000e5eb0f9be189941db077530d5ae0"},
    { id: 2, genre: "Rock", imageUrl: "https://i.scdn.co/image/ab6761610000e5eb0da5abcc5c0aef0c3cc573d0"},
    { id: 3, genre: "Blues", imageUrl: "https://i.scdn.co/image/ab6761610000e5eb9e3acf1eaf3b8846e836f441"},
    { id: 4, genre: "Classical", imageUrl: "https://i.scdn.co/image/ab6761610000e5ebd8b9980db67272cb4d2c3daf"},
    { id: 5, genre: "EDM", imageUrl: "https://i.scdn.co/image/ab6761610000e5ebd42a27db3286b58553da8858"},
    { id: 6, genre: "Reggae", imageUrl: "https://i.scdn.co/image/ab6761610000e5ebdec41838906c58af1c29c9da"},
  ]; //replace with dynamic DB fetch later

  

  async function fetchGenresHandler() {
    const response = await fetch("http://localhost:8000/");
    const data = await response.json();

    console.log(data);
  }

  const genresTest = fetchGenresHandler();
  
  console.log(genresTest)

  // function that sets the pagecontent to the stats-per-genre page
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

  // function that resets the single-genre-page to the homepage content
  const goBackClickHandler = () => {
    setPageContent(initialPageContent);
  };

  // homepage content
  const initialPageContent = (
    <div className="widgetspage__wrapper">
      <div className="widgetspage__col">
        <div style={{ fontSize: 20 }} className="widgetspage__title">
          <p>Most popular genres</p>
        </div>

        <div className="widgetspage__body">
          {trendingGenres.map((item) => {
            return (
              <StatsByGenre
                key={item.id}
                ranking={item.id}
                genre={item.genre}
                imageUrl={item.imageUrl}
                filter={`some genre`}
                onClickHandler={onClickHandler}
              />
            );
          })}
        </div>
      </div>

      <div className="chart__col">
        <div style={{ fontSize: 20 }} className="widgetspage__title">
          <p>Trends</p>
        </div>

        <div className="chart__body">
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

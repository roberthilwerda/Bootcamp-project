import "./GenrePage.css";
import ArtistSlider from "../widgets/ArtistSlider";
import ChartGenre from "../widgets/ChartGenre";

function capitalize(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch {
    return string;
  }
}

const GenrePage = (props) => {
  console.log(props.genre);
  return (
    <div className="genre_page__wrapper">
      <div className="genre_page__back" onClick={props.goBack}>
        <div className="genre_page__back-icon">Go back</div>
      </div>

      <div className="genre_page__container">
        <div className="genre_page__title">
          <h1>{capitalize(props.genre)}</h1>
        </div>

        <div className="genre_page__chart">
          <div className="genre_page__chart-content">
            <ChartGenre
              genre={props.genre}
              startYear={props.startYear}
              endYear={props.endYear}
              mode={"single"}
              data={props.data.filter((data) => data.genre === props.genre)}
            />
          </div>
        </div>

        {/* <div className="genre_page__artist-slider">
          <ArtistSlider />
        </div> */}
      </div>
    </div>
  );
};

export default GenrePage;

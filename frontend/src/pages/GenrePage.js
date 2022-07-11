import "./GenrePage.css";
import ChartGenre from "../widgets/ChartGenre";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function capitalize(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch {
    return string;
  }
}

const GenrePage = (props) => {
  const state = useSelector((state) => state)
  const startYear = state.genre.selectedStartYear;
  const endYear = state.genre.selectedEndYear;
  const navigate = useNavigate();

  const goBackHandler = () => {
    navigate('/')
  }

  return (
    <div className="genre_page__wrapper">
      <div className="genre_page__back" onClick={goBackHandler}>
        <div className="genre_page__back-icon">Go back</div>
      </div>

      <div className="genre_page__container">
        <div className="genre_page__title">
          <h1>{capitalize(props.genre)}</h1>
        </div>

        <div className="genre_page__chart">
          <div className="genre_page__chart-content">
            <ChartGenre
              startYear={startYear}
              endYear={endYear}
              mode={"single"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;

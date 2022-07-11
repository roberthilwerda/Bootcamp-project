import "./GenrePage.css";
import ChartGenre from "../widgets/ChartGenre";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function capitalize(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch {
    return string;
  }
}

const GenrePage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = props.data.filter((data) => data.genre === props.genre)

  const params = useParams();
  console.log(params.genre)

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
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;

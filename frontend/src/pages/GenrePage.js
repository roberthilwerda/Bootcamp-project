import "./GenrePage.css";
import ChartGenre from "../widgets/ChartGenre";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGenreDetail } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

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
  const { genre } = useParams();
  const { sendRequest, status, data, error } = useHttp(getGenreDetail);

  useEffect(() => {
    sendRequest(genre);
  }, [sendRequest, genre]);

  const navigate = useNavigate();
  

  const goBackHandler = () => {
    navigate(-1)
  }

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log(error);
    return <p>Failed to fetch data.</p>;
  }

  console.log(data);

  if (status === "completed" && (!data || data.length === 0)) {
    return <div>No data available.</div>;
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
              data={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePage;

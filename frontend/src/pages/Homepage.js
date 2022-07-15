import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genreActions } from "../store/genre-slice";
import useHttp from "../hooks/use-http";
import "./Homepage.css";
import GenreCard from "../widgets/GenreCard";
import ChartGenre from "../widgets/ChartGenre";
import InfoWidget from "../widgets/InfoWidget";
import Monthpicker from "../widgets/Monthpicker";
import LoadingSpinner from "../components/UI/LoadingSpinner";

//ENDPOINTS
import { getAllData } from "../lib/api";

const Homepage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const startYear = state.genre.selectedStartYear;
  const endYear = state.genre.selectedEndYear;

  const [page, setPage] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("2021-12");

  const { sendRequest, status, data, error } = useHttp(getAllData, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (data !== null) {
      dispatch(
        genreActions.setData(
          data
            .filter((genre) => genre.date === `${selectedMonth}-01`)
            .sort(function (a, b) {
              return b.rank_aggregate - a.rank_aggregate;
            })
            .slice(0, 6)
        )
      );
    }
  }, [data, selectedMonth, dispatch]);

  const filteredData = state.genre.data;

  //HELPER FUNCTIONS
  function goBackClickHandler() {
    navigate(-1);
  }

  const getGenresArray = (filteredData) => {
    let genresArray = [];
    for (let i = 0; i < filteredData.length; i++) {
      genresArray[i] = filteredData[i].genre;
    }
    return genresArray;
  };

  const prevPageClickHandler = () => {
    setPage(page - 1);
    const newData = data
      .filter((genre) => genre.date === `${selectedMonth}-01`)
      .sort(function (a, b) {
        return b.rank_aggregate - a.rank_aggregate;
      })
      .slice(6 * (page - 1), 6 * (page - 1) + 6);
    dispatch(genreActions.setData(newData));
  };

  const nextPageClickHandler = () => {
    setPage(page + 1);
    const newData = data
      .filter((genre) => genre.date === `${selectedMonth}-01`)
      .sort(function (a, b) {
        return b.rank_aggregate - a.rank_aggregate;
      })
      .slice(6 * (page + 1), 6 * (page + 1) + 6);

    dispatch(genreActions.setData(newData));
  };

  const changeMonthHandler = (event) => {
    const newMonth = event.target.value;
    setPage(0);
    setSelectedMonth(newMonth);
  };

  const numOfPages = (allData) => {
    const length = allData.filter((entry) => entry.date === `${selectedMonth}-01`).length / 6;
    return Math.ceil(length) - 1;
  };

  const selectStartYearHandler = (event) => {
    dispatch(genreActions.changeSelectedStartYear(event.target.value));
  };

  const selectEndYearHandler = (event) => {
    dispatch(genreActions.changeSelectedEndYear(event.target.value));
  };

  if (status === "pending") {
    return <div className="spinner-wrapper"><h1>Loading...</h1><LoadingSpinner /></div>;
  }

  if (error) {
    console.log(error);
    return <p>Failed to fetch data.</p>;
  }

  console.log(filteredData);

  if (status === "completed" && (!filteredData || filteredData.length === 0)) {
    return <div>No data available.</div>;
  }

  return (
    <div className="widgetspage__wrapper">
      <div className="widgetspage__col-genres">
        <div style={{ fontSize: 20 }} className="widgetspage__title">
          <Monthpicker selectedMonth={selectedMonth} changeMonthHandler={changeMonthHandler} />

          <div className="genrecards__title">
            <p>Most popular genres</p>
          </div>

          <div className="pagination__wrapper">
            <img
              className="pagination_button"
              style={{ visibility: page === 0 && "hidden" }}
              alt=""
              src={require("../img/icon-back.png")}
              onClick={prevPageClickHandler}
            />
            <img
              style={{
                visibility: page === numOfPages(data) && "hidden",
              }}
              className="pagination_button"
              alt=""
              src={require("../img/icon-forward.png")}
              onClick={nextPageClickHandler}
            />
          </div>
        </div>

        <div className="statsbygenre__container">
          {filteredData.map((item, index) => {
            return (
              <GenreCard
                key={item.id}
                ranking={6 * page + index + 1}
                genre={item.genre}
                chartData={data.filter(data => data.genre === item.genre)}
                imageUrl={item.image_url}
                growth={item.growth}
              />
            );
          })}
        </div>
      </div>

      <div className="widgetspage__col-charts">
        <div style={{ fontSize: 20 }} className="widgetspage__title">
          <div className="date_input_content">
            <label>Start year:</label>

            <select
              id="startyear"
              name="startyear"
              defaultValue={startYear}
              onChange={selectStartYearHandler}
            >
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <p>Trends</p>
          <div className="date_input_content">
            <label>End year:</label>

            <select id="endyear" name="endyear" defaultValue={endYear} onChange={selectEndYearHandler}>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>
        <div className="chartinfo__container">
          <ChartGenre
            mode={"multiple"}
            data={data}
            genreArray={getGenresArray(filteredData)}
            goBack={goBackClickHandler}
          />
          <InfoWidget />
        </div>
      </div>
    </div>
  );
};

export default Homepage;

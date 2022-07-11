import "./Homepage.css";
import StatsByGenre from "../widgets/StatsByGenre";
import ChartGenre from "../widgets/ChartGenre";
import InfoWidget from "../widgets/InfoWidget";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Monthpicker from "../widgets/Monthpicker";
import { genreActions } from "../store/genre-slice";

const Homepage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const startYear = state.genre.selectedStartYear;
  const endYear = state.genre.selectedEndYear;

  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState("2021-12");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    // const response = await fetch("http://localhost:8000/get_all_enhanced");
    // const data = await response.json();

    setAllData(state.genre.allData);

    setFilteredData(
      allData
        .filter((genre) => genre.date === `${selectedMonth}-01`)
        .sort(function (a, b) {
          return b.rank_aggregate - a.rank_aggregate;
        })
        .slice(0, 6)
    );

    setIsLoading(false);
  }, [selectedMonth, allData, state.genre.allData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function goBackClickHandler() {
    navigate("/");
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
    const newData = allData
      .filter((genre) => genre.date === `${selectedMonth}-01`)
      .sort(function (a, b) {
        return b.rank_aggregate - a.rank_aggregate;
      })
      .slice(6 * (page - 1), 6 * (page - 1) + 6);
    setFilteredData(newData);
  };

  const nextPageClickHandler = () => {
    setFilteredData(
      allData
        .filter((genre) => genre.date === `${selectedMonth}-01`)
        .sort(function (a, b) {
          return b.rank_aggregate - a.rank_aggregate;
        })
        .slice(6 * (page + 1), 6 * (page + 1) + 6)
    );
    setPage(page + 1);
  };

  const changeMonthHandler = (event) => {
    const newMonth = event.target.value;
    setPage(0);

    setSelectedMonth(newMonth);

    setFilteredData(
      allData
        .filter((genre) => genre.date === `${event.target.value}-01`)
        .sort(function (a, b) {
          return b.rank_aggregate - a.rank_aggregate;
        })
        .slice(0, 6)
    );
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
                visibility: page === numOfPages(allData) && "hidden",
              }}
              className="pagination_button"
              alt=""
              src={require("../img/icon-forward.png")}
              onClick={nextPageClickHandler}
            />
          </div>
        </div>

        <div className="statsbygenre__container">
          {isLoading || state.genre.allData.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            filteredData.map((item, index) => {
              return (
                <StatsByGenre
                  key={item.id}
                  ranking={6 * page + index + 1}
                  genre={item.genre}
                  imageUrl={item.image_url}
                  growth={item.growth}
                />
              );
            })
          )}
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
            data={allData}
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

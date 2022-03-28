import "./WidgetsPage.css";
import StatsByGenre from "../widgets/StatsByGenre";
import ChartGenre from "../widgets/ChartGenre";
import InfoWidget from "../widgets/InfoWidget";
import { useState, useEffect, useCallback } from "react";
import GenrePage from "../components/GenrePage";

const WidgetsPage = (props) => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [pagination, setPagination] = useState(0);

  const fetchData = useCallback(async () => {
    const response = await fetch("http://localhost:8000/");
    const data = await response.json();
    setAllData(data);
    setFilteredData(
      data
        .filter((genre) => genre.date === "2021-12-01")
        .sort(function (a, b) {
          return b.rank_aggregate - a.rank_aggregate;
        })
        .slice(0, 6)
    );
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function showComponent(genre) {
    setSelectedGenre(genre);
    props.unsetShowHomePage(false);
  }

  function goBackClickHandler() {
    props.setShowHomePage(true);
  }

  const getGenresArray = (filteredData) => {
    let genresArray = [];
    for (let i = 0; i < filteredData.length; i++) {
      genresArray[i] = filteredData[i].genre;
    }
    return genresArray;
  };

  const getDataArray = (allData) => {
    let dataArray = [];
    const genres = getGenresArray(filteredData);
    for (const genre of genres) {
      dataArray.push(
        allData.filter(
          (data) => data.genre === genre && data.date.includes("2021")
        )
      );
    }
    // console.log(dataArray)
    return dataArray;
  };

  const prevPageClickHandler = () => {
    setPagination(pagination - 1);
    const newData = allData
      .filter((genre) => genre.date === "2021-12-01")
      .sort(function (a, b) {
        return b.rank_aggregate - a.rank_aggregate;
      })
      .slice(6 * (pagination - 1), 6 * (pagination - 1) + 6);
    setFilteredData(newData);
  };

  const nextPageClickHandler = () => {
    setFilteredData(
      allData
        .filter((genre) => genre.date === "2021-12-01")
        .sort(function (a, b) {
          return b.rank_aggregate - a.rank_aggregate;
        })
        .slice(6 * (pagination + 1), 6 * (pagination + 1) + 6)
    );
    setPagination(pagination+1)
  };

  const numOfPages = (allData) => {
    const length = allData.filter(entry => entry.date === "2021-12-01").length / 6
    return Math.ceil(length) - 1;
  }

  console.log(numOfPages(allData))
  console.log(pagination)

  const showHomePageContent = () => {
    return (
      <div className="widgetspage__wrapper">
        <div className="widgetspage__col-genres">
          <div style={{ fontSize: 20 }} className="widgetspage__title">
            <img
              className="pagination_button"
              style={{ visibility: pagination === 0 && "hidden" }}
              alt=""
              src={require("../img/icon-back.png")}
              onClick={prevPageClickHandler}
            />
            <p>Most popular genres</p>
            <img
              style={{ visibility: pagination === numOfPages(allData) && "hidden" }}
              className="pagination_button"
              alt=""
              src={require("../img/icon-forward.png")}
              onClick={nextPageClickHandler}
            />
          </div>

          {props.showHomePage &&
            filteredData.map((item, index) => {
              return (
                <StatsByGenre
                  key={item.id}
                  ranking={6 * pagination + index + 1}
                  genre={item.genre}
                  imageUrl={item.image_url}
                  onClickHandler={() => showComponent(item.genre)}
                />
              );
            })}
        </div>

        <div className="widgetspage__col-charts">
          <div style={{ fontSize: 20 }} className="widgetspage__title">
            <div className="date_input_content">
              <label>Start date:</label>

              <input
                className="date_input"
                type="date"
                id="start"
                name="trip-start"
                min="2012-01-01"
                max="2021-12-31"
              />
            </div>
            <p>Trends</p>
            <div className="date_input_content">
              <label>End date:</label>

              <input
                className="date_input"
                type="date"
                id="start"
                name="trip-start"
                min="2012-01-01"
                max="2021-12-31"
              />
            </div>
          </div>
          <ChartGenre
            mode={"multiple"}
            data={getDataArray(allData)}
            filteredData={filteredData}
            genre={getGenresArray(filteredData)}
            goBack={goBackClickHandler}
          />
          <InfoWidget />
        </div>
      </div>
    );
  };

  const showGenrePageContent = (genre) => {
    return (
      <div className="widgetspage__wrapper">
        <GenrePage
          data={allData}
          filteredData={filteredData}
          genre={genre}
          goBack={goBackClickHandler}
        />
      </div>
    );
  };

  if (props.showHomePage) {

    return showHomePageContent();
  } else {
    return showGenrePageContent(selectedGenre);
  }
};

export default WidgetsPage;

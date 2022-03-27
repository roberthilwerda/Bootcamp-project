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

  const fetchData = useCallback(async () => {
    const response = await fetch("http://localhost:8000/");
    const data = await response.json();
    setFilteredData(
      data
        .filter((genre) => genre.date === "2021-12-01")
        .sort(function (a, b) {
          return b.rank_aggregate - a.rank_aggregate;
        })
        .slice(0, 6)
    );
    setAllData(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
    const genres =  getGenresArray(filteredData);
    for(const genre of genres){
      dataArray.push(allData.filter(data => data.genre === genre && data.date.includes('2021')))
    }
    return dataArray
  }

  const showHomePageContent = () => {
    return (
      <div className="widgetspage__wrapper">
        <div className="widgetspage__col-genres">
          <div style={{ fontSize: 20 }} className="widgetspage__title">
            <p>Most trending genres</p>
          </div>

          {props.showHomePage &&
            filteredData.map((item, index) => {
              return (
                <StatsByGenre
                  key={item.id}
                  ranking={index + 1}
                  genre={item.genre}
                  imageUrl={item.image_url}
                  onClickHandler={() => showComponent(item.genre)}
                />
              );
            })}
        </div>

        <div className="widgetspage__col-charts">
          <div style={{ fontSize: 20 }} className="widgetspage__title">
            <p>Trends</p>
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

  console.log(getDataArray(allData))

  if (props.showHomePage) {
    return showHomePageContent();
  } else {
    return showGenrePageContent(selectedGenre);
  }
};

export default WidgetsPage;

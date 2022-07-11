import "./StatsByGenre.css";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import { genreActions } from "../store/genre-slice";

function capitalize(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch {
    return string;
  }
}

function showGrowth(growth) {
  if (growth === null) {
    return (
      <div className="growth_indicator">
        <div>NEW</div>
      </div>
    );
  }
  if (growth > 0) {
    return (
      <div className="growth_indicator">
        <img
          className="growth_indicator__icon"
          alt=""
          src={require("../img/icon-up.png")}
        />
        <div>{Math.floor(growth * 100) / 100} %</div>
      </div>
    );
  }
  if (growth < 0) {
    return (
      <div className="growth_indicator">
        <img
          className="growth_indicator__icon"
          alt=""
          src={require("../img/icon-down.png")}
        />
        <div>{Math.floor(growth * 100) / -100} %</div>
      </div>
    );
  }
}

const StatsByGenre = (props) => {
  const dispatch = useDispatch();
  const genre = props.genre;
  const imageUrl = props.imageUrl;
  const ranking = props.ranking;
  const growth = props.growth;

  const navigate = useNavigate();

  const clickHandler = (genre) => {
    dispatch(genreActions.changeSelectedGenre(genre))
    navigate(`/genre-detail/${genre}`)
  }

  return (
    <div
      className="black_container"
      onClick={() => {
        clickHandler(genre);
      }}
    >
      <div className="bg-container">
        <div
          className="genre__item"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {" "}
        </div>
      </div>

      <div className="click_to_view-container">
        <div className="click_to_view">View stats</div>
      </div>

      <div className="genre__title-container">
        <div className="genre__title">
          <p>
            {ranking}. {capitalize(genre)}{" "}
          </p>

          {/* <div className="play__icon-container"><img
              className="play__icon"
              alt=""
              width="35px"
              src={require("../img/icon-play.png")}
            /></div> */}

          {showGrowth(growth)}
        </div>
      </div>
    </div>
  );
};

export default StatsByGenre;

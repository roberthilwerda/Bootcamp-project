import "./StatsByGenre.css";
import React from "react";

function capitalize(string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch {
    return string;
  }
}

const StatsByGenre = (props) => {
  const genre = props.genre;
  const imageUrl = props.imageUrl;
  const ranking = props.ranking;

  return (
    <div
      className="black_container"
      onClick={() => {
        props.onClickHandler(genre);
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

          <div className="play__icon-container"><img
              className="play__icon"
              alt=""
              width="35px"
              src={require("../img/icon-play.png")}
            /></div>

          <div className="growth_indicator">
            <img
              className="growth_indicator__icon"
              alt=""
              src={require("../img/icon-up.png")}
            />
            <p>5.56%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsByGenre;

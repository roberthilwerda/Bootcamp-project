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
      onClick={() => {
        props.onClickHandler(genre);
      }}
      className="genre__item"
    >
      <div className="genre__image-wrapper">
        <img alt="" className="genre__image" src={imageUrl}></img>
      </div>

      <div className="genre__title">
        <div className="genre__title_genre">
          {ranking}. {capitalize(genre)}
        </div>
        <div className="click_to_view">View stats</div>
      </div>
    </div>
  );
};

export default StatsByGenre;

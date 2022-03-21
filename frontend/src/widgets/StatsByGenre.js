import "./StatsByGenre.css";
import React from "react";

const genreObj = {
  jazz: {
    image: require("../components/images/jazz.png"),
    tag: "JAZZ",
  },
  pop: {
    image: require("../components/images/pop.png"),
    tag: "POP",
  },
};

const StatsByGenre = (props) => {
  const genre = props.genre;
  const imageUrl = props.imageUrl;
  const ranking = props.ranking;

  return (
    <div onClick={() => {props.onClickHandler(genre)}} className="genre__item">
      <div className="genre__image-wrapper">
        <img alt="" className="genre__image" src={imageUrl}></img>
      </div>

      <div className="genre__title">
        <div className="genre__title_genre">{ranking}: {genre} </div>
        <div className="click_to_view">Click to view stats</div>
      </div>
    </div>
  );
};

export default StatsByGenre;

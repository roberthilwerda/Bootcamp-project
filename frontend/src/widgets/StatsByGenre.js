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
  const genre = genreObj[props.genre];

  const clickHandler = () => {
    ;
  };

  return (
    <div onClick={clickHandler} className="genre__item">
      <div className="genre__image-wrapper">
        <img alt="" className="genre__image" src={genre.image}></img>
      </div>

      <div className="genre__title">
        <div style={{ fontSize: 20 }}>View {genre.tag} statistics</div>
      </div>
    </div>
  );
};

export default StatsByGenre;

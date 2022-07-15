import React from "react";
import "./InfoWidget.css";

const InfoWidget = (props) => {
  return (
    <div className="info__wrapper">
        <div className="info__text">
          <p className="info__text-title">About</p>
          <span className="info__text-content">
          
          Log in to view your favourite genre!

          </span>
        </div>
    </div>
  );
};

export default InfoWidget;

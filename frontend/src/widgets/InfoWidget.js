import React from "react";
import "./InfoWidget.css";

const InfoWidget = (props) => {
  return (
    <div className="info__wrapper">
        <div className="info__text">
          <p className="info__text-title">About</p>
          <span className="info__text-content">
            Welcome to GenTrend! Here you can find trending genres and artists.
            GenTrend was designed for music investors and passionate music
            lovers. The platform uses the Billboard API and the Spotify API to
            determine which genres are trending. The data is fetched on a
            monthly basis.
            <br />
            <br />
            The six most trending genres as displayed on this page are calculated based
            on the growth of popularity and the genre ranking in the Billboard.
            <br />
            <br />
            GenTrend was created in 2022 by David Kats, Kaj van der Valk, Thomas
            Nessen, Trang Tran, Rico Temmink, Robert Hilwerda and Frenk Reemer
            as part of the Young Coders Fullstack Developer Challengership.
          </span>
        </div>
    </div>
  );
};

export default InfoWidget;

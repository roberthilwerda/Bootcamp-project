import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [showMenuItems, setShowMenuItems] = useState(false);

  const clickHandler = () => {
    showMenuItems ? setShowMenuItems(false) : setShowMenuItems(true);
  };

  return (
    <div className="header__wrapper">
      <div className="header__logo-area">
        <div>
          <img
            className={`header__logo`}
            alt=""
            src={require("./gtlogo.png")}
          />
        </div>
      </div>

      <div onClick={clickHandler} className="header__menu-area">
        <div className="header__menu-area-hamburger">
          <h2>{showMenuItems ? "✕" : "☰"}</h2>
        </div>

        <div
          className="header__menu-area-items"
          style={{
            display: showMenuItems ? "flex" : "none",
          }}
        >
          <div className="header__item">
            <h4>Home</h4>
          </div>
          <div className="header__item">
            <h4>Get Trends</h4>
          </div>
          <div className="header__item">
            <h4>Contact</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;

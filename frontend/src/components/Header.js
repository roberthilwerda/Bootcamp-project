import React, { useState } from "react";
import "./Header.css";

const Header = (props) => {
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
            src={require("./images/gtlogo.png")}
          />
        </div>
      </div>

      <div className="header__menu-area">
        <div onClick={clickHandler} className="header__menu-area-hamburger">
          <h2>{showMenuItems ? "✕" : "☰"}</h2>
        </div>

        <div
          className="header__menu-area-items"
          style={{
            display: showMenuItems ? "flex" : "none",
          }}
        >
          <div className="header__item" onClick={props.setShowHomePage}>
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

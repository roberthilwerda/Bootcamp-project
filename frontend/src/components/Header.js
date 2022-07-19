import React, { useState } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import Facebook from "../components/Facebook";
import { useNavigate, useLocation } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import LoadingSpinner from "./UI/LoadingSpinner";
import { useEffect } from "react";

const Header = (props) => {
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    showMenuItems ? setShowMenuItems(false) : setShowMenuItems(true);
  };

  const goHomeHandler = () => {
    navigate("/home");
  };

  const logoutHandler = () => {
    dispatch(authActions.unsetCredentials());
    navigate("/");
  };

  if (location.pathname === "/") {
    return null;
  }

  if (!state) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="header__wrapper">
        <div className="header__logo-area">
          <div>
            <img className={`header__logo`} alt="" src={require("./images/gtlogo.png")} />
          </div>
        </div>

        {/* <div className="header__menu-area">
          <div onClick={clickHandler} className="header__menu-area-hamburger">
            <h2>{showMenuItems ? "✕" : "☰"}</h2>
          </div>

          <div
            className="header__menu-area-items"
            style={{
              display: showMenuItems ? "flex" : "none",
            }}
          >
            <div className="header__item" onClick={goHomeHandler}>
              <h4>Home</h4>
            </div>
            <div className="header__item">
              <h4>Get Trends</h4>
            </div>
            <div className="header__item">
              <h4>Contact</h4>
            </div>
          </div>
        </div> */}

        <div className="header__menu-area">
          <ul className="login-wrapper">
            <li>Logged in as {state.auth.loginData.name}</li>
            <li className="dropdown">
              <img className="dropbtn" src={state.auth.loginData.picture.data.url} alt="profile" />
              <div onClick={logoutHandler} className="dropdown-content">
                <span>Log out</span>
              </div>
            </li>
          </ul>
          {/* <div className="header__settings-area">
        <Facebook />
      </div> */}
        </div>
      </div>
    );
  }
};
export default Header;

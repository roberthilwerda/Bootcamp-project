import React, { useState } from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import Facebook from "../components/Facebook";
import { useNavigate, useLocation } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import LoadingSpinner from "./UI/LoadingSpinner";
import { useEffect } from "react";

const Header = (props) => {
  const state = useSelector((state) => state);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logoutHandler = () => {
    dispatch(authActions.unsetCredentials());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expireTimeToken");
    localStorage.removeItem("userID");
    navigate("/");
  };

  if (location.pathname === "/") {
    return null;
  }

  if (!state || state.auth.loginData.name === null) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="header__wrapper">
        <div className="header__logo-area">
          <div>
            <img className={`header__logo`} alt="" src={require("./images/gtlogo.png")} />
          </div>
        </div>

        <div className="header__menu-area">
          <ul className="login-wrapper">
            <li>Logged in as {state.auth.loginData.name}</li>
            <li className="dropdown">
              <img className="dropbtn" src={state.auth.loginData.picture} alt="profile" />
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

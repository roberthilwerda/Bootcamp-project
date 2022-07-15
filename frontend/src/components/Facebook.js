import FacebookLogin from "react-facebook-login";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Facebook.css";
import { authActions } from "../store/auth-slice";

const Facebook = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.loginData);

  let fbContent;

  const componentClicked = () => {
    console.log("CLICKED");
  };

  const responseFacebook = (response) => {
    if (response.userID) {
      
      dispatch(
        authActions.setCredentials({
          accessToken: response.accessToken,
          data_access_expiration_time: response.data_access_expiration_time,
          email: response.email,
          expiresIn: response.expiresIn,
          id: response.id,
          name: response.name,
          picture: response.picture,
          signedRequest: response.signedRequest,
          userID: response.userID,
        })
      );
    } else {
      alert("FAIL!!");
    }
  };

  if (state.userID) {
    fbContent = (
      <ul className="login-wrapper">
        <li>Logged in as {state.name}</li>
        <li className="dropdown">
          <img className="dropbtn" src={state.picture.data.url} alt="profile" />
          <div className="dropdown-content">
            <a href="/">Log out</a>
          </div>
        </li>
      </ul>
    );
  } else {
    fbContent = (
      <FacebookLogin
        appId="375859024650355"
        autoLoad={true}
        language="en_US"
        isDisabled={false}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        size="small"
      />
    );
  }

  

  return (
    <div>
      {fbContent}

    </div>
  );
};

export default Facebook;

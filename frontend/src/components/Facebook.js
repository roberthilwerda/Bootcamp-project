import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import "./Facebook.css";
import { authActions } from "../store/auth-slice";
import { fbLogin } from "../lib/api";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { useEffect } from "react";
import LoadingSpinner from "./UI/LoadingSpinner";

const Facebook = () => {
  const { sendRequest, status, data, error } = useHttp(fbLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken")

  useEffect(() => {
    if(status === "completed" && data && accessToken){
      console.log(data)
      dispatch(
        authActions.setCredentials({
          email: data.email,
          name: data.name,
          picture: data.picture_url,
          accessToken: accessToken,
          userID: data.user_id,
        })
      );

      navigate("/home", {replace:true});

    }
  }, [status, data, dispatch, navigate, accessToken])

  const responseFacebook = (response) => {
    if (response.userID) {
      console.log(response)
      sendRequest({
        "user_id":response.userID,
        "email":response.email,
        "name":response.name,
        "access_token":response.accessToken,
        "picture_url":response.picture.data.url
      })
      localStorage.setItem("accessToken",response.accessToken)
      localStorage.setItem("expireTimeToken",response.expiresIn)
      localStorage.setItem("userID",response.userID)
    } else {
      alert("FAIL!!");
    }
  };

  return (
    <FacebookLogin
      appId="375859024650355"
      autoLoad={true}
      language="en_US"
      isDisabled={false}
      fields="name,email,picture"
      callback={responseFacebook}
      size="small"
    />
  );
};

export default Facebook;

import FacebookLogin from "react-facebook-login";
import { useDispatch } from "react-redux";
import "./Facebook.css";
import { authActions } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";

const Facebook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      navigate("/home");
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

import FacebookLogin from "react-facebook-login";
import { useState } from "react";

const Facebook = () => {
  const [state, setState] = useState({
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
  });

  let fbContent;

  const componentClicked = () => {
    console.log("CLICKED");
  };

  const responseFacebook = (response) => {
    setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
  };

  if (state.isLoggedIn) {
    fbContent = null;
  } else {
    fbContent = (
      <FacebookLogin
        appId="375859024650355"
        autoLoad={false}
        language="en_US"
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    );
  }

  return (
    <div>
      {fbContent}

      {state.isLoggedIn ? <div>User logged in
        <img src={state.picture} alt='pic'></img>
      </div> : <div>User is not logged in.</div>}
    </div>
  );
};

export default Facebook;

import myVideo from "../mov/landing.mov";
import "./LandingPage.css";
import Facebook from "../components/Facebook";

const LandingPage = () => {
  return (
    <div className="videowrapper">
      <video className="videocontent" loop autoPlay muted>
        <source src={myVideo} type="video/mp4" />
      </video>

      <div className="get-started__wrapper">
        
        <div className="landingpage-logo__wrapper">
          <img
            className={`landingpage-logo__content`}
            alt=""
            src={require("../components/images/gtlogo.png")}
          />
          <div className="landingpage-text__wrapper">
            <h1 className="landingpage-text__content">A platform for music investors</h1>
          </div>
        </div>

        <div className="landingpage-login__wrapper">
          <Facebook />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

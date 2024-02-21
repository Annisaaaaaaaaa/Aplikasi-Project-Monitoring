import { FunctionComponent } from "react";
import "./FrameComponent.css";

const FrameComponent: FunctionComponent = () => {
  return (
    <header className="loginn-inner">
      <div className="frame-home-parent">
        <div className="frame-home">
          <div className="frame-about" />
          <img
            className="median-icon"
            loading="eager"
            alt=""
            src="/median@2x.png"
          />
        </div>
        <div className="medianskill">
          <b>Median</b>
          <span>Skill</span>
        </div>
        <b className="login">Login</b>
        <div className="home">Home</div>
        <div className="about">About</div>
        <div className="contact">Contact</div>
      </div>
    </header>
  );
};

export default FrameComponent;
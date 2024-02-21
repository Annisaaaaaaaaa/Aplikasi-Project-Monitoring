import { FunctionComponent } from "react";
import "./SocialMediaIcons.css";

const SocialMediaIcons: FunctionComponent = () => {
  return (
    <div className="social-media-icons">
      <footer className="social-media-icons-child" />
      <div className="login-form-title-wrapper">
        <div className="login-form-title">
          <div className="tracks-and-records-frame">
            <h3 className="project-monitoring-system">
              Project Monitoring System
            </h3>
          </div>
          <div className="versi-10">Versi 1.0</div>
        </div>
      </div>
      <div className="footer-frame">
        <div className="copyright-frame1">
          <div className="social-media-frame">
            <div className="all-rights-reserved">All rights reserved.</div>
            <div className="copyright-2024-">
              © Copyright 2024 - MedianSkill.
            </div>
          </div>
        </div>
        <div className="all-rights-frame">
          <img
            className="linkedin-circled-icon"
            loading="eager"
            alt=""
            src="/linkedin-circled@2x.png"
          />
          <div className="twitter-instagram-icon">
            <div className="median-skill-i-d">
              <img
                className="twitterx-icon"
                loading="eager"
                alt=""
                src="/twitterx@2x.png"
              />
              <img
                className="instagram-circle-icon"
                loading="eager"
                alt=""
                src="/instagram-circle@2x.png"
              />
              <img
                className="at-sign-icon"
                loading="eager"
                alt=""
                src="/at-sign@2x.png"
              />
            </div>
            <div className="medianskillid-wrapper">
              <b className="medianskillid">medianskill.id</b>
            </div>
          </div>
        </div>
      </div>
      <div className="login-form-group-parent">
        <div className="login-form-group">
          <div className="project-monitor">
            <div className="qt" />
            <div className="tracks-and-records-container">
              <b className="tracks-and-records">{`Tracks and records client projects `}</b>
              <span className="efficiently">efficiently.</span>
            </div>
          </div>
          <img className="img-icon" alt="" src="/img@2x.png" />
        </div>
        <div className="frames-separator">
          <h2 className="h2">“</h2>
        </div>
        <div className="frames-separator1">
          <h2 className="h21">“</h2>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIcons;

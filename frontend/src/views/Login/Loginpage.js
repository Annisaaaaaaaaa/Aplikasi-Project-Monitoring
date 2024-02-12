import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import '../../Css/loginn.css';
import user from "../../images/User.svg";
import dmn from "../../images/diamond.svg";
import gr from "../../images/Group 225.svg";
import lg from "../../images/lg.svg";

function Loginpage() {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      console.log('Login successful');
      history.push('/dashboard'); // Redirect to /dashboard after successful login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="loginn">
      <div className="div">
        <div className="overlap">
          <div className="vector" />
          <div className="gerigi" />
          <div className="rectangle" />
          <div className="as" />
          {/* <img
            className="image"
            alt="Image"
            src="https://w0.peakpx.com/wallpaper/276/540/HD-wallpaper-harith-mlbb-epic-evos-hero-legend-legends-mage-magic-moba-mobile-skin.jpg"
          /> */}
          <div className="rectangle-2" />
          <p className="exclusive-for-PT">
            <span className="text-wrapper">Exclusive for</span>
            <span className="span">&nbsp;</span>
            <span className="text-wrapper-2">PT Median Talenta Raya</span>
            <span className="span">&nbsp;</span>
            <span className="text-wrapper">staff members.</span>
          </p>
          <div>
            <div className="group">
              <img className="user" alt="User" src={user} />
              <input
                className="overlap-group"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>
            <div className="overlap-wrapper">
              <img className="user" alt="User" src={user} />
              <input
                className="overlap-group"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button className="overlap-2" type="button" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <div className="text-wrapper-4">Forgot password?</div>
          <div className="text-wrapper-5">Anda terdeteksi orang luar.</div>
          <div className="overlap-group-wrapper">
            <div className="div-wrapper">
              <div className="text-wrapper-6">LOGIN AKUN</div>
            </div>
          </div>
          <div className="text-wrapper-7">Staff Login.</div>
          <img className="diamond" alt="Diamond" src={dmn} />
          <div className="elm">
            <div className="ellipse" />
            <div className="ellipse-2" />
          </div>
          <img className="img" alt="Group" src={gr} />
          <div className="login"></div>
        </div>
        <div className="overlap-3">
          <div className="overlap-4">
            <div className="ellipse-3" />
            <img className="median" alt="Median" src={lg} />
          </div>
          <div className="median-skill">MedianSkill</div>
        </div>
      </div>
    </div>
  )
}

export default Loginpage
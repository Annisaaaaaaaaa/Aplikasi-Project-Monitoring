import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import '../../Css/loginn.css';
import user from "../../images/User.svg";
import dmn from "../../images/diamond.svg";
import gr from "../../images/Group 225.svg";
import lg from "../../images/lg.svg";

const Loginpage = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Mendapatkan objek history dari useHistory
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(email, password, history);
      console.log('Login successful');
  
      // Redirect user based on their group
      if (loginData && loginData.user && loginData.user.groups && loginData.user.groups.length > 0) {
        const userGroup = loginData.user.groups[0];
        switch (userGroup) {
          case 'pm':
            history.push('/pm/dashboard');
            break;
          case 'sales':
            history.push('/sales/dashboard');
            break;
          case 'administrator':
            history.push('/administrator/dashboard');
            break;
          case 'admin':
            history.push('/admin/dashboard');
            break;
          case 'engineer':
            history.push('/engineer/dashboard');
            break;
          default:
            history.push('/default-dashboard'); // Redirect to a default dashboard if user's group is not recognized
        }
      } else {
        console.error("User groups not found in token");
        // Handle error or redirect to a default page
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('Email or password is incorrect');
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
  );
}

export default Loginpage;

import React, { useState, useEffect, useContext  } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/img/logocopy.png';
import home from '../assets/img/dashboard.png';
import projek from '../assets/img/projek.png';
import client from '../assets/img/client.png';
import invoice from '../assets/img/invoice.png';
import payment from '../assets/img/payment.png';
import note from '../assets/img/note.png';
import doc from '../assets/img/doc.png';
import users from '../assets/img/user.png';
import logout from '../assets/img/log.png';
import AuthContext from './../context/AuthContext'
import jwt_decode from "jwt-decode"


import '../Css/Dashboard.css';

function Sidebar() {
    const [isActive, setIsActive] = useState(true);

    const handleMenuClick = () => {
        setIsActive(!isActive);
    };

    const {user, logoutUser} = useContext(AuthContext)
    const token = localStorage.getItem("authTokens")

    if (token){
        const decoded = jwt_decode(token) 
        var user_id = decoded.user_id
    }


    const handleMenuItemClick = (e) => {
        const parentLi = e.currentTarget;
        const submenu = parentLi.querySelector("ul.sub-menu");
        if (submenu) {
            const isSubMenuVisible = submenu.classList.toggle("show");
            if (!isSubMenuVisible) {
                submenu.classList.remove("show");
            }
        }
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.js';
        script.integrity = 'sha512-8Z5++K1rB3U+USaLKG6oO8uWWBhdYsM3hmdirnOEWp8h2B1aOikj5zBzlXs8QOrvY9OxEnD2QDkbSKKpfqcIWw==';
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);
        
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className={`sidebar ${isActive ? "active" : ""}`}>
            <div className="menu-btn" onClick={handleMenuClick}>
                <i className="ph-bold ph-caret-left"></i>
            </div>
            <div className="head">
                <div className="user-img">
                    <img src={logo} alt="logo" />
                </div>
                <div className="user-details">
                    <p className="title"><span>Median</span>Skill</p>
                </div>
            </div>
            <div className="nav">
                <div className="menu">
                    <ul>
                        <li onClick={handleMenuItemClick}>
                            <Link to="/dashboard">
                                <img src={home} alt="logo" />
                                <span className="text">Dashboard</span>
                            </Link>
                        </li>
                        <li onClick={handleMenuItemClick}>
                            <a href="/project-admin">
                                <img src={projek} alt="logo" />
                                <span className="text">Project</span>
                                <i className="arrow ph-bold ph-caret-down"></i>
                            </a>
                            <ul className="sub-menu">
                                <li>
                                    <a href="project.html">
                                        <span className="text">Project</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text">Project Activity</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text">Statistic</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li onClick={handleMenuItemClick}>
                            <Link to="/client-admin">
                                <img src={client} alt="logo" />
                                <span className="text">Client</span>
                                <i className="arrow ph-bold ph-caret-down"></i>
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <a href="client.html">
                                        <span className="text">Client</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text">Statistic</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li onClick={handleMenuItemClick}>
                            <Link to="/users-admin">
                                <img src={users} alt="logo" />
                                <span className="text">Users</span>
                                <i className="arrow ph-bold ph-caret-down"></i>
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <a href="client.html">
                                        <span className="text">Client</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text">Statistic</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li onClick={handleMenuItemClick}>
                            <a href="#">
                                <img src={invoice} alt="logo" />
                                <span className="text">Invoice</span>
                                <i className="arrow ph-bold ph-caret-down"></i>
                            </a>
                            <ul className="sub-menu">
                                <li>
                                    <a href="#">
                                        <span className="text">Invoice</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text">Statistic</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li onClick={handleMenuItemClick}>
                            <a href="#">
                                <img src={payment} alt="logo" />
                                <span className="text">Payment</span>
                                <i className="arrow ph-bold ph-caret-down"></i>
                            </a>
                            <ul className="sub-menu">
                                <li>
                                    <a href="#">
                                        <span className="text">Payment</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span className="text">Statistic</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li onClick={handleMenuItemClick}>
                            <a href="#">
                                <img src={note} alt="logo" />
                                <span className="text">Note</span>
                            </a>
                        </li>
                        <li onClick={handleMenuItemClick}>
                            <a href="/document-admin">
                                <img src={doc} alt="logo" />
                                <span className="text">Document</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="menu">
                <ul>
                    <li>
                         <a onClick={logoutUser} style={{cursor:"pointer"}}>
                            <img src={logout} alt="logo" />
                            <span className="text">Logout</span>
                        </a>

                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
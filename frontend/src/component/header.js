import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faAngleDown, faUser, faEnvelope, faChartLine, faSliders, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faCircle as farCircle } from '@fortawesome/free-regular-svg-icons';
import useAxios from "../utils/useAxios";
import jwtDecode from 'jwt-decode';
import '../Css/Nav.css';

function Navbar() {
    const [res, setRes] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const api = useAxios();
    const token = localStorage.getItem("authTokens");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const decode = jwtDecode(token);
                    // Dapatkan data yang diperlukan dari token
                    var user_id = decode.user_id;
                    var username = decode.username;
                    var full_name = decode.full_name;
                    var image = decode.image;
                }

                // Lakukan permintaan get data
                const response = await api.get("/test/");
                setRes(response.data.response);
            } catch (error) {
                console.log(error);
                setRes("Something went wrong");
            }
        };

        fetchData();
    }, [api, token]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    document.addEventListener("DOMContentLoaded", function() {
        const menuToggle = document.querySelector(".menu-toggle");
        const menuItems = document.querySelector(".menu-items");
    
        menuToggle.addEventListener("click", function() {
            menuItems.classList.toggle("show");
        });
    });    
 
    return (
        <div className="navbar">
            <div className="welcome">
                <p className="judul">Hi, {token ? jwtDecode(token).username : ''}</p> 
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Petugas</li>
                <li className="breadcrumb-item active">Tambah</li>
            </div>

            <div className="dashboard-engineer">
                <div className="group-19">
                    <div className="menu-toggle">
                        <div className="hamburger"></div>
                    </div>
                    <div className="menu-items">
                        <div className="text-wrapper-32">About</div>
                        <div className="text-wrapper-33">Contact</div>
                        <div className="text-wrapper-34">FAQ</div>
                    </div>
                </div>
            </div>


            <div className="profile-dropdown">
                <div onClick={toggleDropdown} className="profile-dropdown-btn">
                    <div className="profile-img">
                        <FontAwesomeIcon icon={faCircle} />
                    </div>
                    <span>{token ? jwtDecode(token).username : ''} <FontAwesomeIcon icon={faAngleDown} /></span>
                </div>

                {isOpen && (
                    <ul className="profile-dropdown-list">
                        <li className="profile-dropdown-list-item">
                            <a href="#">
                                <FontAwesomeIcon icon={faUser} />
                                About
                            </a>
                        </li>
                        <li className="profile-dropdown-list-item">
                            <a href="#">
                                <FontAwesomeIcon icon={faEnvelope} />
                                Contact
                            </a>
                        </li>
                        <li className="profile-dropdown-list-item">
                            <a href="#">
                                <FontAwesomeIcon icon={faChartLine} />
                                FAQ
                            </a>
                        </li>
                        <hr />
                        <li className="profile-dropdown-list-item">
                            <a href="#">
                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                Log out
                            </a>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Navbar;
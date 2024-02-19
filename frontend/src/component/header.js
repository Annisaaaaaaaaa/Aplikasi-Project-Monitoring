import React, { useState, useEffect } from 'react';
import useAxios from "../utils/useAxios";
import jwtDecode from 'jwt-decode';
import '../Css/Dashboard.css';

function Navbar() {
    const [res, setRes] = useState("");
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

    if (token) {
        const decode = jwtDecode(token);
        // Dapatkan data yang diperlukan dari token
        var user_id = decode.user_id;
        var username = decode.username;
        var full_name = decode.full_name;
        var image = decode.image;
    }

    return (
        <div className="navbar">
            <div className="welcome">
                <p className="judul">Hi, {username}</p> 
                <p className="halaman">Admin | Dashboard</p>
            </div>
            <div className="dashboard-engineer">
                    <div className="group-19">
                        <div className="text-wrapper-32">About</div>
                        <div className="text-wrapper-33">Contact</div>
                        <div className="text-wrapper-34">FAQ</div>
                    </div>
                </div>

                <div className="group-25">
                    <div className="overlap-5">
                      <div className="rectangle-10"></div>
                      <div className="ellipse-5"></div>
                      {/* <img className="ellipse-6" src="imgE/gojo.jpg" alt="gojo" /> */}
                      <div className="text-wrapper-37">Ira Humanitas</div>
                      <div className="text-wrapper-38">Admin</div>
                    </div>
                </div>
        </div>
    );
}

export default Navbar;





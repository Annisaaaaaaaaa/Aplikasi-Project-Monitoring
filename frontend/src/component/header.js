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
        </div>
    );
}

export default Navbar;

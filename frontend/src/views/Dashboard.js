import React, { useState, useEffect } from 'react';
import useAxios from "../utils/useAxios";
import jwtDecode from 'jwt-decode';
import Sidebar from '../component/sidebar';
import Navbar  from '../component/header';
import { ClientProvider } from '../context/ClientContext';
import ClientTable from '../component/Client/ClientTable';

function Dashboard() {
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

    return (
        <div className='Dashboard'>
            <Sidebar />
            <Navbar />
            {/* Anda dapat menampilkan res atau melakukan apapun dengan data yang telah didapatkan */}
            {/* <div>{res}</div> */}
            <ClientProvider>
                <div>
                    <h1>Client Management Page</h1>
                    <ClientTable />
                </div>
            </ClientProvider>
        </div>
    );
}

export default Dashboard;

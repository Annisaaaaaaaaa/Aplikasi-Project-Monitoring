import React, { useState, useEffect } from 'react';
import useAxios from "../../utils/useAxios";
import jwtDecode from 'jwt-decode';
<<<<<<< HEAD:frontend/src/views/Dashboard.js
import Sidebar from '../component/sidebar';
import Navbar  from '../component/header';
import { ClientProvider } from '../context/ClientContext';
import ClientTable from '../component/Client/ClientTable';
=======
import Sidebar from '../../component/sidebar';
import Navbar  from '../../component/header';
>>>>>>> 2307ed952dd39b5a593cb7e3874e950a6c218cbb:frontend/src/views/Admin/Dashboard_admin.js

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
        <div>
            <Sidebar />
            <Navbar />
<<<<<<< HEAD:frontend/src/views/Dashboard.js
            {/* Anda dapat menampilkan res atau melakukan apapun dengan data yang telah didapatkan */}
            {/* <div>{res}</div> */}
            <ClientProvider>
                <div>
                    <h1>Client Management Page</h1>
                    <ClientTable />
                </div>
            </ClientProvider>
=======
           
>>>>>>> 2307ed952dd39b5a593cb7e3874e950a6c218cbb:frontend/src/views/Admin/Dashboard_admin.js
        </div>
    );
}

export default Dashboard;

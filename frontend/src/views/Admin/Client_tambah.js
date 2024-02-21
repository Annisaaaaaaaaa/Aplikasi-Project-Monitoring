import React from 'react';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarorg from '../../assets/img/gambarorg.png';
import '../../Css/Dashboard.css';
import { useHistory } from 'react-router-dom';

function Client_tambah() {
    const history = useHistory();

    const handleBackClick = () => {
        history.goBack(); // Kembali ke halaman sebelumnya
    };

    return (
        <div>
            <Sidebar />
            <Navbar />

            <div className="container-client-tambah">
                <h1>Tambah Client</h1>
                {/* Tambahkan form atau konten tambah client di sini */}
                <button onClick={handleBackClick}>Kembali</button>
            </div>
        </div>
    );
}

export default Client_tambah;

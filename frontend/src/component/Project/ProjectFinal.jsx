import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../sidebar';
import Navbar from '../header';
import step5 from '../../assets/img/step5.png';
import projk from '../../assets/img/projk.png';
import edt from '../../assets/img/Edit.png';
import addfile from '../../assets/img/addfile.png'
import plus from '../../assets/img/Plus.png'
import int from '../../assets/img/in.png'
import pay from '../../assets/img/pay.png'
import men from '../../assets/img/Menu.png';

import '../../Css/finalization.css';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';

const ProjectFinal = () => {

    const history = useHistory();
   
    const handleAddDoc= (e) => {
        e.preventDefault();
        // Logic for next step, if any
        history.push('/Add_doc');
    };

    return (
        <div>
             <Sidebar />
            <Navbar />
             <div className="panjang">
            <img src={step5} width="85%" alt="Step 5"/>
        </div>

        <div className="container-finalization">
            <div className="container-ban">
                <img src={projk} alt="Project Icon"/>
                <h1>APLIKASI MONITORING PROJECT</h1>
            </div>
            <div className="container-button-finalization">
                <button><img src={men} alt="Menu Icon"/>DETAIL</button>
                <div className="button-kanan-finalization">
                    <button><img src={edt} alt="Edit Icon"/>EDIT</button>
                </div>
            </div>
            <p>BERHASIL DITAMBAHKAN!</p>
            <h2>PID PROJECT - IRA HUMANITAS</h2>
        </div>

        <div className="container-detail-finalization">
            <div className="kiri-detail-finalization">
                <img src={addfile}alt="Add File Icon"/>
                <p>Add Document</p>
                <h2>Tambahkan dokumen pendukung terkait Aplikasi Monitoring Project.</h2>
                <button type="button" onClick={handleAddDoc}>
                    {/* <img src={plus} alt="Plus Icon"/> */}
                    Tambah</button>
            </div>
            <div className="tengah-detail-finalization">
                <img src={int} alt="In Icon"/>
                <p>Add Document</p>
                <h2>Tambahkan faktur terkait Aplikasi <br/>Monitoring Project.</h2>
                <button>
                    {/* <img src={plus} alt="Plus Icon"/> */}
                    Tambah</button>
            </div>
            <div className="kanan-detail-finalization">
                <img src={pay} alt="Pay Icon"/>
                <p>Add Document</p>
                <h2>Tambahkan dokumen pendukung terkait Aplikasi Monitoring Project.</h2>
                <button>
                    {/* <img src={plus} alt="Plus Icon"/> */}
                    Tambah</button>
            </div>
        </div>
        </div>
     
    );
}

export default ProjectFinal;

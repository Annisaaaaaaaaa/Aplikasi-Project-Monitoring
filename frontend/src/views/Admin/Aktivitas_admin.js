import React, { useState, useEffect, useContext } from 'react'; 
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext'; 
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import '../../Css/aktivitas-admin.css';
import gambarakti from '../../assets/img/aktivi.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Aktivitas_admin() {
    const history = useHistory();

    const handleAddAktivitas = (e) => {
        e.preventDefault();
        // Logic for next step, if any
        history.push('/add-aktivitas');
    };
    
    return (
        <div>
            <Sidebar />
                <Navbar />
            <div className="parent">
                <div className="ds-utama-aktivitas"></div>
                <div className="gambaraktivitas"><img src={gambarakti} alt="Project" /></div>
                <div className="duatiga-admin-aktivitas"> 0 </div>
                <div className="total-admin-aktivitas">Project <br/>Finished </div>
                <div className="garis-admin-aktivitas"></div>

                <div className="duatiga-admin2-aktivitas"> 0 </div>
                <div className="total-admin2-aktivitas">Project <br/>On Going </div>
                <div className="garis-admin2-aktivitas"></div>

                <div className="duatiga-admin3-aktivitas"> 0 </div>
                <div className="total-admin3-aktivitas">Project <br/>Finished </div>
                <div className="garis-admin3-aktivitas"></div>
            </div>

            <div className="bungkus-aktivitas">
                <div className="group-button-aktivitas">
                    <button type="button" onClick={handleAddAktivitas}><FontAwesomeIcon icon={faPlus}/> Tambah</button>
                    <button><FontAwesomeIcon icon={faDownload} /> Export</button>
                    <button><FontAwesomeIcon icon={faDownload} /> Filter</button>
                </div>
                <div className="input-group">
                    <input type="search" placeholder="Cari Berdasarkan Nama atau ID..." />
                    {/* <img src="img/search.png" alt="Search" /> */}
                </div>
            </div>

            <main className="table-project-aktivitas" id="customers_table">
                            {/* <section className="table__header">
                                <h1>Data Project</h1>
                            </section>
                            <section className="table__body">
                                    <ProjectTable currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
                            </section> */}
                        </main>

            {/* <div className="pagination">
                <ul> 
                    <li><span><FontAwesomeIcon icon={faAngleLeft} /> Prev</span></li>
                    <li className="numb"><span>1</span></li>
                    <li className="numb"><span>2</span></li>
                    <li className="dots"><span>...</span></li>
                    <li className="numb"><span>4</span></li>
                    <li className="numb"><span>5</span></li>
                    <li className="dots"><span>...</span></li>
                    <li className="numb"><span>7</span></li>
                    <li><span>Next <FontAwesomeIcon icon={faAngleRight} /></span></li>
                </ul>
            </div>   */}
        </div>
    );
}

export default Aktivitas_admin;

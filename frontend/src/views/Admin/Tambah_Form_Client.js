import React, { useState } from 'react';
import '../../Css/form_tambah_client.css';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpop from '../../assets/img/popular.png';
import gambarexel from '../../assets/img/exel3D.png';

function Form_Tambah_Client() {
    const [companyName, setCompanyName] = useState('');
    const [picTitle, setPicTitle] = useState('');
    const [picPhone, setPicPhone] = useState('');
    const [picEmail, setPicEmail] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [webURL, setWebURL] = useState('');
    const [notes, setNotes] = useState('');

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleFileInputChange = (e) => {
        // Handle file input change if needed
    };

    const handleSubmit = () => {
        // Handle form submission
    };

    return (
        <div>
            <Sidebar />
            <Navbar />

            <div className="parent-form-client">
                <div className="bg-form">
                    <div className="bg-form-atas">
                        <div className="container-form">
                            <div className="left">
                            <img src={gambarpop} alt="logo" />
                            </div>
                            <div className="right">
                                <p className="add-client">ADD CLIENT</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-form-bawah">
                        <div className="ess">
                            <p>Essential Information. </p>
                            <br />
                        </div>
                        <div className="miau">
                            <div className="kiri">
                                <div className="tittle-form">
                                    <p>Company/Industry Name </p>
                                </div>
                                <div className="input-form">
                                    <input 
                                        type="text" 
                                        value={companyName} 
                                        placeholder="Ex. PT Bongkar Turet" 
                                        onChange={(e) => handleInputChange(e, setCompanyName)} 
                                    />
                                </div>
                                <p className="error">
                                    {/* Show error message if needed */}
                                </p>
                                <br />
                                <div className="tittle-form">
                                    <p>PIC Title </p>
                                </div>
                                <div className="input-form">
                                    <input 
                                        type="text" 
                                        value={picTitle} 
                                        placeholder="Ex. PT Bongkar Turet" 
                                        onChange={(e) => handleInputChange(e, setPicTitle)} 
                                    />
                                </div>
                                <p className="error">
                                    {/* Show error message if needed */}
                                </p>
                            </div>
                            <div className="kanan">
                                <div className="tittle-form">
                                    <p>PIC Phone </p>
                                </div>
                                <div className="input-form">
                                    <input 
                                        type="text" 
                                        value={picPhone} 
                                        placeholder="Ex. PT Bongkar Turet" 
                                        onChange={(e) => handleInputChange(e, setPicPhone)} 
                                    />
                                </div>
                                <p className="error">
                                    {/* Show error message if needed */}
                                </p>
                                <br />
                                <div className="tittle-form">
                                    <p>PIC Email </p>
                                </div>
                                <div className="input-form">
                                    <input 
                                        type="text" 
                                        value={picEmail} 
                                        placeholder="Ex. PT Bongkar Turet" 
                                        onChange={(e) => handleInputChange(e, setPicEmail)} 
                                    />
                                </div>
                                <p className="error">
                                    {/* Show error message if needed */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="exel-form">
                    <div className="exel-content">
                     <img src={gambarexel} alt="logo" />
                        <div className="exel-des">
                            <p>Atau Import Informasi Dari Excel</p>
                            <span>dengan klik button berikut</span>
                            <div className="group-button">
                                <button>Import</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-bawah">
                    <div className="ess2">
                        <p>Additional Information. </p>
                    </div>

                    <div className="miau2">
                        <div className="kiri">
                            <div className="tittle-form">
                                <p>Company Address </p>
                            </div>
                            <div className="input-form2">
                                <input 
                                    type="text" 
                                    value={companyAddress} 
                                    placeholder="Ex. PT Bongkar Turet" 
                                    onChange={(e) => handleInputChange(e, setCompanyAddress)} 
                                />
                            </div>

                            <div className="tittle-form">
                                <p>Company Phone</p>
                            </div>
                            <div className="input-form2">
                                <input 
                                    type="text" 
                                    value={companyPhone} 
                                    placeholder="Ex. PT Bongkar Turet" 
                                    onChange={(e) => handleInputChange(e, setCompanyPhone)} 
                                />
                            </div>

                            <div className="tittle-form">
                                <p>Company Logo</p>
                            </div>
                            <div className="file-input-container">
                                <label htmlFor="file-upload" className="label-file">Upload</label>
                                <input 
                                    id="file-upload" 
                                    type="file" 
                                    onChange={handleFileInputChange} 
                                />
                                <span id="file-name"></span>
                            </div>
                        </div>

                        <div className="kanan">
                            <div className="tittle-form">
                                <p>Company Size </p>
                            </div>
                            <div className="input-form2">
                                <input 
                                    type="text" 
                                    value={companySize} 
                                    placeholder="Ex. PT Bongkar Turet" 
                                    onChange={(e) => handleInputChange(e, setCompanySize)} 
                                />
                            </div>

                            <div className="tittle-form">
                                <p>Company Email </p>
                            </div>
                            <div className="input-form2">
                                <input 
                                    type="text" 
                                    value={companyEmail} 
                                    placeholder="Ex. PT Bongkar Turet" 
                                    onChange={(e) => handleInputChange(e, setCompanyEmail)} 
                                />
                            </div>

                            <div className="tittle-form">
                                <p>Web URL </p>
                            </div>
                            <div className="input-form2">
                                <input 
                                    type="text" 
                                    value={webURL} 
                                    placeholder="Ex. PT Bongkar Turet" 
                                    onChange={(e) => handleInputChange(e, setWebURL)} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="miau3">
                        <div className="tittle-form">
                            <p>Notes</p>
                        </div>
                        <textarea 
                            name="note" 
                            id="" 
                            rows="4" 
                            value={notes} 
                            onChange={(e) => handleInputChange(e, setNotes)} 
                        />
                    </div>
                    <div className="tambah-client">
                        <button onClick={handleSubmit}>Tambah</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form_Tambah_Client;

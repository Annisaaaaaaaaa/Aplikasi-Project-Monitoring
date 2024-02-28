import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../Css/form_tambah_client.css';
import AuthContext from './../../context/AuthContext';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpop from '../../assets/img/popular.png';

function Form_Edit_Client() {
    const { clientId } = useParams();
    const history = useHistory();
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
    const { authTokens } = useContext(AuthContext);

    const fetchData = async () => {
        try {
            const token = authTokens ? authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }
    
            const response = await fetch(`http://localhost:8000/api/v1/client/edit/${clientId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data from database');
            }
            const client = await response.json();
            console.log("Data yang diambil dari server:", client);
            fillFormData(client);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const fillFormData = (client) => {
        setCompanyName(client.industry);
        setPicTitle(client.pic_title);
        setPicPhone(client.pic_phone);
        setPicEmail(client.pic_email);
        setCompanyAddress(client.company_address);
        setCompanyPhone(client.company_phone);
        setCompanySize(client.company_size);
        setCompanyEmail(client.company_email);
        setWebURL(client.website_url);
        setNotes(client.additional_info);
    };

    useEffect(() => {
        fetchData();
    }, [authTokens, clientId]);

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const token = authTokens ? authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }
    
            const formattedLastActivity = new Date().toISOString();
            console.log("Data yang dikirim ke server:", {
                companyName,
                picTitle,
                picPhone,
                picEmail,
                companyAddress,
                companyPhone,
                companySize,
                companyEmail,
                webURL,
                notes,
                last_activity: formattedLastActivity 
            });
    
            const response = await fetch(`http://localhost:8000/api/v1/client/edit/${clientId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    companyName,
                    picTitle,
                    picPhone,
                    picEmail,
                    companyAddress,
                    companyPhone,
                    companySize,
                    companyEmail,
                    webURL,
                    notes,
                    last_activity: formattedLastActivity 
                })
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || 'Failed to update client data');
            }

            // Perbarui state setelah berhasil melakukan permintaan PUT
            fillFormData({
                industry: companyName,
                pic_title: picTitle,
                pic_phone: picPhone,
                pic_email: picEmail,
                company_address: companyAddress,
                company_phone: companyPhone,
                company_size: companySize,
                company_email: companyEmail,
                website_url: webURL,
                additional_info: notes
            });

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Client data updated successfully',
                confirmButtonText: 'OK'
            }).then(() => {
                history.push('/client-admin');
            });
        } catch (error) {
            console.error('Error updating client data:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to update client data',
                confirmButtonText: 'OK'
            });
        }
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
                                <p className="add-client">EDIT CLIENT</p>
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
                                        value={companyName || ''} 
                                        placeholder="Ex. PT Bongkar Turet" 
                                        onChange={(e) => setCompanyName(e.target.value)} 
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
                        <button onClick={handleSubmit}>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Form_Edit_Client;

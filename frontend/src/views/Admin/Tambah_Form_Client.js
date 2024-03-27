import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from './../../context/AuthContext';
import '../../Css/form_tambah_client.css';
import Swal from 'sweetalert2';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpop from '../../assets/img/popular.png';
import gambarexel from '../../assets/img/exel3D.png';

const Form_Tambah_Client = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext);

    const [formData, setFormData] = useState({
        industry: '',
        pic_title: '',
        pic_phone: '',
        pic_email: '',
        name: '',
        date_joined: '',
        company_address: '',
        company_phone: '',
        logo: null,
        company_size: '',
        company_email: '',
        website_url: '',
        additional_info: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = authContext.authTokens ? authContext.authTokens.access : null;
                if (!token) {
                    throw new Error('Authentication token is missing');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setError(error.message);
            }
        };
        fetchData();
    }, [authContext.authTokens]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, logo: file });

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Memeriksa kolom-kolom yang wajib diisi
        const requiredFields = ['name', 'industry', 'date_joined', 'company_address', 'company_email', 'company_phone', 'logo'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            throw new Error(`Please fill in the following required fields: ${missingFields.join(', ')}`);
        }

        setLoading(true);
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
            throw new Error('Authentication token is missing');
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            // Tambahkan nilai kolom ke FormData hanya jika nilainya tidak kosong
            if (value !== '') {
                formDataToSend.append(key, value);
            }
        });

        // Show Sweet Alert before submitting
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to add a new client!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.post(`http://localhost:8000/api/v1/client/`, formDataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Server response:', response.data); // Optional: log server response

                setFormData({
                    industry: '',
                    pic_title: '',
                    pic_phone: '',
                    pic_email: '',
                    name: '',
                    date_joined: '',
                    company_address: '',
                    company_phone: '',
                    logo: null,
                    company_size: '',
                    company_email: '',
                    website_url: '',
                    additional_info: '',
                });

                setLogoPreview(null);

                setError(null);

                history.push('/client-admin');
            }
        });
    } catch (error) {
        console.error('Error submitting form:', error.message);
        setError(error.message); // Menetapkan pesan kesalahan
    } finally {
        setLoading(false);
    }
};

    return (
        <form onSubmit={handleSubmit}>
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
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {error && !formData.industry && error.includes('industry') && (
                                        <p className="error">This field is required.</p>
                                    )}
                                    <br />
                                    <div className="tittle-form">
                                        <p>PIC Title </p>
                                    </div>
                                    <div className="input-form">
                                        <input
                                            type="text"
                                            name="pic_title"
                                            value={formData.pic_title}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <p className="error">
                                        {/* Show error message if needed */}
                                    </p>
                                    <br />
                                    <div className="tittle-form">
                                        <p>Name </p>
                                    </div>
                                    <div className="input-form">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {error && !formData.name && error.includes('name') && (
                                        <p className="error">This field is required.</p>
                                    )}
                                </div>
                                <div className="kanan">
                                    <div className="tittle-form">
                                        <p>PIC Phone </p>
                                    </div>
                                    <div className="input-form">
                                        <input
                                            type="text"
                                            name="pic_phone"
                                            value={formData.pic_phone}
                                            onChange={handleInputChange}
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
                                            name="pic_email"
                                            value={formData.pic_email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <p className="error">
                                        {/* Show error message if needed */}
                                    </p>
                                    <br />
                                    <div className="tittle-form">
                                        <p>Date Joined</p>
                                    </div>
                                    <div className="input-form">
                                        <input
                                            type="date"
                                            name="date_joined"
                                            value={formData.date_joined}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {error && !formData.date_joined && error.includes('date_joined') && (
                                        <p className="error">This field is required.</p>
                                    )}
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
                                        name="company_address"
                                        value={formData.company_address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {error && !formData.company_address && error.includes('company_address') && (
                                    <p className="error">This field is required.</p>
                                )}
                                <div className="tittle-form">
                                    <p>Company Phone</p>
                                </div>
                                <div className="input-form2">
                                    <input
                                        type="text"
                                        name="company_phone"
                                        value={formData.company_phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {error && !formData.company_phone && error.includes('company_phone') && (
                                    <p className="error">This field is required.</p>
                                )}
                                <div className="tittle-form">
                                    <p>Company Logo</p>
                                </div>
                                <div className="file-input-container">
                                    <label htmlFor="file-upload" className="label-file">Upload</label>
                                    <input
                                        id="file-upload"
                                        name="logo"
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                    <span id="file-name">{formData.logo ? formData.logo.name : 'Pilih gambar'}</span>
                                </div>
                                {logoPreview && (
    <img
        src={logoPreview}
        alt="Logo Preview"
        className="logo-preview"
        style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
    />
)}

                                {error && !formData.logo && error.includes('logo') && (
                                    <p className="error">This field is required.</p>
                                )}
                                
                            </div>

                            <div className="kanan">
                                <div className="tittle-form">
                                    <p>Company Size </p>
                                </div>
                                <div className="input-form2">
                                    <input
                                        type="text"
                                        name="company_size"
                                        value={formData.company_size}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="tittle-form">
                                    <p>Company Email </p>
                                </div>
                                <div className="input-form2">
                                    <input
                                        type="text"
                                        name="company_email"
                                        value={formData.company_email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {error && !formData.company_email && error.includes('company_email') && (
                                    <p className="error">This field is required.</p>
                                )}
                                <div className="tittle-form">
                                    <p>Web URL </p>
                                </div>
                                <div className="input-form2">
                                    <input
                                        type="url"
                                        name="website_url"
                                        value={formData.website_url}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="miau3">
                            <div className="tittle-form-notes">
                                <p>Notes</p>
                            </div>
                            <textarea
                                id=""
                                rows="4"
                                name="additional_info"
                                value={formData.additional_info}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="tambah-client">
                            <button type="submit" disabled={loading}>Tambah</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Form_Tambah_Client;

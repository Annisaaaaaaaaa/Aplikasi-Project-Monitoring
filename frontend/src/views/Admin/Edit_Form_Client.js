import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useClientContext } from './../../context/ClientContext';
import AuthContext from './../../context/AuthContext';
import Swal from 'sweetalert2';
import '../../Css/form_tambah_client.css';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpop from '../../assets/img/popular.png';

const Form_Edit_Client = () => {
    const history = useHistory();
    const { authTokens } = useContext(AuthContext);
    const { clientId } = useParams();
    const { error, loading, fetchData } = useClientContext() || {};
  
    const [formData, setFormData] = useState({
        industry: '',
        pic_title: '',
        pic_phone: '',
        pic_email: '',
        name:'',
        company_address: '',
        company_phone: '',
        logo: '',
        company_size: '',
        company_email: '',
        website_url: '',
        additional_info: '',
    });
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = authTokens ? authTokens.access : null;
            if (!token) {
              throw new Error('Authentication token is missing');
            }
    
            const response = await axios.get(`http://localhost:8000/api/v1/client/edit/${clientId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setFormData({
            industry: data.industry || '',
            pic_title: data.pic_title || '',
            pic_phone: data.pic_phone || '',
            pic_email: data.pic_email || '',
            name: data.name || '',
            company_address: data.company_address || '',
            company_phone: data.company_phone || '',
            logo: data.logo || '',
            company_size: data.company_size || '',
            company_email: data.company_email || '',
            website_url: data.website_url || '',
            additional_info: data.additional_info || '',
          });
        } catch (error) {
          console.error('Error fetching client data:', error.message);
        }
      };
  
      fetchData();
    }, [authTokens, clientId]);
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                logo: file,
            }));
        }
    };
            
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validasi bahwa kolom wajib diisi
        const requiredFields = ['name', 'industry', 'company_address', 'company_email', 'company_phone'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        if (missingFields.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Please fill in the following fields: ${missingFields.join(', ')}`,
            });
            return;
        }
    
        try {
            // Lanjutkan pengiriman formulir jika validasi berhasil
            const token = authTokens ? authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }
    
            const formDataForUpload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'logo' && value instanceof File) {
                    formDataForUpload.append(key, value);
                } else if (value && !(key === 'logo' && typeof value === 'string')) {
                    formDataForUpload.append(key, value);
                }
            });
    
            const response = await axios.put(
                `http://localhost:8000/api/v1/client/edit/${clientId}/`,
                formDataForUpload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Client updated successfully!',
                });
                history.push('/client-admin');
            } else {
                console.error('Failed to update client:', response.statusText);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to update client!',
                });
            }
        } catch (error) {
            console.error('Error updating client:', error.message);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to update client!',
            });
        }
    };
                        
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
        
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
                                            name="industry" 
                                            value={formData.industry}
                                            onChange={handleInputChange}
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="exel-form">
                  
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
                                {formData.logo && (
    <div className="current-logo">
        <p>Current Logo:</p>
        <img 
            src={formData.logo} 
            alt="current logo" 
            className="current-logo-img" 
            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
        />
        <button onClick={() => setFormData({ ...formData, logo: null })}>Remove Logo</button>
    </div>
)}
                            </div>
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
                        <button type="submit">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        </form>
    );
}

export default Form_Edit_Client;

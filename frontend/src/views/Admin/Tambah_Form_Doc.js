import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from './../../context/AuthContext';
import Swal from 'sweetalert2';
import './../../Css/tambahdoc.css';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpop from '../../assets/img/popular.png';
import gambardoc from '../../assets/img/gambardoc.png';
import gambarup from '../../assets/img/icon_up.png';

function Form_Tambah_Doc() {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    project: '',
    uploader: '',
    category: '',
    upload_date: '',
    description: '',
    document_file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusOptions] = useState([
    'laporan',
    'project',
    'user',
    // Add other status options as needed
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        // Fetch projects
        const projectsResponse = await axios.get('http://localhost:8000/api/v1/project/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch clients
        const usersResponse = await axios.get('http://localhost:8000/api/users/tambah/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects(projectsResponse.data);
        setUsers(usersResponse.data);
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
    setFormData({ ...formData, document_file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const confirmed = await confirmBeforeSubmit();
        if (!confirmed) {
            return;
        }

        setLoading(true);
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
            throw new Error('Authentication token is missing');
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        await axios.post('http://localhost:8000/api/v1/document/', formDataToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        setFormData({
            name: '',
            project: '',
            uploader: '',
            category: '',
            upload_date: '',
            description: '',
            document_file: null,
        });

        setError(null);

        history.push('/document-admin');
    } catch (error) {
        console.error('Error submitting form:', error.message);
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

const confirmBeforeSubmit = async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to add this document?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!',
    });

    return result.isConfirmed;
};

    return (
       <div>
          <Sidebar />
          <Navbar />
          <div className="form-add-user">
              <div className="tiitle-add-user" style={{ display: 'flex' }}>
                  <div className="add-user-kanan">
                      <div className="icon-add-client">
                          <img src={gambarpop} alt="logo" />
                      </div>
                      <div className="kiri-icon-user">
                        CREATE DOCUMENT
                      </div>
                  </div>
              </div>
              <p>Masukkan Informasi Umum. Bagian Document</p>

              <div className="miau-container" style={{ display: 'flex' }}>
                  <form onSubmit={handleSubmit}>
                      <div className="miau5">
                          <div className="tittle-form-email">
                              Name
                          </div>
                          <div className="input-form-email" style={{ width: '177px' }}>
                              <input type="text" name='name' value={formData.name} onChange={handleInputChange} placeholder="SCOP Projek A" />
                          </div>
                      </div>

                      <div className="miau4">
                          <div className="kiri-user">
                          <div className="tittle-form" style={{ marginBottom: '5%' }}>
                              Project 
                          </div>
                              <div className="select-container">
                                  <select name="project" value={formData.project} onChange={handleInputChange}>
                                      <option value="">Project</option>
                                      {projects.map((project) => (
                                          <option key={project.id} value={project.id}>
                                              {project.name}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                          <div className="kanan-user">
                              <div className="tittle-form">
                                  Uploader 
                              </div>
                              <div className="input-form">
                              <div className="select-container">
                                  <select name="uploader" value={formData.uploader} onChange={handleInputChange} style={{ width: '235px' }}>
                                      <option value="">Uploader</option>
                                      {users.map((user) => (
                                          <option key={user.id} value={user.id}>
                                              {user.email}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                              </div>
                          </div>
                      </div>

                      <div className="miau5">
                          <div className="tittle-form-email">
                          Category
                          </div>
                          <div className="input-form-email">
                            <div className="select-container">
                              <select name="category" value={formData.category} onChange={handleInputChange}>
                                <option value="">Category</option>
                                {statusOptions.map((category) => (
                                    <option key={category} value={category}>
                                    {category}
                                    </option>
                                ))}
                                </select>
                              </div>
                          </div>
                      </div>

                      <div className="miau5">
                          <div className="tittle-form-email">
                          Uploader date
                          </div>
                          <div className="input-form-email">
                          <input type="date" name="upload_date" value={formData.upload_date} onChange={handleInputChange} style={{ width: '520px' }}/>
                          </div>
                      </div>

                      <div className="miau8">
                        <div className="tittle-form-8">
                            <p>Description</p>
                        </div>
                        <textarea name="description" value={formData.description} onChange={handleInputChange} style={{ width: '530px' }}></textarea>
                    </div>

                      <div className="tambah-doc">
                          <button type="submit">CREATE</button>
                      </div>
                  </form>
              </div>
              <div className="exel-form-doc">
                  <div className="exel-content-doc">
                   <img src={gambardoc} alt="logo" />
                      <div className="exel-des-doc">
                          <p>Upload Dokument</p>
                          <span>upload data dokumen</span>
                          <div className="group-button">
                          <div className="file-input-doc">
                                <label htmlFor="file-upload" className="label-file"  style={{ marginLeft: '45%', backgroundColor: '#597CB1',  alignItems: 'center', color:'white', fontWeight: '500'}}>Upload</label>
                                <input id="file-upload"  type="file" name="document_file" onChange={handleFileChange} />
                                <span id="file-name"></span>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
       </div>
    );
}

export default Form_Tambah_Doc;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useDocumentContext } from './../../context/DocumentContext';
import AuthContext from '../../context/AuthContext';
import '../../Css/add_doc.css';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpop from '../../assets/img/popular.png';
import gambardoc from '../../assets/img/gambardoc.png';
import gambarup from '../../assets/img/icon_up.png';

function Update_doc() {
  const history = useHistory();
  const { authTokens } = useContext(AuthContext);
  const { documentId } = useParams();
  const { error, loading, fetchData } = useDocumentContext() || {};

  const [formData, setFormData] = useState({
    name: '',
    project: '',
    uploader: '',
    category: '',
    upload_date: '',
    description: '',
    document_file: '',
  });

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [statusOptions] = useState([
    'belum dibayar',
    'dibayar',
    'overdue',
    // Add other status options as needed
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const projectsResponse = await axios.get('http://localhost:8000/api/v1/project/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usersResponse = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await axios.get(`http://localhost:8000/api/v1/document/edit/${documentId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setProjects(projectsResponse.data);
        setUsers(usersResponse.data);

        setFormData({
          name: data.name || '',
          project: data.project || '',
          uploader: data.uploader || '',
          category: data.category || '',
          upload_date: data.upload_date || '',
          description: data.description || '',
          document_file: data.document_file || '',
        });
      } catch (error) {
        console.error('Error fetching document data:', error.message);
      }
    };

    fetchData();
  }, [authTokens, documentId]);

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
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
  
      const formDataForUpload = new FormData();
  
      // Tambahkan semua bidang ke FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'document_file' && !formData.document_file) {
          // Jika tidak ada file baru yang dipilih, gunakan nilai yang ada dalam state formData
          formDataForUpload.append(key, value);
        } else if (key !== 'document_file') {
          // Tambahkan bidang ke FormData kecuali document_file
          formDataForUpload.append(key, value);
        }
      });
  
      // Tambahkan file baru jika ada
      if (formData.document_file) {
        formDataForUpload.append('document_file', formData.document_file);
      }
  
      const response = await axios.put(
        `http://localhost:8000/api/v1/document/edit/${documentId}/`,
        formDataForUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      history.push('/document-admin');
  
      if (response.status === 200) {
        console.log('Document updated successfully!');
        // Perform any additional actions upon successful update
      } else {
        console.error('Failed to update document:', response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error updating document:', error.message);
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

    return (
       <div>
          <Sidebar />
          <Navbar />
          <div className="form-add-user">
              <div className="tiitle-add-user">
                  <div className="add-user-kanan">
                      <div className="icon-add-client">
                          <img src={gambarpop} alt="logo" />
                      </div>
                      <div className="kiri-icon-user">
                        UPDATE DOCUMENT
                      </div>
                  </div>
              </div>
              <p>Masukkan Informasi Umum. Bagian Document</p>

              <div className="miau-container">
              <form onSubmit={handleSubmit}>
                      <div className="miau5">
                          <div className="tittle-form-email">
                              Name
                          </div>
                          <div className="input-form-email">
                              <input type="text" name='name' value={formData.name} onChange={handleInputChange} placeholder="SCOP Projek A" />
                          </div>
                      </div>

                      <div className="miau4">
                          <div className="kiri-user">
                          <div className="tittle-form" style={{ marginBottom: '12%' }}>
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
                                  <select name="uploader" value={formData.uploader} onChange={handleInputChange}>
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
                          <input type="date" name="upload_date" value={formData.upload_date} onChange={handleInputChange} />
                          </div>
                      </div>

                      <div className="miau8">
                        <div className="tittle-form-8">
                            <p>Description</p>
                        </div>
                        <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
                    </div>

                      <div className="tambah-doc">
                          <button type="submit">UPDATE</button>
                      </div>
                  </form>
              </div>
              <div className="exel-form-doc">
                  <div className="exel-content-doc">
                   <img src={gambardoc} alt="logo" />
                      <div className="exel-des-doc">
                          <p>Upload Dokument</p>
                          <span>bisa lebih dari satu dokumen</span>
                          <div className="group-button">
                          <div className="file-input-container">
                                <label htmlFor="file-upload" className="label-file"  style={{ marginLeft: '45%', backgroundColor: '#597CB1',  alignItems: 'center', color:'white', fontWeight: '500'}}>Upload</label>
                                <input id="file-upload" type="file" name="document_file" onChange={handleFileChange} />
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

export default Update_doc;

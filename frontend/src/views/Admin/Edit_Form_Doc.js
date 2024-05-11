import React, { useState, useEffect, useContext } from 'react';
<<<<<<< HEAD
import { useParams, useHistory } from 'react-router-dom';
import '../../Css/form_edit_doc.css';
import { useDocumentContext } from './../../context/DocumentContext';
import { DocumentProvider } from './../../context/DocumentContext';

import tbhfile from '../../assets/img/tbhfile.png'
import docu from '../../assets/img/Docu.png'

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';

function Edit_doc() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Lakukan apa pun yang perlu dilakukan dengan file di sini
            // Contoh: menyimpan file, memprosesnya, dll.
            // Misalnya:
            setSelectedFile({
                name: file.name,
                content: `File ${file.name} selected.`
            });
        } else {
            setSelectedFile(null);
        }
    };

    return (
        <div>
             <Sidebar />
            <Navbar />
        <div className="upload-doc" id="upload-doc">
            <label htmlFor="file-input">
            <img src={tbhfile} alt="logo" />
                <p id="file-text">Add file <span>or drop files here</span></p>
            </label>
            <input id="file-input" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
        {selectedFile && (
            <div id="file-preview">
                <p>File Preview:</p>
                <div id="preview-container" dangerouslySetInnerHTML={{ __html: selectedFile.content }}></div>
            </div>
        )}

        <div className="exel-form">
            <div className="tiitle-doc">
                <div className="add-doc-kanan">
                    <div className="icon-docu">
                    <img src={docu} alt="logo" /> 
                    </div>
                    <div className="kiri-title-doc">
                        DOCUMENT NAME:
                    </div>
                </div>
            </div>
            <div className="p-judul-doc">
                <p>Di Unggah pada </p>
            </div>

            <div className="miau-container">
                <div className="miau4">
                    <div className="kiri-user">
                        <div className="tittle-form">
                            <p> Pengunggah </p>
                        </div>
                        <div className="input-form">
                            <input type="text" value="" placeholder="Yahahaha" />
                        </div>
                    </div>
                    <div className="kanan-user">
                        <div className="tittle-form">
                            <p>Kategori </p>
                        </div>
                        <div className="input-form">
                            <input type="text" value="" placeholder="Yahahaha" />
                        </div>
                    </div>
                </div>

                <div className="miau5">
                    <div className="tittle-form-email-doc">
                        <p>Projek</p>
                    </div>
                    <div className="input-form-email">
                        <input type="email" value="" placeholder="Yahahhaha" />
                    </div>

                    <div className="tittle-form-email-doc">
                        <p>Deskrripsi</p>
                    </div>
                    <div className="input-form-email">
                        <textarea name="note" rows="4"></textarea>
                    </div>

                    <div className="btn-edit-doc">
                        <button>EDIT</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Edit_doc;
=======
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useDocumentContext } from './../../context/DocumentContext';
import AuthContext from '../../context/AuthContext';
import '../../Css/form_edit_doc.css';
import Swal from 'sweetalert2';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpop from '../../assets/img/popular.png';
import gambardoc from '../../assets/img/gambardoc.png';
import gambarup from '../../assets/img/icon_up.png';

import tbhfile from '../../images/doc/tbhfile.png'
import docu from '../../images/doc/Docu.png'


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
    'laporan',
    'project',
    'user',
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

        const usersResponse = await axios.get('http://localhost:8000/api/users/tambah/', {
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
          document_file: '', // No need to set document_file here
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

  // const handleFileChange = (e) => {
  //   // No need to directly set formData.document_file here
  //   // We handle adding the file to FormData in handleSubmit
  //   setFormData({ ...formData, document_file: e.target.files[0] });
  // };

  const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // Lakukan apa pun yang perlu dilakukan dengan file di sini
        // Contoh: menyimpan file, memprosesnya, dll.
        // Misalnya:
        setSelectedFile({
            name: file.name,
            content: `File ${file.name} selected.` // Perbaikan disini
        });
    } else {
        setSelectedFile(null);
    }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const confirmed = await confirmBeforeSubmit();
        if (!confirmed) {
            return;
      }

      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
  
      const formDataForUpload = new FormData();
  
      // Add all fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        formDataForUpload.append(key, value);
      });
  
      // Add new file if present
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
     <form onSubmit={handleSubmit}>
 <div className="upload-doc" id="upload-doc">
     <label htmlFor="file-input">
     <img src={tbhfile} alt="logo" />
         <p id="file-text">Add file <span>or drop files here</span></p>
     </label>
     <input id="file-input" type="file" name="document_file" style={{ display: 'none' }} onChange={handleFileChange} />
 </div>
 {selectedFile && (
     <div id="file-preview">
         <p>File Preview:</p>
         <div id="preview-container" dangerouslySetInnerHTML={{ __html: selectedFile.content }}></div>
     </div>
 )}

 <div className="exel-form">
     <div className="tiitle-doc">
         <div className="add-doc-kanan">
             <div className="icon-docu">
             <img src={docu} alt="logo" /> 
             </div>
             <div className="kiri-title-doc">
                 DOCUMENT NAME : {formData.name} 
             </div>
         </div>
     </div>
     <div className="p-judul-doc">
         <p>Di Unggah pada {formData.upload_date} </p>
     </div>

     <div className="miau-container">
         <div className="miau4">
             <div className="kiri-user">
                 <div className="tittle-form">
                     <p> Pengunggah </p>
                 </div>
                 <div className="input-form-select">
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
             <div className="kanan-user">
                 <div className="tittle-form">
                     <p>Kategori </p>
                 </div>
                 <div className="input-form-select">
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
             <div className="tittle-form-email-doc">
                 <p>Projek</p>
             </div>
             <div className="select-container-edit">
                                  <select name="project" value={formData.project} onChange={handleInputChange}>
                                      <option value="">Project</option>
                                      {projects.map((project) => (
                                          <option key={project.id} value={project.id}>
                                              {project.name}
                                          </option>
                                      ))}
                                  </select>
                              </div>

             <div className="tittle-form-email-doc">
                 <p>Deskripsi</p>
             </div>
             <div style={{ marginLeft: '0'}}>
                 <textarea  name="description" value={formData.description} onChange={handleInputChange} rows="4"></textarea>
             </div>

             <div className="btn-edit-doc">
                 <button type="submit">EDIT</button>
             </div>
         </div>
     </div>
 </div>
 </form>
</div>

    );
}

export default Update_doc;
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced

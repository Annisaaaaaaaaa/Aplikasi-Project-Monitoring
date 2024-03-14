import React, { useState } from 'react';
import '../../Css/add_doc.css';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpop from '../../assets/img/popular.png';
import gambardoc from '../../assets/img/gambardoc.png';
import gambarup from '../../assets/img/icon_up.png';

function Add_doc() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState(''); // Perubahan di sini
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState(null); // Tambahkan state untuk menyimpan file yang dipilih

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleRoleChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setRoles([...roles, value]); // Tambahkan role ke dalam array roles
        } else {
            setRoles(roles.filter(role => role !== value)); // Hapus role dari array roles
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Penanganan form submission
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        // Lakukan sesuatu dengan file yang diunggah, misalnya tampilkan nama file
        document.getElementById('file-name').innerText = file.name;
        // Atau simpan file di state
        setSelectedFile(file);
    };

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
                        CREATE DOCUMENT
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
                              <input type="email"  onChange={(e) => handleInputChange(e, setEmail)} placeholder="SCOP Projek A" />
                          </div>
                      </div>

                      <div className="miau4">
                          <div className="kiri-user">
                              <div className="tittle-form">
                              Project 
                              </div>
                              <div className="input-form">
                                  <input type="text" onChange={(e) => handleInputChange(e, setFirstName)} placeholder="Ex. PT Bongkar Turet" />
                              </div>
                          </div>
                          <div className="kanan-user">
                              <div className="tittle-form">
                                  Uploader 
                              </div>
                              <div className="input-form">
                                  <input type="text"  onChange={(e) => handleInputChange(e, setLastName)} placeholder="Ex. PT Bongkar Turet" />
                              </div>
                          </div>
                      </div>

                      <div className="miau5">
                          <div className="tittle-form-email">
                          Category
                          </div>
                          <div className="input-form-email">
                              <input type="email"  onChange={(e) => handleInputChange(e, setEmail)} placeholder="Add Cetegory" />
                          </div>
                      </div>

                      <div className="miau8">
                        <div className="tittle-form-8">
                            <p>Description</p>
                        </div>
                        <textarea 
                            name="note" 
                            id="" 
                            rows="4" 
                        />
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
                          <span>bisa lebih dari satu dokumen</span>
                          <div className="group-button">
                          <div className="file-input-container">
                                <label htmlFor="file-upload" className="label-file"  style={{ marginLeft: '45%', backgroundColor: '#597CB1',  alignItems: 'center', color:'white', fontWeight: '500'}}>Upload</label>
                                <input 
                                    id="file-upload" 
                                    type="file" 
                                    onChange={handleFileInputChange} 
                                />
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

export default Add_doc;

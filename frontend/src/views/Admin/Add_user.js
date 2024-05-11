import React, { useState } from 'react';
import '../../Css/add_user.css';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpop from '../../assets/img/popular.png';
import gambarexel from '../../assets/img/exel3D.png';

function Add_user() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState(''); // Perubahan di sini
    const [password, setPassword] = useState('');

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
                          CREATE USER ACCOUNT
                      </div>
                  </div>
              </div>
              <p>Masukkan Informasi Umum. Bagian Profile diisi oleh User.</p>

              <div className="miau-container">
                  <form onSubmit={handleSubmit}>
                      <div className="miau4">
                          <div className="kiri-user">
                              <div className="tittle-form">
                                First Name 
                              </div>
                              <div className="input-form">
                                  <input type="text" value={firstName} onChange={(e) => handleInputChange(e, setFirstName)} placeholder="Ex. PT Bongkar Turet" />
                              </div>
                          </div>
                          <div className="kanan-user">
                              <div className="tittle-form">
                                  Last Name 
                              </div>
                              <div className="input-form">
                                  <input type="text" value={lastName} onChange={(e) => handleInputChange(e, setLastName)} placeholder="Ex. PT Bongkar Turet" />
                              </div>
                          </div>
                      </div>

                     
                          <div className="tittle-form-email">
                              Email
                          </div>
                          <div className="input-form-email">
                              <input type="email" value={email} onChange={(e) => handleInputChange(e, setEmail)} placeholder="Ex. PT Bongkar Turet" />
                  
                      </div>
                      <div className="tittle-form">
                          Role
                      </div>
                      <section>
                        <div className="tile">
                            <input className="checkbox-1" type="checkbox" name="role" id="engineer" value="ENGINEER" checked={roles.includes('ENGINEER')} onChange={handleRoleChange} />
                            <label htmlFor="engineer">
                            <h4>ENGINEER</h4>
                            </label>
                        </div>
                        <div className="tile">
                            <input className="checkbox-2" type="checkbox" name="role" id="sales" value="SALES" checked={roles.includes('SALES')} onChange={handleRoleChange} />
                            <label htmlFor="sales">
                            <h4>SALES</h4>
                            </label>
                        </div>
                        <div className="tile">
                            <input className="checkbox-3" type="checkbox" name="role" id="pm" value="PM" checked={roles.includes('PM')} onChange={handleRoleChange} />
                            <label htmlFor="pm">
                            <h4>PM</h4>
                            </label>
                        </div>
                        <div className="tile">
                            <input className="checkbox-4" type="checkbox" name="role" id="admin" value="ADMIN" checked={roles.includes('ADMIN')} onChange={handleRoleChange} />
                            <label htmlFor="admin">
                            <h4>ADMIN</h4>
                            </label>
                        </div>
                </section>


                      <div className="miau6">
                          <div className="tittle-form-email">
                            Username
                          </div>
                          <div className="input-form-email">
                          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Ex. PT Bongkar Turet" />
                          </div>
                      </div>

                      <div className="miau7">
                          <div className="tittle-form-email">
                              Password
                          </div>
                          <div className="input-form-email">
                          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ex. PT Bongkar Turet" />
                          </div>
                      </div>

                      <div className="tambah-user">
                          <button type="submit">CREATE</button>
                      </div>
                  </form>
              </div>
              <div className="exel-form-user">
                  <div className="exel-content-user">
                    <img src={gambarexel} alt="logo" />
                      <div className="exel-des-user">
                          <p>Atau Import Informasi Dari Excel</p>
                          <span>dengan klik button berikut</span>
                          <div className="group-button">
                            <button style={{ marginLeft: '30%' }}>Import</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
       </div>
    );
}

export default Add_user;

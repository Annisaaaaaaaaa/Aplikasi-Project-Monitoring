import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext'; 
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import '../../Css/addAktivitas.css'; 

import arrow from '../../assets/img/arrow.png';
import inter from '../../assets/img/intern.png';
import lingkaran from '../../assets/img/lingkaran.png';

const AddAktivitas = () => {
    const history = useHistory();
    const { projectId } = useParams();
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [statusOptions] = useState(['On Going', 'Overdue', 'Waiting', 'Done']);
    const [formErrors, setFormErrors] = useState({});
    
    const [formData, setFormData] = useState({
        engineer_projects: [
            {
                engineer: "",
                presentase_beban_kerja: '',
                status: ""
            }
        ],
        external_engineer_projects: []
    });

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const token = authContext.authTokens ? authContext.authTokens.access : null;
                if (!token) {
                    throw new Error('Authentication token is missing');
                }
  
                const usersResponse = await axios.get('http://localhost:8000/api/user/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(usersResponse.data);
  
                const response = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const projectData = response.data;
  
                setFormData({
                    engineer_projects: projectData.engineer_projects
                });
            } catch (error) {
                console.error('Error fetching project data:', error);
                toast.error('Failed to fetch project data. Please try again.');
            }
        };
  
        fetchProjectData();
    }, [projectId, authContext.authTokens]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = authContext.authTokens ? authContext.authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }
            setLoading(true);
  
            const previousDataResponse = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const previousData = previousDataResponse.data;
  
            const updatedData = {
                ...previousData,
                engineer_projects: formData.engineer_projects,
            };
  
            const result = await axios.put(`http://localhost:8000/api/v1/project/edit/${projectId}/`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            setLoading(false);
            console.log('Server response:', result.data); 
            toast.success('Project berhasil diperbarui');
            history.push('/project-admin'); 
  
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                console.log('Server error response:', errorData); 
                setFormErrors(errorData);
            } else {
                console.error('Error updating project:', error.message);
                toast.error('Gagal memperbarui proyek. Silakan coba lagi.');
            }
        }
    };
    
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedEngineerProjects = [...formData.engineer_projects];
        updatedEngineerProjects[index][name] = value;
        setFormData({ ...formData, engineer_projects: updatedEngineerProjects });
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedExternalEngineerProjects = [...formData.external_engineer_projects];
        updatedExternalEngineerProjects[index][name] = value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            external_engineer_projects: updatedExternalEngineerProjects,
        }));
    };

    const MAX_FORMS_PER_ROW = 3;

    const handleAddEngineer = () => {
        if (formData.engineer_projects.length % MAX_FORMS_PER_ROW === 0) {
            // Jika jumlah form di baris ini sudah mencapai batas, tambahkan form baru di bawahnya
            setFormData((prevFormData) => ({
                ...prevFormData,
                engineer_projects: [
                    ...prevFormData.engineer_projects,
                    { engineer: '', presentase_beban_kerja: '', status: '' }
                ]
            }));
        } else {
            // Jika jumlah form di baris ini belum mencapai batas, tambahkan form baru di baris yang sama
            setFormData((prevFormData) => ({
                ...prevFormData,
                engineer_projects: [
                    ...prevFormData.engineer_projects,
                    { engineer: '', presentase_beban_kerja: '', status: '' }
                ]
            }));
        }
    };
    
    const handleAddEngineerExternal = () => {
      if (formData.external_engineer_projects.length % MAX_FORMS_PER_ROW === 0) {
          // Jika jumlah form di baris ini sudah mencapai batas, tambahkan form baru di bawahnya
          setFormData((prevFormData) => ({
              ...prevFormData,
              external_engineer_projects: [
                  ...prevFormData.external_engineer_projects,
                  { engineer: '', presentase_beban_kerja: '', status: '' }
              ]
          }));
      } else {
          // Jika jumlah form di baris ini belum mencapai batas, tambahkan form baru di baris yang sama
          setFormData((prevFormData) => ({
              ...prevFormData,
              external_engineer_projects: [
                  ...prevFormData.external_engineer_projects,
                  { engineer: '', presentase_beban_kerja: '', status: '' }
              ]
          }));
      }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    // Logic for next step, if any
    history.push('/project-final');
};
    return (
        <div>
            <Sidebar />
                <Navbar />
             <div className="form-aktivitas-container">
            <div className="form-aktivitas">
                {/* <img src="../Img/Google Code.png" alt="Google Code"/> */}
                <h2>ADD ACTIVITY PROJECT.</h2>
                <h1>Masukkan data terkait pekerjaan tiap Project.</h1>

                <div className="back">
                    <button> <img src={arrow} alt="Arrow"/>Back</button>
                </div>

                <div className="form-container-aktivitas">
                    <div className="form-atas-aktivitas">
                        <div className="judul-form-atas">
                            Name
                        </div>
                        <div className="input-form-atas">
                            <input type="email" value="" placeholder="-" />
                        </div>
                    </div>

                    <div className="form-atas-aktivitas">
                        <div className="judul-form-atas">
                            Projek
                        </div>
                        <div className="input-form-atas">
                            <input type="email" value="" placeholder="Ini seharusnya dropdown" />
                        </div>
                    </div>

                    <div className="form-tengah-aktivitas">
                        <div className="container-form-tengah">
                            <div className="judul-form-tengah">
                                Project Manager
                            </div>
                            <div className="input-form-tengah">
                                <input type="email" value="" placeholder="Ini seharusnya dropdown" />
                            </div>

                            <div className="judul-form-tengah2">
                                Status
                            </div>
                            <div className="input-form-tengah">
                                <input type="email" value="" placeholder="Ini seharusnya dropdown" />
                            </div>
                        </div>
                    </div>

                    <div className="container-form-internal-aktivitas" id="form-container">
                        <div className="kanan-internal-aktivitas">
                            <p> Date Start </p>
                            <input type="date" value="" placeholder="Nama Engineer" />
                        </div>
                        <div className="kanan-internal-aktivitas">
                            <p> Date Estimated </p>
                            <input type="date" value="" placeholder="Nama Engineer" />
                        </div>

                        <div className="kanan-internal-aktivitas">
                            <p> Date FInish </p>
                            <input type="date" value="" placeholder="Nama Engineer" />
                        </div>
                    </div>

                    <div className="miau5-detailing-aktivitas">
                            <div className="tittle-form">
                                    <p>Note</p>
                            </div>
                            <textarea name="detail"/>
                        </div>
                        <div className="tambah-aktivitas">
                        <button onClick={handleSubmit}>
                            {/* <img src={add} alt="Add" /> */}
                            SAVE
                        </button>
                    </div>
                        
                </div>
                <div className="form-initiation-kanan2-aktivitas">
                <div className="miau5-initial-aktivitas">
                                <div className="tengah-eksternal-aktivitas2">
                                  <p> Beban Kerja Aktivitas Project </p>
                                  <div className="input-container">
                                      <input type="text" name="presentase_beban_kerja"  />
                                      <span className="percentage">/100%</span>
                                  </div>
                              </div>
                                </div>
                {/* <div className="form-initiation-kanan-aktivitas"> */}
                        </div>
                        <div className="form-initiation-kanan-aktivitas">
                        <div className="lingkaran-aktivitas">
                                <img src={lingkaran}  alt="Lingkaran" />
                            </div>
                            <div className="miau-container-initial-aktivitas">
                               
                            </div>
                         </div>
            
                </div>
                <div className="bg-form-atas-kanan-aktivitas">
                    <p>WORKLOAD INFO.</p>
                </div>

                <div className="internal-engineer-aktivitas">
                    <div className="container-judul-internal">
                        <div className="img-intern">
                            <img src={inter} alt="Internal" />
                        </div>
                        <div className="judul-intern">
                            <h1>INTERNAL ENGINEER.</h1>
                            <p>
                                Tambah Engineer pihak Internal oleh{' '}
                                <span>Project Manager.</span>
                            </p>
                        </div>
                    </div>
                    <div className="back-execution">
                        <button>
                            <img src={arrow} alt="Back" />Back
                        </button>
                    </div>
                    <div className="container-form-internal" id="form-container">
                    {formData.engineer_projects.map((engineer, index) => (
                        <div className="form-row" key={index}>
                            <div className="kanan-internal">
                                <p> Nama Engineer </p>
                                <select name="engineer" value={engineer.engineer} onChange={(e) => handleChange(e, index)}>
                                    <option value="">Nama Engineer</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.email}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="tengah-internal">
                                <p> Workload </p>
                                <div className="input-container">
                                    <input type="text" name="presentase_beban_kerja" value={engineer.presentase_beban_kerja} onChange={(e) => handleChange(e, index)} />
                                    <span className="percentage">/100%</span>
                                </div>
                            </div>
                            <div className="kiri-internal">
                                <p> Status </p>
                                <select name="status" className="status-dropdown" value={engineer.status} onChange={(e) => handleChange(e, index)}>
                                    {statusOptions.map((status, index) => (
                                        <option key={index} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="tambah-engineer">
                        <button onClick={handleAddEngineer}>
                            Tambah Engineer
                        </button>
                    </div>
                </div>

                <div className="eksternal-engineer-aktivitas">
                    <div className="container-judul-internal">
                        <div className="img-intern">
                            <img src={inter} alt="Internal" />
                        </div>
                        <div className="judul-intern">
                            <h1>EKSTERNAL ENGINEER.</h1>
                            <p>
                                Tambah Engineer pihak Eksternal oleh{' '}
                                <span>Project Manager.</span>
                            </p>
                        </div>
                    </div>
                    <div className="container-form-internal" id="form-container-external">
                      {formData.external_engineer_projects.map((engineer, index) => (
                          <div className="form-row" key={index}>
                              <div className="kanan-eksternal">
                                  <p> Nama Engineer </p>
                                  <div className="input-form-kanan-detailing">
                                      <input type="text" name="engineer" value={engineer.engineer} placeholder="Engineer Eksternal" onChange={(e) => handleInputChange(e, index)} />
                                  </div>
                              </div>
                              <div className="tengah-eksternal">
                                  <p> Workload </p>
                                  <div className="input-container">
                                      <input type="text" name="presentase_beban_kerja" value={engineer.presentase_beban_kerja} onChange={(e) => handleInputChange(e, index)} />
                                      <span className="percentage">/100%</span>
                                  </div>
                              </div>
                              <div className="kiri-eksternal">
                                  <p> Status </p>
                                  <select name="status" className="status-dropdown" value={engineer.status} onChange={(e) => handleInputChange(e, index)}>
                                      {statusOptions.map((status, index) => (
                                          <option key={index} value={status}>
                                              {status}
                                          </option>
                                      ))}
                                  </select>
                              </div>
                          </div>
                      ))}
                  </div>
                  <div className="tambah-engineer" id="tambah-eksternal-engineer">
                      <button onClick={handleAddEngineerExternal}>
                          Tambah Engineer
                      </button>
                  </div>

            </div>
                
        </div>
        </div>
       
    );
}

export default AddAktivitas;

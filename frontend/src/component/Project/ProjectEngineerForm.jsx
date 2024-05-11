<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
=======
// import React, { useState, useEffect, useContext } from 'react'; 
// import axios from 'axios';
// import { useHistory, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';
// import AuthContext from './../../context/AuthContext'; 

// const EditProjectForm = ({ match }) => {
//   const history = useHistory();
//   const { projectId } = useParams();
//   const authContext = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [statusOptions] = useState(['On Going', 'Overdue', 'Waiting', 'Done']);
//   const [formErrors, setFormErrors] = useState({});
  
//   const [formData, setFormData] = useState({
//     engineer_projects: [
//         {
//             engineer: "",
//             presentase_beban_kerja: '',
//             status: ""
//         }
//     ]
//   });

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         const token = authContext.authTokens ? authContext.authTokens.access : null;
//         if (!token) {
//           throw new Error('Authentication token is missing');
//         }

//         const usersResponse = await axios.get('http://localhost:8000/api/users/tambah', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(usersResponse.data);

//         const response = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         const projectData = response.data;

//         setFormData({
//           engineer_projects: projectData.engineer_projects
//         });
//       } catch (error) {
//         console.error('Error fetching project data:', error);
//         toast.error('Failed to fetch project data. Please try again.');
//       }
//     };

//     fetchProjectData();
//   },[projectId, authContext.authTokens]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Kirim data gabungan ke server untuk pembaruan
//       const token = authContext.authTokens ? authContext.authTokens.access : null;
//       if (!token) {
//         throw new Error('Authentication token is missing');
//       }
//       setLoading(true);

//       // Ambil data sebelumnya dari server
//       const previousDataResponse = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const previousData = previousDataResponse.data;

//       // Gabungkan data sebelumnya dengan data baru (hanya kolom engineer yang diubah)
//       const updatedData = {
//         ...previousData,
//         engineer_projects: formData.engineer_projects,
//       };

//       const result = await axios.put(`http://localhost:8000/api/v1/project/edit/${projectId}/`, updatedData, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
  
//       setLoading(false);
//       console.log('Server response:', result.data); 
//       toast.success('Project berhasil diperbarui');
//       history.push('/project-admin'); 

//     } catch (error) {
//       setLoading(false);
//       if (error.response && error.response.data) {
//         const errorData = error.response.data;
//         console.log('Server error response:', errorData); 
//         setFormErrors(errorData);
//       } else {
//         console.error('Error updating project:', error.message);
//         toast.error('Gagal memperbarui proyek. Silakan coba lagi.');
//       }
//     }
//   };
  

//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedEngineerProjects = [...formData.engineer_projects];
//     updatedEngineerProjects[index][name] = value;
//     setFormData({ ...formData, engineer_projects: updatedEngineerProjects });
//   };

//   const handleAddEngineer = () => {
//     setFormData({
//       ...formData,
//       engineer_projects: [...formData.engineer_projects, { engineer: '', presentase_beban_kerja: '', status: '' }]
//     });
//   };

//   const handleRemoveRow = (index, type) => {
//     const newData = [...formData[type]];
//     newData.splice(index, 1);
//     setFormData({ ...formData, [type]: newData });
//   };

//   return (
//     <div>
//       <h2>Edit Project - Engineer Details</h2>
//       <form onSubmit={handleSubmit}>
//         {formData.engineer_projects.map((engineer, index) => (
//           <div key={index}>
//                     <label>
//           Engineer:
//           <select name="engineer"  value={engineer.engineer} onChange={(e) => handleChange(e, index)}>
//             <option value="">Select Engineer</option>
//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.email}
//               </option>
//             ))}
//           </select>
//         </label>
          
//            <br />
//             <label>Workload Percentage:</label>
//             <input type="number" name="presentase_beban_kerja" value={engineer.presentase_beban_kerja} onChange={(e) => handleChange(e, index)} />
//             <br />
//             <label>
//           Status:
//           <select name="status" value={engineer.status} onChange={(e) => handleChange(e, index)}>
//             <option value="">Select Status</option>
//             {statusOptions.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </label>
//             <br />
//           </div>
//         ))}
//         <button type="button" onClick={handleAddEngineer}>Tambah Engineer</button>
//         <br />
//         <button type="submit">Update Project</button>
//       </form>
//     </div>
//   );
// };

// export default EditProjectForm;

import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import '../../Css/execution.css';
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext'; 

import Sidebar from '../sidebar';
import Navbar from '../header';
import step4 from '../../assets/img/step4.png';
import add from '../../assets/img/Add.png';
import inter from '../../assets/img/intern.png';
import orang from '../../assets/img/orang.png';
import arrow from '../../assets/img/arrow.png';
<<<<<<< HEAD
import '../../Css/execution.css';

function ProjectExecution() {
=======

const EditProjectForm = ({ match }) => {
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
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
  
<<<<<<< HEAD
                const usersResponse = await axios.get('http://localhost:8000/api/user/', {
=======
                const usersResponse = await axios.get('http://localhost:8000/api/users/tambah', {
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
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
<<<<<<< HEAD
                    Authorization: `Bearer ${token}`,
=======
                    Authorization:  `Bearer ${token}`,
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
                },
            });
            const previousData = previousDataResponse.data;
  
            const updatedData = {
                ...previousData,
                engineer_projects: formData.engineer_projects,
            };
  
            const result = await axios.put(`http://localhost:8000/api/v1/project/edit/${projectId}/`, updatedData, {
                headers: {
<<<<<<< HEAD
                    Authorization: `Bearer ${token}`
=======
                    Authorization:  `Bearer ${token}`
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
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
            <div className="panjang">
                <img src={step4} width="85%" alt="Step 4" />
            </div>
            <div className="container-execution">
                <div className="samping-execution">
                    <img src={orang} alt="Orang" />
                    <h1>ADD PROJECT ENGINEER.</h1>
<<<<<<< HEAD
                    <p>
                        Tambahkan Engineer Internal dan Eksternal beserta{' '}
                        <span> presentase beban kerja </span> yang diberi.
                    </p>
=======
                    {/* <p>
                        Tambahkan Engineer Internal dan Eksternal beserta{' '}
                        <span> presentase beban kerja </span> yang diberi.
                    </p> */}
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
                    <div className="tambah-execution">
                        <button onClick={handleSubmit}>
                            <img src={add} alt="Add" />SAVE
                        </button>
<<<<<<< HEAD
                        <button type="button" onClick={handleNextStep}>Next Step</button>
=======
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
                    </div>
                </div>

                <div className="internal-engineer">
                    <div className="container-judul-internal">
                        <div className="img-intern">
                            <img src={inter} alt="Internal" />
                        </div>
                        <div className="judul-intern">
                            <h1>INTERNAL ENGINEER.</h1>
<<<<<<< HEAD
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
=======
                            {/* <p>
                                Tambah Engineer pihak Internal oleh{' '}
                                <span>Project Manager.</span>
                            </p> */}
                        </div>
                    </div>
                    <div className="back-execution">
                        {/* <button>
                            <img src={arrow} alt="Back" />Back
                        </button> */}
                    </div>
                    <div className="container-form-internal" id="form-container">
                    {formData.engineer_projects && formData.engineer_projects.map((engineer, index) => (
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
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

                <div className="eksternal-engineer">
                    <div className="container-judul-internal">
                        <div className="img-intern">
                            <img src={inter} alt="Internal" />
                        </div>
                        <div className="judul-intern">
                            <h1>EKSTERNAL ENGINEER.</h1>
<<<<<<< HEAD
                            <p>
                                Tambah Engineer pihak Eksternal oleh{' '}
                                <span>Project Manager.</span>
                            </p>
                        </div>
                    </div>
                    <div className="container-form-internal" id="form-container-external">
                      {formData.external_engineer_projects.map((engineer, index) => (
=======
                            {/* <p>
                                Tambah Engineer pihak Eksternal oleh{' '}
                                <span>Project Manager.</span>
                            </p> */}
                        </div>
                    </div>
                    <div className="container-form-internal" id="form-container-external">
                      {formData.external_engineer_projects && formData.external_engineer_projects.map((engineer, index) => (
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
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

<<<<<<< HEAD
export default ProjectExecution;
=======
export default EditProjectForm;
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced

<<<<<<< HEAD
=======
// import React, { useState, useEffect, useContext } from 'react'; 
// import axios from 'axios';
// import { useHistory, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';
// import AuthContext from './../../context/AuthContext'; 

// const EditProjectInform = ({ match }) => {
//   const history = useHistory();
//   const { projectId } = useParams();
//   const authContext = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [statusOptions] = useState(['On Going', 'Overdue', 'Waiting', 'Done']);
//   const [priorityOptions] = useState(['tinggi', 'sedang', 'rendah']);
//   const [formErrors, setFormErrors] = useState({});
  
//   const [formData, setFormData] = useState({
//     am: '',
//     pic: '',
//     pm: '',
//     status: '',
//     priority: '',
//     remarks: '',
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
//           am: projectData.am,
//           pic: projectData.pic,
//           pm: projectData.pm,
//           status: projectData.status,
//           priority: projectData.priority,
//           remarks: projectData.remarks,      
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
//       const token = authContext.authTokens ? authContext.authTokens.access : null;
//       if (!token) {
//         throw new Error('Authentication token is missing');
//       }
//       setLoading(true);

//       const previousDataResponse = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const previousData = previousDataResponse.data;

//       const updatedData = {
//         ...previousData,
//         am: formData.am,
//         pic: formData.pic,
//         pm: formData.pm,
//         status: formData.status,
//         priority: formData.priority,
//         remarks: formData.remarks,      
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
  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };


//   return (
//     <div>
//       <h2>Edit Project - Project Inform</h2>
//       <form onSubmit={handleSubmit}>
//       <label>
//           PIC (Person In Charge):
//           <select name="pic" value={formData.pic} onChange={handleInputChange}>
//             <option value="">Select PIC</option>
//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.email}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           AM (Account Manager):
//           <select name="am" value={formData.am} onChange={handleInputChange}>
//             <option value="">Select AM</option>
//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.email}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           PM (Project Manager):
//           <select name="pm" value={formData.pm} onChange={handleInputChange}>
//             <option value="">Select PM</option>
//             {users.map((user) => (
//               <option key={user.id} value={user.id}>
//                 {user.email}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Status:
//           <select name="status" value={formData.status} onChange={handleInputChange}>
//             <option value="">Select Status</option>
//             {statusOptions.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Priority:
//           <select name="priority" value={formData.priority} onChange={handleInputChange}>
//             <option value="">Select Priority</option>
//             {priorityOptions.map((priority) => (
//               <option key={priority} value={priority}>
//                 {priority}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Remarks:
//           <input type="text" name="remarks" value={formData.remarks} onChange={handleInputChange} />
//         </label>

//         <button type="submit">Update Project</button>
//       </form>
//     </div>
//   );
// };

// export default EditProjectInform;

>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
import React, { useState, useEffect, useContext } from 'react'; 
import Sidebar from '../sidebar';
import Navbar from '../header';
import step2 from '../../assets/img/step2.png';
import arrow from '../../assets/img/arrow.png';

import '../../Css/planning.css';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
<<<<<<< HEAD
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext'; 

const ProjectPlanning = () => {
=======
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext'; 

const EditProjectInform = ({ handleNextStep }) => {
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
  const history = useHistory();
  const { projectId } = useParams();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [statusOptions] = useState(['On Going', 'Overdue', 'Waiting', 'Done']);
  const [priorityOptions] = useState(['tinggi', 'sedang', 'rendah']);
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    am: '',
    pic: '',
    pm: '',
    status: '',
    priority: '',
    remarks: '',
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
          am: projectData.am,
          pic: projectData.pic,
          pm: projectData.pm,
          status: projectData.status,
          priority: projectData.priority,
          remarks: projectData.remarks,      
        });
      } catch (error) {
        console.error('Error fetching project data:', error);
        toast.error('Failed to fetch project data. Please try again.');
      }
    };

    fetchProjectData();
  },[projectId, authContext.authTokens]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data gabungan ke server untuk pembaruan
      const token = authContext.authTokens ? authContext.authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      setLoading(true);

      // Ambil data sebelumnya dari server
      const previousDataResponse = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const previousData = previousDataResponse.data;

      // Gabungkan data sebelumnya dengan data baru (hanya kolom engineer yang diubah)
      const updatedData = {
        ...previousData,
        am: formData.am,
        pic: formData.pic,
        pm: formData.pm,
        status: formData.status,
        priority: formData.priority,
        remarks: formData.remarks,      
      };

      const result = await axios.put(`http://localhost:8000/api/v1/project/edit/${projectId}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setLoading(false);
      console.log('Server response:', result.data); 
      toast.success('Project berhasil diperbarui');
<<<<<<< HEAD
      history.push('/project-admin'); 

=======
      // history.push('/project-admin'); 
      handleNextStep();
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
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
  
<<<<<<< HEAD
  const handleNextStep = (e) => {
    e.preventDefault();
    // Logic for next step, if any
    history.push('/project-detail');
};
=======
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className="panjang">
        <img src={step2} style={{ width: '85%' }} alt="Step" />
      </div>

      <div className="form-initiation-container">
        <div className="form-initiation">
          <h2>ADD PROJECT.</h2>
<<<<<<< HEAD
          <h1>Data dibawah dapat diisi oleh Sales.</h1>
          <div className="back">
            <button> <img src={arrow} alt="Arrow" />Back</button>
=======
          {/* <h1>Data dibawah dapat diisi oleh Sales.</h1> */}
          <div className="back">
            {/* <button> <img src={arrow} alt="Arrow" />Back</button> */}
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
          </div>
          <form onSubmit={handleSubmit}>
            <div className="miau-container-planning">
              <div className="miau5-planning">
                <div className="tittle-form-miau5">
                  <p>Person in Charge (PIC)</p>
                </div>
                <div className="input-form-miau5">
                  <select name="pic" value={formData.pic} onChange={handleInputChange}>
                    <option value="">Select PIC</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="miau5-planning">
                <div className="tittle-form-miau5">
                  <p>Account Manager (AM)</p>
                </div>
                <div className="input-form-miau5">
                  <select name="am" value={formData.am} onChange={handleInputChange}>
                    <option value="">Select AM</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="miau5-planning">
                <div className="tittle-form-miau5">
                  <p>Project Manager (PM)</p>
                </div>
                <div className="input-form-miau5">
                  <select name="pm" value={formData.pm} onChange={handleInputChange}>
                    <option value="">Select PM</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.email}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

<<<<<<< HEAD
              <div className="miau5-planning">
                <div className="tittle-form-miau5">
                  <p>End User</p>
                </div>
                <div className="input-form-miau5">
                  <input type="email" value="" placeholder="-" />
                </div>
              </div>
            </div>

            <div className="form-initiation-kanan2-planning">
              {/* <img src={com} style={{ width: '10%', position: 'relative', marginLeft: '70%', marginTop: '-15%' }} alt="Com" /> */}
=======
              
            </div>

            <div className="form-initiation-kanan2-planning">
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
              <div className="miau-container-planning">
                <div className="miau5-planning">
                  <div className="tittle-form-miau5">
                    <p>Status</p>
                  </div>
                  <div className="input-form-miau5">
                    <select name="status" value={formData.status} onChange={handleInputChange}>
                      <option value="">Select Status</option>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="miau5-planning">
                  <div className="tittle-form-miau5">
                    <p>Priority</p>
                  </div>
                  <div className="input-form-miau5">
                    <select name="priority" value={formData.priority} onChange={handleInputChange}>
                      <option value="">Select Priority</option>
                      {priorityOptions.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="miau5-planning">
                  <div className="tittle-form-miau5">
                    <p>Remarks</p>
                  </div>
                  <div className="input-form-miau9">
                    <input type="text" name="remarks" value={formData.remarks} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="tambah-initiation">
<<<<<<< HEAD
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <br />
                                <button type="button" onClick={handleNextStep}>Next Step</button>
                            </div>
              </div>
            </div>
            <div className="bg-form-atas-kanan-planning">
            <p>PROJECT INFO.</p>
          </div>
          </form>
        </div>
      </div>
=======
                {/* <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <br />
                                <button type="button" onClick={handleNextStep}>Next Step</button> */}
                  <button type="submit">Update Project</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-form-atas-kanan-planning">
        <p>PROJECT INFO.</p>
      </div>
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced
    </div>
  );
}

<<<<<<< HEAD
export default ProjectPlanning;
=======
export default EditProjectInform;
>>>>>>> 48b661b142f5356ee6610801967ed21892dddced

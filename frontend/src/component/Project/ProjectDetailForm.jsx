// import React, { useState, useEffect, useContext } from 'react'; 
// import axios from 'axios';
// import { useHistory, useParams } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';
// import AuthContext from './../../context/AuthContext'; 

// const EditProjectDetail = ({ match, handleNextStep }) => {
//   const history = useHistory();
//   const { projectId } = useParams();
//   const authContext = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
  
//   const [formData, setFormData] = useState({
//     start_date: '',
//     end_date: '',
//     sow: '',
//     oos: '',
//     detail: '',
//     weight: '',
//     type: '',
//     market_segment: '',
//     tech_use: '',
//     resiko: '',
//     beban_proyek: '',
//   });

//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         const token = authContext.authTokens ? authContext.authTokens.access : null;
//         if (!token) {
//           throw new Error('Authentication token is missing');
//         }

//         const response = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         const projectData = response.data;

//         setFormData({
//           start_date: projectData.start_date,
//           end_date: projectData.end_date,
//           sow: projectData.sow,
//           oos: projectData.oos,
//           detail: projectData.detail,
//           weight: projectData.weight,
//           type: projectData.type,
//           market_segment: projectData.market_segment,
//           tech_use: projectData.tech_use,
//           resiko: projectData.resiko,
//           beban_proyek: projectData.beban_proyek,    
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
//         start_date: formData.start_date,
//         end_date: formData.end_date,
//         sow: formData.sow,
//         oos: formData.oos,
//         detail: formData.detail,
//         weight: formData.weight,
//         type: formData.type,
//         market_segment: formData.market_segment,
//         tech_use: formData.tech_use,
//         resiko: formData.resiko,
//         beban_proyek: formData.beban_proyek,    
//       };

//       const result = await axios.put(`http://localhost:8000/api/v1/project/edit/${projectId}/`, updatedData, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
  
//       setLoading(false);
//       console.log('Server response:', result.data); 
//       toast.success('Project berhasil diperbarui');
//       // history.push('/project-admin'); 

//       handleNextStep();
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
//       <h2>Edit Project - Project Detail</h2>
//       <form onSubmit={handleSubmit}>
//       <label>
//           Project Load:
//           <input type="number" name="beban_proyek" value={formData.beban_proyek} onChange={handleInputChange} />
//         </label>
//         <label>
//           Type:
//           <input type="text" name="type" value={formData.type} onChange={handleInputChange} />
//         </label>
//         <label>
//           Market Segment:
//           <input type="text" name="market_segment" value={formData.market_segment} onChange={handleInputChange} />
//         </label>
//         <label>
//           Risk:
//           <input type="text" name="resiko" value={formData.resiko} onChange={handleInputChange} />
//         </label>
//         <label>
//           Tech Use:
//           <textarea type="text" name="tech_use" value={formData.tech_use} onChange={handleInputChange} ></textarea>
//         </label>

//         <label>
//           Start Date:
//           <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} />
//         </label>
//         <label>
//           End Date:
//           <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} />
//         </label>
//         <label>
//           SOW:
//           <input type="text" name="sow" value={formData.sow} onChange={handleInputChange} />
//         </label>
//         <label>
//           OOS:
//           <input type="text" name="oos" value={formData.oos} onChange={handleInputChange} />
//         </label>
//         <label>
//           Detail:
//           <textarea name="detail" value={formData.detail} onChange={handleInputChange} />
//         </label>
//         <button type="submit">Update Project</button>
//       </form>
//     </div>
//   );
// };

// export default EditProjectDetail;


import React, { useState, useEffect, useContext } from 'react'; 
import Sidebar from '../sidebar';
import Navbar from '../header';
import step3 from '../../assets/img/step3.png';
import lingkaran from '../../assets/img/lingkaran.png';
import arrow from '../../assets/img/arrow.png';
import add from '../../assets/img/Add.png';

import '../../Css/detail.css';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext'; 

const EditProjectDetail = ({ handleNextStep }) => {
    const history = useHistory();
  const { projectId } = useParams();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    sow: '',
    oos: '',
    detail: '',
    type: '',
    market_segment: '',
    tech_use: '',
    resiko: '',
    beban_proyek: '',
  });

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const response = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const projectData = response.data;

        setFormData({
          start_date: projectData.start_date,
          end_date: projectData.end_date,
          sow: projectData.sow,
          oos: projectData.oos,
          detail: projectData.detail,
          type: projectData.type,
          market_segment: projectData.market_segment,
          tech_use: projectData.tech_use,
          resiko: projectData.resiko,
          beban_proyek: projectData.beban_proyek,    
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
        start_date: formData.start_date,
        end_date: formData.end_date,
        sow: formData.sow,
        oos: formData.oos,
        detail: formData.detail,
        type: formData.type,
        market_segment: formData.market_segment,
        tech_use: formData.tech_use,
        resiko: formData.resiko,
        beban_proyek: formData.beban_proyek,    
      };

      const result = await axios.put(`http://localhost:8000/api/v1/project/edit/${projectId}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setLoading(false);
      console.log('Server response:', result.data); 
      toast.success('Project berhasil diperbarui');
      // history.push('/project-admin'); 

      handleNextStep();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

    return (
        <>
        <Sidebar />
       `<Navbar />
       `<form onSubmit={handleSubmit}>

            <div className="panjang">
                <img src={step3} width="85%" alt="Step" />
            </div>
            <div className="form-detailing">
                <div className="lingkaran">
                    <img src={lingkaran} alt="Lingkaran" />
                </div>
            </div>
            <div className="form-detailing-kanan2">
                <div className="miau-container-detailing2">
                    <div className="miau5">
                        <div className="tittle-form-email-kanan-detailing">
                            <p>Berat Beban Proyek</p>
                        </div>
                        <div className="input-form-email-kanan-detailing">
                        <input type="number" name="beban_proyek" value={formData.beban_proyek} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="miau4-detailing">
                        <div className="kiri-miau4-detailing">
                            <div className="tittle-form-kanan">
                                <p>Type</p>
                            </div>
                            <div className="input-form-kanan-detailing">
                            <input type="text" name="type" value={formData.type} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="kanan-user-detailing">
                            <div className="tittle-form-kanan">
                                <p>Market Segment</p>
                            </div>
                            <div className="input-form-kanan-detailing">
                            <input type="text" name="market_segment" value={formData.market_segment} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                    <div className="miau8-detailing">
                        <div className="tittle-form-email-kanan-detailing">
                            <p>Resiko</p>
                        </div>
                        <div className="input-form-email-kanan-detailing">
                        <input type="text" name="resiko" value={formData.resiko} onChange={handleInputChange} />
                        </div>
                        <div className="miau9-detailing">
                            <div className="tittle-form-email-kanan-detailing">
                                <p>Teknologi yang Dipakai </p>
                            </div>
                            <div className="input-form-email-kanan2-detailing">
                            <textarea type="text" name="tech_use" value={formData.tech_use} onChange={handleInputChange} ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="tambah-detailing">
                                {/* <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <br />
                                <button type="button" onClick={handleNextStep}>Next Step</button> */}
                                <button type="submit">Update Project</button>
                    </div>
                </div>
            </div>
            <div className="bg-form-atas-detailing">
                <p>CUSTOMER INFO.</p>
            </div>
            <div className="form-detailing-container">
                <div className="form-detailing2">
                    <h2>ADD PROJECT.</h2>
                    {/* <h1>Data dibawah dapat diisi oleh Sales.</h1> */}
                    <div className="back">
                        {/* <button>
                            <img src={arrow} alt="Arrow" />
                            Back
                        </button> */}
                    </div>
                    <div className="miau-container-detailing">
                        <div className="miau4">
                            <div className="kiri-user">
                                <div className="tittle-form">
                                    <p>Start Date </p>
                                </div>
                                <div className="input-form-date">
                                <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="kanan-user">
                                <div className="tittle-form">
                                    <p>End Date </p>
                                </div>
                                <div className="input-form-date">
                                <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="miau5-detailing">
                            <div className="tittle-form">
                                <p>Scope of Work</p>
                            </div>
                            <input type="text" name="sow" value={formData.sow} onChange={handleInputChange} />
                        </div>
                        <div className="miau5-detailing">
                            <div className="tittle-form">
                                <p>Out of Work</p>
                            </div>
                            <input type="text" name="oos" value={formData.oos} onChange={handleInputChange} />
                        </div>
                        <div className="miau5-detailing">
                            <div className="tittle-form">
                                    <p>Detail</p>
                            </div>
                            <textarea name="detail" value={formData.detail} onChange={handleInputChange} />
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </>
    );
}

export default EditProjectDetail;
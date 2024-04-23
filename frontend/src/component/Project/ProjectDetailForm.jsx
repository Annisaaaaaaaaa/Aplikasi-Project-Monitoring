// import React, { useState } from 'react';
// import { useFormContext } from './FormContext';

// const ProjectDetailForm = ({ onNextStep, onPrevStep, formData }) => {
//     const { projectDetail } = formData;
//     const [data, setData] = useState(projectDetail);
    
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onNextStep({ projectDetail: data });
//   };
  
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Project Load:
//         <input type="number" name="beban_proyek" value={data.beban_proyek || ''} onChange={handleInputChange} />
//       </label>
//       <label>
//         Type:
//         <input type="text" name="type" value={data.type || ''} onChange={handleInputChange} />
//       </label>
//       <label>
//         Market Segment:
//         <input type="text" name="market_segment" value={data.market_segment || ''} onChange={handleInputChange} />
//       </label>
//       <label>
//         Risk:
//         <input type="text" name="resiko" value={data.resiko || ''} onChange={handleInputChange} />
//       </label>
//       <label>
//         Tech Use:
//         <textarea type="text" name="tech_use" value={data.tech_use || ''} onChange={handleInputChange} ></textarea>
//       </label>

//       <label>
//         Start Date:
//         <input type="date" name="start_date" value={data.start_date || ''} onChange={handleInputChange} />
//       </label>
//       <label>
//         End Date:
//         <input type="date" name="end_date" value={data.end_date || ''} onChange={handleInputChange} />
//       </label>
//       <label>
//         SOW:
//         <input type="text" name="sow" value={data.sow || ''} onChange={handleInputChange} />
//       </label>
//       <label>
//         OOS:
//         <input type="text" name="oos" value={data.oos || ''} onChange={handleInputChange} />
//       </label>
//       <label>
//         Detail:
//         <textarea name="detail" value={data.detail || ''} onChange={handleInputChange} />
//       </label>
     
//       <button type="button" onClick={onPrevStep}>Previous</button>
//       <button type="submit">Next</button>
//     </form>
//   );
// };

// export default ProjectDetailForm;


// import React, { useState } from 'react';
// import { useFormContext } from './FormContext';

// const ProjectDetailForm = ({ onNextStep, onPrevStep }) => {
//   const { formData, setFormData } = useFormContext();
//   const { projectInitial } = formData;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       projectInitial: {
//         ...projectInitial,
//         [name]: value,
//       },
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onNextStep();
//   };
  
//   return (
//     <div>
//       <h2>Project Detail</h2>
//       <form onSubmit={handleSubmit}>
        // <label>
        //   Project Load:
        //   <input type="number" name="beban_proyek" value={projectInitial.beban_proyek || ''} onChange={handleInputChange} />
        // </label>
        // <label>
        //   Type:
        //   <input type="text" name="type" value={projectInitial.type || ''} onChange={handleInputChange} />
        // </label>
        // <label>
        //   Market Segment:
        //   <input type="text" name="market_segment" value={projectInitial.market_segment || ''} onChange={handleInputChange} />
        // </label>
        // <label>
        //   Risk:
        //   <input type="text" name="resiko" value={projectInitial.resiko || ''} onChange={handleInputChange} />
        // </label>
        // <label>
        //   Tech Use:
        //   <textarea type="text" name="tech_use" value={projectInitial.tech_use || ''} onChange={handleInputChange} ></textarea>
        // </label>

        // <label>
        //   Start Date:
        //   <input type="date" name="start_date" value={projectInitial.start_date || ''} onChange={handleInputChange} />
        // </label>
        // <label>
        //   End Date:
        //   <input type="date" name="end_date" value={projectInitial.end_date || ''} onChange={handleInputChange} />
        // </label>
        // <label>
        //   SOW:
        //   <input type="text" name="sow" value={projectInitial.sow || ''} onChange={handleInputChange} />
        // </label>
        // <label>
        //   OOS:
        //   <input type="text" name="oos" value={projectInitial.oos || ''} onChange={handleInputChange} />
        // </label>
        // <label>
        //   Detail:
        //   <textarea name="detail" value={projectInitial.detail || ''} onChange={handleInputChange} />
        // </label>
      
//         <button type="button" onClick={onPrevStep}>Previous</button>
//         <button type="submit">Next</button>
//       </form>
//     </div>
//   );
// };

// export default ProjectDetailForm;

import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AuthContext from './../../context/AuthContext'; 

const EditProjectDetail = ({ match, handleNextStep }) => {
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
    weight: '',
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
          weight: projectData.weight,
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
        weight: formData.weight,
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
    <div>
      <h2>Edit Project - Project Inform</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Project Load:
          <input type="number" name="beban_proyek" value={formData.beban_proyek} onChange={handleInputChange} />
        </label>
        <label>
          Type:
          <input type="text" name="type" value={formData.type} onChange={handleInputChange} />
        </label>
        <label>
          Market Segment:
          <input type="text" name="market_segment" value={formData.market_segment} onChange={handleInputChange} />
        </label>
        <label>
          Risk:
          <input type="text" name="resiko" value={formData.resiko} onChange={handleInputChange} />
        </label>
        <label>
          Tech Use:
          <textarea type="text" name="tech_use" value={formData.tech_use} onChange={handleInputChange} ></textarea>
        </label>

        <label>
          Start Date:
          <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} />
        </label>
        <label>
          SOW:
          <input type="text" name="sow" value={formData.sow} onChange={handleInputChange} />
        </label>
        <label>
          OOS:
          <input type="text" name="oos" value={formData.oos} onChange={handleInputChange} />
        </label>
        <label>
          Detail:
          <textarea name="detail" value={formData.detail} onChange={handleInputChange} />
        </label>
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default EditProjectDetail;

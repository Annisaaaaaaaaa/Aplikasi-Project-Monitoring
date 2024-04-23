import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AuthContext from './../../context/AuthContext'; 

const EditProjectForm = ({ match }) => {
  const history = useHistory();
  const { id } = useParams();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    engineer_projects: [
        {
            engineer: "",
            presentase_beban_kerja: '',
            status: ""
        }
    ]
  });

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/project/edit/${id}/`, {
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
  },[id, authContext.authTokens]);

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
      const previousDataResponse = await axios.get(`http://127.0.0.1:8000/api/v1/project/edit/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const previousData = previousDataResponse.data;

      // Gabungkan data sebelumnya dengan data baru (hanya kolom engineer yang diubah)
      const updatedData = {
        ...previousData,
        engineer_projects: formData.engineer_projects,
      };

      const result = await axios.put(`http://127.0.0.1:8000/api/v1/project/edit/${id}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setLoading(false);
      console.log('Server response:', result.data); 
      toast.success('Project berhasil diperbarui');
      history.push('/administrator/project/'); 

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

  const handleAddEngineer = () => {
    setFormData({
      ...formData,
      engineer_projects: [...formData.engineer_projects, { engineer: '', workload_percentage: '', status: '' }]
    });
  };

  return (
    <div>
      <h2>Edit Project - Engineer Details</h2>
      <form onSubmit={handleSubmit}>
        {formData.engineer_projects.map((engineer, index) => (
          <div key={index}>
            <label>Engineer Name:</label>
            <input type="text" name="engineer" value={engineer.engineer} onChange={(e) => handleChange(e, index)} />
            <br />
            <label>Workload Percentage:</label>
            <input type="text" name="workload_percentage" value={engineer.workload_percentage} onChange={(e) => handleChange(e, index)} />
            <br />
            <label>Status:</label>
            <input type="text" name="status" value={engineer.status} onChange={(e) => handleChange(e, index)} />
            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddEngineer}>Tambah Engineer</button>
        <br />
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default EditProjectForm;
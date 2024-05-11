import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from './../../context/AuthContext';

const AddActivityForm = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { authTokens } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [engineers, setEngineers] = useState([]); 
  const [users, setUsers] = useState([]); 

  const [formData, setFormData] = useState({
    project: '',
    pm: '',
    name: '',
    date_start: '',
    date_finish: '',
    date_estimated: '',
    note: '',
    status: '',
    tanggung_jawab: '',
    engineer_activities: [
      { 
        engineer: '', 
        persentase_beban_kerja: '', 
        status: '' 
    }],
    stakeholder_activities: [
      { user: '', 
      stakeholder: '' 
    }],
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const projectResponse = await axios.get('http://127.0.0.1:8000/api/v1/project/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(projectResponse.data); 

        const userResponse = await axios.get('http://127.0.0.1:8000/api/users/tambah', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(userResponse.data);

        // Filter pengguna yang memiliki group 5
        const engineersData = userResponse.data.filter(user => user.groups.includes(5));
        setEngineers(engineersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, [authContext.authTokens]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      setLoading(true);

      // Loop through formData keys and call handleChange with correct parameters
      for (const key in formData) {
        handleChange({ target: { name: key, value: formData[key] } }, '', ''); // Change parameters accordingly
      }

      const dataToSend = {
        ...formData,
        engineer_activities: formData.engineer_activities.map(activity => ({
          ...activity,
          engineer_id: activity.engineer // Set engineer_id from engineer object
        }))
      };

      dataToSend.engineer_activities.forEach(activity => {
        const selectedEngineer = engineers.find(engineer => engineer.id === activity.engineer);
        if (selectedEngineer) {
          activity.engineer_id = selectedEngineer.id;
        }
      });
  
      const isFormValid = Object.values(formErrors).every((error) => error === '');
      if (!isFormValid) {
        return;
      }
  
      const response = await axios.post(`http://127.0.0.1:8000/api/v1/aktivitas-projek/engineer-activities/`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setFormErrors({});
      toast.success('Activity added successfully');
      history.push('/pm/dashboard/aktivitas');
    } catch (error) {
      setLoading(false);
      console.error('Error:', error.message);
      setFormErrors({ general: error.message });
    }
  };

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    // Buat salinan baru dari objek formData
    const newData = { ...formData };
    // Jika index tidak diberikan (untuk input utama), langsung perbarui nilai
    if (index === '') {
      newData[name] = value;
    } else {
      // Jika index diberikan (untuk input dalam array), perbarui nilai dalam array sesuai dengan jenis aktivitas
      newData[type][index][name] = value;
    }
    // Perbarui state formData dengan data yang diperbarui
    setFormData(newData);
  
    // Validasi Error
    let errorMessage = '';
    switch (name) {
        case 'project':
            errorMessage = value ? '' : 'Project is required';
            break;
          case 'pm':
            errorMessage = value ? '' : 'Project Manager (PM) is required';
            break;
          case 'name':
            errorMessage = value ? '' : 'Activity Name is required';
            break;
          case 'note':
            errorMessage = value ? '' : 'Activity note is required';
            break;
          case 'status':
            errorMessage = value ? '' : 'Activity status is required';
            break;
          case 'tanggung_jawab':
            errorMessage = value ? '' : 'Activity tanggung_jawab is required';
            break;
      case 'date_start':
        errorMessage = value ? '' : 'Activity start date is required';
        break;

      case 'date_finish':
        if (value && formData.date_start) {
          const startDate = new Date(formData.date_start);
          const finishDate = new Date(value);
          if (finishDate < startDate) {
            errorMessage = 'Finish date cannot be before start date';
          } else {
            errorMessage = '';
          }
        }
        errorMessage = value ? '' : 'Activity date_finish is required';
        break;

      case 'date_estimated':
        if (value && formData.date_start) {
          const startDate = new Date(formData.date_start);
          const estimatedDate = new Date(value);
          if (estimatedDate < startDate) {
            errorMessage = 'Estimated date cannot be before start date';
          } else {
            errorMessage = '';
          }
        }
        errorMessage = value ? '' : 'Activity date_estimated is required';
        break;
      // Other cases...
      default:
        break;
    }
    setFormErrors({ ...formErrors, [name]: errorMessage });
  };
  
  


  const handleAddRow = (type) => {
    setFormData({ ...formData, [type]: [...formData[type], { engineer: '', persentase_beban_kerja: '', status: '' }] });
  };

  const handleRemoveRow = (index, type) => {
    const newData = [...formData[type]];
    newData.splice(index, 1);
    setFormData({ ...formData, [type]: newData });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = authTokens ? authTokens.access : null;
//       if (!token) {
//         throw new Error('Authentication token is missing');
//       }

//       setLoading(true);

//       for (const key in formData) {
//         handleChange({ target: { name: key, value: formData[key] } });
//       }
//       const isFormValid = Object.values(formErrors).every((error) => error === '');
//       if (!isFormValid) {
//         return;
//       }


//       const response = await axios.post(`http://127.0.0.1:8000/api/v1/aktivitas-projek/engineer-activities/`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setFormErrors({});
//       toast.success('Activity added successfully');
//       history.push('/');
//     } catch (error) {
//       setLoading(false);
//       console.error('Error:', error.message);
//       setFormErrors({ general: error.message });
//     }
//   };

  return (
    <div>
      <h2>Add Activity</h2>
      <form onSubmit={handleSubmit}>

      <label>Project:</label>
        <select name="project" value={formData.project} onChange={(e) => handleChange(e, '', 'project')} required>
          <option value="">Select Project</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {`${project.pid} - ${project.name}`}
            </option>
          ))}
        </select>
        {formErrors.project && <span className="error">{formErrors.project}</span>}

        <br />

        <label>Project Manager (PM):</label>
        <select name="pm" value={formData.pm} onChange={(e) => handleChange(e, '', '')} required>
            <option value="">Select Project Manager</option>
            {users.map(user => (
            <option key={user.id} value={user.id}>
                {`${user.first_name} ${user.last_name}`}
            </option>
            ))}
        </select>
        <br />

        <label>Activity Name:</label>
        <input type="text" name="name" value={formData.name} onChange={(e) => handleChange(e, '', '')} required />
        <br />

        <label>Start Date:</label>
        <input type="datetime-local" name="date_start" value={formData.date_start} onChange={(e) => handleChange(e, '', '')} required />

        <label>Finish Date:</label>
        <input type="datetime-local" name="date_finish" value={formData.date_finish} onChange={(e) => handleChange(e, '', '')} min={formData.date_start} required />

        <label>Estimated Date:</label>
        <input type="datetime-local" name="date_estimated" value={formData.date_estimated} onChange={(e) => handleChange(e, '', '')} min={formData.date_start} required />
        <br />


        {/* <label>Start Date:</label>
        <input type="datetime-local" name="date_start" value={formData.date_start} onChange={(e) => handleChange(e, '', '')} required />
        <br />

        <label>Finish Date:</label>
        <input type="datetime-local" name="date_finish" value={formData.date_finish} onChange={(e) => handleChange(e, '', '')} required />
        <br />

        <label>Estimated Date:</label>
        <input type="datetime-local" name="date_estimated" value={formData.date_estimated} onChange={(e) => handleChange(e, '', '')} required />
        <br /> */}

        <label>Note:</label>
        <input type="text" name="note" value={formData.note} onChange={(e) => handleChange(e, '', '')} required />
        <br />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={(e) => handleChange(e, '', '')} required>
          <option value="">Select Status</option>
          <option value="Done">Done</option>
          <option value="On Going">On Going</option>
          <option value="Waiting">Waiting</option>
          <option value="Over Due">Over Due</option>
          <option value="Not Started Yet">Not Started Yet</option>
          <option value="Incompleted">Incompleted</option>
          <option value="Chaotic">Chaotic</option>
        </select>
        <br />

        <label>Tanggung Jawab:</label>
        <input type="text" name="tanggung_jawab" value={formData.tanggung_jawab} onChange={(e) => handleChange(e, '', '')} required />
        <br />


        <label>Engineer Activities:</label>
        {formData.engineer_activities.map((item, index) => (
          <div key={index}>
                <label>Engineer:</label>
            <select name="engineer" value={item.engineer} onChange={(e) => handleChange(e, index, 'engineer_activities')}>
                <option value="">Select Engineer</option>
                {engineers.map(engineer => (
                <option key={engineer.id} value={engineer.id}>
                    {`${engineer.first_name} ${engineer.last_name}`}
                </option>
                ))}
            </select>
            <br />

            <input type="number" name="persentase_beban_kerja" value={item.persentase_beban_kerja} onChange={(e) => handleChange(e, index, 'engineer_activities')} />

            <label>Status:</label>
            <select name="status" value={item.status} onChange={(e) => handleChange(e, index, 'engineer_activities')}>
            <option value="">Select Status</option>
            <option value="Done">Done</option>
            <option value="On Going">On Going</option>
            <option value="Waiting">Waiting</option>
            <option value="Over Due">Over Due</option>
            <option value="Not Started Yet">Not Started Yet</option>
            <option value="Incompleted">Incompleted</option>
            <option value="Chaotic">Chaotic</option>
            </select>
            <br />


            <button type="button" onClick={() => handleRemoveRow(index, 'engineer_activities')}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow('engineer_activities')}>Add Engineer</button>
        <br />

        <label>Stakeholder Activities:</label>
        {formData.stakeholder_activities.map((item, index) => (
          <div key={index}>
            <label>Stakeholder:</label>
            <select name="user" value={item.user} onChange={(e) => handleChange(e, index, 'stakeholder_activities')}>
                <option value="">Select Stakeholder</option>
                {users.map(user => (
                <option key={user.id} value={user.id}>
                    {`${user.first_name} ${user.last_name}`}
                </option>
                ))}
            </select>
            <br />
            
            <input type="text" name="stakeholder" value={item.stakeholder} onChange={(e) => handleChange(e, index, 'stakeholder_activities')} />

            <button type="button" onClick={() => handleRemoveRow(index, 'stakeholder_activities')}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow('stakeholder_activities')}>Add Stakeholder</button>

        <button type="submit" disabled={loading}>Add Activity</button>
      </form>
      {formErrors.general && <p>{formErrors.general}</p>}
    </div>
  );
};

export default AddActivityForm;

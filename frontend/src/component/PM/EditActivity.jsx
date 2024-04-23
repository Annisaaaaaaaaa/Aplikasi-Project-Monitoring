import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AuthContext from './../../context/AuthContext'; 

const EditActivityForm = ({ match }) => {
  const history = useHistory();
  const { id } = useParams();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [deletedEngineerActivities, setDeletedEngineerActivities] = useState([]);
  const [deletedStakeholderActivities, setDeletedStakeholderActivities] = useState([]);


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
    }
    ],
    stakeholder_activities: [
        { 
        user: '',
        stakeholder: '' 
    }
  ],
  });

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/aktivitas-projek/edit/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const activityData = response.data;

        setFormData({
          project: activityData.project,
          pm: activityData.pm,
          name: activityData.name,
          date_start: convertToDateTimeLocal(activityData.date_start),
          date_finish: convertToDateTimeLocal(activityData.date_finish),
          date_estimated: convertToDateTimeLocal(activityData.date_estimated),        
          note: activityData.note,
          status: activityData.status,
          tanggung_jawab: activityData.tanggung_jawab,
          engineer_activities: activityData.engineer_activities.map(activity => ({
            engineer: activity.engineer,
            persentase_beban_kerja: activity.persentase_beban_kerja,
            status: activity.status,
          })),
          stakeholder_activities: activityData.stakeholder_activities.map(activity => ({
            user: activity.user,
            stakeholder: activity.stakeholder,
          })),
        });
      } catch (error) {
        console.error('Error fetching activity data:', error);
        toast.error('Failed to fetch user data. Please try again.');
      }
    };

    fetchActivityData();
  },[id, authContext.authTokens]);

  const convertToDateTimeLocal = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     console.log('Form data:', formData);

  //     const isValidData = validateFormData(formData);
  //     if (!isValidData) {
  //       throw new Error('Invalid data format. Please check your input.');
  //     }

  //     const token = authContext.authTokens ? authContext.authTokens.access : null;
  //     if (!token) {
  //       throw new Error('Authentication token is missing');
  //     }
  //     setLoading(true);
      
  //     const result = await Swal.fire({
  //       title: 'Are you sure?',
  //       text: 'You are about to Edit Activity!',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, update it!'
  //     });

  //     if (result.isConfirmed) {
  //       setLoading(true);
  //       const requestData = { ...formData };
      
  //       const response = await axios.put(`http://127.0.0.1:8000/api/v1/aktivitas-projek/edit/${id}/`, requestData, {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       setLoading(false);
  //       console.log('Server response:', response.data); 
  //       toast.success(`${response.data.username} berhasil di Update`);
  //       history.push('/pm/dashboard/aktivitas'); 
  //     }
  //   } catch (error) {
  //       setLoading(false);
  //       if (error.response && error.response.data) {
  //         const errorData = error.response.data;
  //         console.log('Server error response:', errorData); 
  //         setFormErrors(errorData);
  //       } else {
  //         console.error('Error updating user data:', error.message);
  //         toast.error('Failed to update user data. Please try again.');
  //       }
  //   }
  // };

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const newData = { ...formData };
    if (index === '') {
      newData[name] = value;
    } else {
      newData[type][index][name] = value;
    }
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
    // Update form errors state
    setFormErrors({ ...formErrors, [name]: errorMessage });
  };

  const validateFormData = (formData) => {
    let isValid = true;
    const errors = {};
  
    // Validasi project
    if (!formData.project) {
      errors.project = 'Project is required';
      isValid = false;
    }
  
    // Validasi Project Manager
    if (!formData.pm) {
      errors.pm = 'Project Manager (PM) is required';
      isValid = false;
    }
  
    // Validasi Activity Name
    if (!formData.name) {
      errors.name = 'Activity Name is required';
      isValid = false;
    }
  
    // Validasi Note
    if (!formData.note) {
      errors.note = 'Activity note is required';
      isValid = false;
    }
  
    // Validasi Status
    if (!formData.status) {
      errors.status = 'Activity status is required';
      isValid = false;
    }
  
    // Validasi Tanggung Jawab
    if (!formData.tanggung_jawab) {
      errors.tanggung_jawab = 'Activity tanggung_jawab is required';
      isValid = false;
    }
  
    // Validasi Start Date
    if (!formData.date_start) {
      errors.date_start = 'Activity start date is required';
      isValid = false;
    }
  
    // Validasi Finish Date
    if (!formData.date_finish) {
      errors.date_finish = 'Activity finish date is required';
      isValid = false;
    } else if (formData.date_start && new Date(formData.date_finish) < new Date(formData.date_start)) {
      errors.date_finish = 'Finish date cannot be before start date';
      isValid = false;
    }
  
    // Validasi Estimated Date
    if (!formData.date_estimated) {
      errors.date_estimated = 'Activity estimated date is required';
      isValid = false;
    } else if (formData.date_start && new Date(formData.date_estimated) < new Date(formData.date_start)) {
      errors.date_estimated = 'Estimated date cannot be before start date';
      isValid = false;
    }
  
    return { isValid, errors };
  };
  

  const handleAddRow = (type) => {
    
    setFormData({ ...formData, [type]: [...formData[type], { engineer: '', persentase_beban_kerja: '', status: '' }] });
  };

  const handleRemoveRow = (index, type) => {
    // Menambahkan item yang dihapus ke daftar item yang dihapus
    if (type === 'engineer_activities') {
      const deletedEngineer = formData.engineer_activities[index];
      setDeletedEngineerActivities([...deletedEngineerActivities, deletedEngineer]);
    } else if (type === 'stakeholder_activities') {
      const deletedStakeholder = formData.stakeholder_activities[index];
      setDeletedStakeholderActivities([...deletedStakeholderActivities, deletedStakeholder]);
    }
  
    // Menghapus item dari state lokal
    const newData = [...formData[type]];
    newData.splice(index, 1);
    setFormData({ ...formData, [type]: newData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Form data:', formData);
  
      const isValidData = validateFormData(formData);
      if (!isValidData.isValid) {
        throw new Error('Invalid data format. Please check your input.');
      }
  
      const token = authContext.authTokens ? authContext.authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      setLoading(true);
  
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to Edit Activity!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      });
  
      if (result.isConfirmed) {
        setLoading(true);
        const requestData = { ...formData };
  
        // Mengirimkan hanya data yang diisi ke server
        // Contoh implementasi untuk pengiriman data ke server
        const response = await axios.put(`http://127.0.0.1:8000/api/v1/aktivitas-projek/edit/${id}/`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        // Menghapus item yang dihapus dari database
        await Promise.all([
          Promise.all(deletedEngineerActivities.map(async engineer => {
            await axios.delete(`http://127.0.0.1:8000/api/v1/aktivitas-projek/${engineer.id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          })),
          
          Promise.all(deletedStakeholderActivities.map(async stakeholder => {
            await axios.delete(`http://127.0.0.1:8000/api/v1/aktivitas-projek/${stakeholder.id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
          }))
        ]);
  
        setLoading(false);
        console.log('Server response:', response.data);
        toast.success(`${response.data.username} berhasil di Update`);
        history.push('/pm/dashboard/aktivitas');
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        console.log('Server error response:', errorData);
        setFormErrors(errorData);
      } else {
        console.error('Error updating user data:', error.message);
        toast.error('Failed to update user data. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Edit Activity</h2>
      <form onSubmit={handleSubmit}>
        <label>Project:</label>
        <input type="text" name="project" value={formData.project} onChange={(e) => handleChange(e, '', '')} required />
        {formErrors.project && <div>{formErrors.project}</div>}
        <br />

        <label>Project Manager (PM):</label>
        <input type="text" name="pm" value={formData.pm} onChange={(e) => handleChange(e, '', '')} required />
        {formErrors.pm && <div>{formErrors.pm}</div>}
        <br />

        <label>Activity Name:</label>
        <input type="text" name="name" value={formData.name} onChange={(e) => handleChange(e, '', '')} required />
        {formErrors.name && <div>{formErrors.name}</div>}
        <br />

        <label>Start Date:</label>
        <input type="datetime-local" name="date_start" value={formData.date_start} onChange={(e) => handleChange(e, '', '')} required />
        {formErrors.date_start && <div>{formErrors.date_start}</div>}
        <br />

        <label>Finish Date:</label>
        <input type="datetime-local" name="date_finish" value={formData.date_finish} onChange={(e) => handleChange(e, '', '')} required />
        {formErrors.date_finish && <div>{formErrors.date_finish}</div>}
        <br />

        <label>Estimated Date:</label>
        <input type="datetime-local" name="date_estimated" value={formData.date_estimated} onChange={(e) => handleChange(e, '', '')} required />
        {formErrors.date_estimated && <div>{formErrors.date_estimated}</div>}

        <br />

        <label>Note:</label>
        <input type="text" name="note" value={formData.note} onChange={(e) => handleChange(e, '', '')} required />
        {formErrors.note && <div>{formErrors.note}</div>}
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
        {formErrors.status && <div>{formErrors.status}</div>}
        <br />

        <label>Tanggung Jawab:</label>
        <input type="text" name="tanggung_jawab" value={formData.tanggung_jawab} onChange={(e) => handleChange(e, '', '')} required />
        {formErrors.tanggung_jawab && <div>{formErrors.tanggung_jawab}</div>}
        <br />

        <label>Engineer Activities:</label>
        {formData.engineer_activities.map((item, index) => (
          <div key={index}>
            <input type="text" name="engineer" value={item.engineer} onChange={(e) => handleChange(e, index, 'engineer_activities')} required />
            <input type="number" name="persentase_beban_kerja" value={item.persentase_beban_kerja} onChange={(e) => handleChange(e, index, 'engineer_activities')} required />
            <select name="status" value={item.status} onChange={(e) => handleChange(e, index, 'engineer_activities')} required>
              <option value="">Select Status</option>
              <option value="Done">Done</option>
              <option value="On Going">On Going</option>
              <option value="Waiting">Waiting</option>
              <option value="Over Due">Over Due</option>
              <option value="Not Started Yet">Not Started Yet</option>
              <option value="Incompleted">Incompleted</option>
              <option value="Chaotic">Chaotic</option>
            </select>
            <button type="button" onClick={() => handleRemoveRow(index, 'engineer_activities')}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow('engineer_activities')}>Add Engineer</button>
        <br />

        <label>Stakeholder Activities:</label>
        {formData.stakeholder_activities.map((item, index) => (
          <div key={index}>
            <input type="text" name="user" value={item.user} onChange={(e) => handleChange(e, index, 'stakeholder_activities')} required />
            <input type="text" name="stakeholder" value={item.stakeholder} onChange={(e) => handleChange(e, index, 'stakeholder_activities')} required />
            <button type="button" onClick={() => handleRemoveRow(index, 'stakeholder_activities')}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddRow('stakeholder_activities')}>Add Stakeholder</button>

        <button type="submit">Update Activity</button>
      </form>
    </div>
  );
};

export default EditActivityForm;

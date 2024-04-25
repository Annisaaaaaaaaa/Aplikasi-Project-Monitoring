import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import AuthContext from './../../context/AuthContext'; 

const EditUserForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [changePassword, setChangePassword] = useState(false); 
  const authContext = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '', // Include password field in the state
    groups: [],
    titles: '',
    status: 'internal',
    full_name: '',
    is_active: true
  });

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }
  
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const userData = response.data;
  
        setFormData({
          username: userData.username,
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          is_active: userData.is_active,
          is_superuser: userData.is_superuser,
          profile: {
            titles: userData.profile.titles,
            status: userData.profile.status,
            full_name: userData.profile.full_name 
          },
          groups: userData.groups,
          password: changePassword ? '' : userData.password
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        toast.error('Failed to fetch user data. Please try again.');
      }
    };
  
    fetchUserData();
  }, [id, authContext.authTokens, changePassword]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      const isValidData = validateFormData(formData);
      if (!isValidData) {
        throw new Error('Invalid data format. Please check your input.');
      }
  
      const token = authContext.authTokens ? authContext.authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      setLoading(true);
      
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to Edit User!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      });
  
      if (result.isConfirmed) {
        setLoading(true);
        const requestData = { ...formData };
        
        // If full_name is empty, remove the profile.full_name field from the request data
        if (!changePassword && !requestData.profile.full_name) {
          delete requestData.profile.full_name;
        }

        if (!formData.groups || formData.groups.length === 0) {
          setFormErrors({ groups: 'Please select at least one group.' });
          return false;
        }
      
        if (!Array.isArray(formData.groups) || formData.groups.some(group => typeof group !== 'number')) {
          setFormErrors({ groups: 'Invalid group format. Please select groups from the list.' });
          return false;
        }
      
        const response = await axios.put(`http://127.0.0.1:8000/api/users/${id}/`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLoading(false);
        console.log('Server response:', response.data); 
        toast.success(`${response.data.username} berhasil di Update`);
        history.push('/administrator/user'); 
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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter(option => option.selected)
      .map(option => parseInt(option.value)); 
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: selectedOptions,
    }));
  };  
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      profile: {
        ...prevFormData.profile,
        [name]: value,
      }
    }));
  };

  const validateFormData = (formData) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!formData.username.match(usernameRegex) || formData.username.length < 5) {
      return false;
    }
  
    if (formData.groups.length === 0) {
      return false;
    }
  
    if (!Array.isArray(formData.groups) || formData.groups.some(group => typeof group !== 'number')) {
        setFormErrors({ groups: 'Format grup tidak valid. Pastikan grup yang dipilih adalah angka' });
        return false;
    }
  
    return true;
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
          {formErrors.username && <div>{formErrors.username}</div>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          {formErrors.email && <div>{formErrors.email}</div>}
        </div>

        <div>
          <label>First Name:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
          {formErrors.first_name && <div>{formErrors.first_name}</div>}
        </div>

        <div>
          <label>Last Name:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
          {formErrors.last_name && <div>{formErrors.last_name}</div>}
        </div>
        <div>
          <label>Titles:</label>
          <input type="text" name="titles" value={formData.titles} onChange={handleProfileChange} />
          {formErrors.titles && <div>{formErrors.titles}</div>}
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleProfileChange}>
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
          {formErrors.status && <div>{formErrors.status}</div>}
        </div>
        <div>
          <label>Full Name:</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleProfileChange} />
          {formErrors.full_name && <div>{formErrors.full_name}</div>}
        </div>

        {/* Checkbox to toggle whether to change password or not */}
        <div>
          <label>
            <input 
              type="checkbox" 
              checked={changePassword} 
              onChange={() => setChangePassword(!changePassword)} 
            />
            Change Password
          </label>
        </div>

        {/* Password input */}
        {changePassword && (
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </div>
        )}

        <div>
          <label>Groups:</label>
          <select name="groups" multiple value={formData.groups} onChange={handleSelectChange}>
            <option value="1" selected={formData.groups.includes('1')}>Group 1</option>
            <option value="2" selected={formData.groups.includes('2')}>Group 2</option>
            <option value="3" selected={formData.groups.includes('3')}>Group 3</option>
            <option value="4" selected={formData.groups.includes('4')}>Group 4</option>
            <option value="5" selected={formData.groups.includes('5')}>Group 5</option>
          </select>
          {formErrors.groups && <div>{formErrors.groups}</div>}
        </div>
        
        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update User'}</button>
      </form>
    </div>
  );
};

export default EditUserForm;

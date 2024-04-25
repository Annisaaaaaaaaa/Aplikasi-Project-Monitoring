import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import AuthContext from './../../context/AuthContext';

const AddUserForm = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    groups: [],
    titles: '',
    status: 'internal',
    fullname: '',
    is_active: true
  });
  const [loading, setLoading] = useState(false);
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setFormErrors({ general: error.message });
      }
    };
    fetchData();
  }, [authContext.authTokens]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'groups' ? Array.from(e.target.selectedOptions, option => option.value) : value;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: selectedOptions,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
  
      const postData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        first_name: formData.firstName,
        groups: formData.groups,
        last_name: formData.lastName,
        is_active: formData.is_active,
        is_superuser: false,
        profile: {
          titles: formData.titles,
          status: formData.status,
          full_name: formData.fullname
        }
      };
  
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to add a new user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!'
      });
  
      if (result.isConfirmed) {
        setLoading(true);
        const response = await axios.post('http://localhost:8000/api/users/tambah', postData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log('Server response:', response.data); 
        setFormErrors({});
        toast.success(`${response.data.username} berhasil ditambahkan`);
        history.push('/administrator/user');
  
        setLoading(false);
        if (response.status === 200) {
          setFormData({
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            groups: [],
            titles: '',
            status: 'internal',
            fullname: '',
            is_active: true
          });
          setFormErrors({});
          toast.success(`${response.data.username} berhasil ditambahkan`);
          history.push('/administrator/user');
        } else {
          //
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        setFormErrors(errorData);
      } else {
        console.error('Terjadi kesalahan:', error.message);
        toast.error('Terjadi kesalahan saat menambahkan pengguna. Silakan coba lagi.');
      }
    }
  };
  

  return (
    <div>
      <h2>Add User</h2>
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
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
          {formErrors.firstName && <div>{formErrors.firstName}</div>}
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
          {formErrors.lastName && <div>{formErrors.lastName}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          {formErrors.password && <div>{formErrors.password}</div>}
        </div>
        <div>
          <label>Titles:</label>
          <input type="text" name="titles" value={formData.titles} onChange={handleInputChange} />
          {formErrors.titles && <div>{formErrors.titles}</div>}
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
          {formErrors.status && <div>{formErrors.status}</div>}
        </div>
        <div>
          <label>Fullname:</label>
          <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} />
          {formErrors.fullname && <div>{formErrors.fullname}</div>}
        </div>
        <div>
          <label>Groups:</label>
          <select name="groups" multiple value={formData.groups} onChange={handleSelectChange}>
            <option value="1">Group 1</option>
            <option value="2">Group 2</option>
            <option value="3">Group 3</option>
            <option value="4">Group 4</option>
            <option value="5">Group 5</option>
          </select>
          {formErrors.groups && <div>{formErrors.groups}</div>}
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add User'}</button>
      </form>
    </div>
  );
};

export default AddUserForm;

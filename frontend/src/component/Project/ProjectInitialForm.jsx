import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AuthContext from './../../context/AuthContext';

const ProjectInitialForm = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { authTokens } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    year: "",
    pid: "",
    name: "",
    description: "",
    customer: "",
    sales: "",
    am: null,
    pic: null,
    pm: null,
    start_date: null,
    end_date: null,
    status: "",
    priority: null,
    contract_no: "",
    contract_date: "",
    sow: null,
    oos: null,
    detail: null,
    remarks: null,
    type: null,
    market_segment: null,
    tech_use: null,
    resiko: null,
    beban_proyek: null,
    completion_percentage: null,
    amount_exc_tax: "",
    amount_tax: "",
    engineer_projects: []
  });
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }
  
        // Fetch users
        const usersResponse = await axios.get('http://127.0.0.1:8000/api/users/tambah', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(usersResponse.data); 


        const clientsResponse = await axios.get('http://127.0.0.1:8000/api/v1/client/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(clientsResponse.data); 

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [authTokens]);  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      setLoading(true);

      const errors = validateFormData(formData);
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/v1/project/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormErrors({});
      alert('Project added successfully');
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        console.error('Server responded with status code:', error.response.status);
        console.error('Error message from server:', error.response.data.message);
      } else {
        console.error('Error message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const validateFormData = (formData) => {
    const errors = {};
    // Validasi setiap field sesuai kebutuhan
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.year) {
      errors.year = 'Year is required';
    }
    if (!formData.pid) {
      errors.pid = 'pid is required';
    }
    if (!formData.description) {
      errors.description = 'description is required';
    }
    if (!formData.customer) {
      errors.customer = 'customer is required';
    }
    if (!formData.sales) {
      errors.sales = 'sales is required';
    }
    if (!formData.status) {
      errors.status = 'status is required';
    }
    if (!formData.contract_no) {
      errors.contract_no = 'contract_no is required';
    }
    if (!formData.contract_date) {
      errors.contract_date = 'contract_date is required';
    }
    if (!formData.amount_exc_tax) {
      errors.amount_exc_tax = 'amount_exc_tax is required';
    }
    if (!formData.amount_tax) {
      errors.amount_tax = 'amount_tax is required';
    }

    return errors;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    // Logic for next step, if any
  };

  return (
    <div>
      <h2>Project Initial</h2>
      <form onSubmit={handleSave}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Year:
          <input type="number" name="year" value={formData.year} onChange={handleInputChange} />
        </label>
        <label>
          PID:
          <input type="text" name="pid" value={formData.pid} onChange={handleInputChange} />
        </label>
        <label>
          TOP (Term of Payment):
          <input type="text" name="top" value={formData.top} onChange={handleInputChange} />
        </label>
        <label>
          Sales:
          <select name="sales" value={formData.sales} onChange={handleInputChange}>
            <option value="">Select Sales</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.email}</option>
            ))}
          </select>
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <label>
          Customer:
          <select name="customer" value={formData.customer} onChange={handleInputChange}>
            <option value="">Select Customer</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
        </label>
        <label>
          Contract No:
          <input type="text" name="contract_no" value={formData.contract_no} onChange={handleInputChange} />
        </label>
        <label>
          Contract Date:
          <input type="date" name="contract_date" value={formData.contract_date} onChange={handleInputChange} />
        </label>
        <label>
          Amount Tax:
          <input type="number" name="amount_tax" value={formData.amount_tax} onChange={handleInputChange} />
        </label>
        <label>
          Amount Exc Tax:
          <input type="number" name="amount_exc_tax" value={formData.amount_exc_tax} onChange={handleInputChange} />
        </label>

        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="">Select Status</option>
            <option value="On Going">On Going</option>
            <option value="Overdue">Overdue</option>
            <option value="Waiting">Waiting</option>
            <option value="Done">Done</option>
          </select>
        </label>

        {formErrors.name && <span>{formErrors.name}</span>}
        {formErrors.year && <span>{formErrors.year}</span>}
        {formErrors.pid && <span>{formErrors.pid}</span>}
        {formErrors.description && <span>{formErrors.description}</span>}
        {formErrors.customer && <span>{formErrors.customer}</span>}
        {formErrors.sales && <span>{formErrors.sales}</span>}
        {formErrors.status && <span>{formErrors.status}</span>}
        {formErrors.contract_no && <span>{formErrors.contract_no}</span>}
        {formErrors.contract_date && <span>{formErrors.contract_date}</span>}
        {formErrors.amount_exc_tax && <span>{formErrors.amount_exc_tax}</span>}
        {formErrors.amount_tax && <span>{formErrors.amount_tax}</span>}


        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <br />
        <button type="button" onClick={handleNextStep}>Next Step</button>
      </form>
      {formErrors.general && <p>{formErrors.general}</p>}
    </div>
  );
};

export default ProjectInitialForm;

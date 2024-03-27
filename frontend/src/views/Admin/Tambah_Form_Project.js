import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from './../../context/AuthContext';

const Form_Tambah_Project = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [formData, setFormData] = useState({
    year: '',
    pid: '',
    name: '',
    description: '',
    customer: '',
    sales: '',
    amount_tax: '',
    amount_exc_tax: '',
    contract_no: '',
    contract_date: '',
    am: '',
    pic: '',
    pm: '',
    start_date: '',
    end_date: '',
    status: '',
    top: '',
    sow: '',
    oos: '',
    detail: '',
    remarks: '',
    weight: '',
    priority: '',
    type: '',
    market_segment: '',
    tech_use: '',
    resiko: '',
    beban_proyek: '',
    completion_percentage: '',
    engineers: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [priorityOptions] = useState([
    'tinggi',
    'sedang',
    'rendah',
  ]);
  const [statusOptions] = useState([
    'On Going',
    'Overdue',
    'Waiting',
    'Done',
  ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const usersResponse = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const clientsResponse = await axios.get('http://localhost:8000/api/v1/client/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(usersResponse.data);
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [authContext.authTokens]);

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;
  
    // For engineers field, check if it's multiple selection
    if (name === "engineers") {
      const selectedOptions = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: selectedOptions,
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = authContext.authTokens ? authContext.authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        // For engineers, append each ID in the array
        if (key === 'engineers') {
          value.forEach(engineerId => {
            formDataToSend.append('engineers', engineerId);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });

      await axios.post('http://localhost:8000/api/v1/project/', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      
      setFormData({
        year: '',
        pid: '',
        name: '',
        description: '',
        customer: '',
        sales: '',
        amount_tax: '',
        amount_exc_tax: '',
        contract_no: '',
        contract_date: '',
        am: '',
        pic: '',
        pm: '',
        start_date: '',
        end_date: '',
        status: '',
        top: '',
        sow: '',
        oos: '',
        detail: '',
        remarks: '',
        weight: '',
        priority: '',
        type: '',
        market_segment: '',
        tech_use: '',
        resiko: '',
        beban_proyek: '',
        completion_percentage: '',    
        engineers: [],
      });

      setError(null);

      history.push('/project-admin');
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
    return (
      <form onSubmit={handleSubmit}>  
        <label>
          Year:
          <input type="date" name="year" value={formData.year} onChange={handleInputChange} />
        </label>

        <label>
          PID:
          <input type="text" name="pid" value={formData.pid} onChange={handleInputChange} />
        </label>

        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
        </label>

        <label>
          Customer:
          <select name="customer" value={formData.customer} onChange={handleInputChange}>
            <option value="">Select Customer</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sales:
          <select name="sales" value={formData.sales} onChange={handleInputChange}>
            <option value="">Select Sales</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name}
              </option>
            ))}
          </select>
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
          Contract No:
          <input type="text" name="contract_no" value={formData.contract_no} onChange={handleInputChange} />
        </label>

        <label>
          Contract Date:
          <input type="date" name="contract_date" value={formData.contract_date} onChange={handleInputChange} />
        </label>

        <label>
          AM:
          <select name="am" value={formData.am} onChange={handleInputChange}>
            <option value="">Select AM</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          PIC:
          <select name="pic" value={formData.pic} onChange={handleInputChange}>
            <option value="">Select PIC</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name}
              </option>
            ))}
          </select>
        </label>

        <label>
          PM:
          <select name="pm" value={formData.pm} onChange={handleInputChange}>
            <option value="">Select PM</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name}
              </option>
            ))}
          </select>
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
          Status:
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="">Select Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          TOP:
          <input type="text" name="top" value={formData.top} onChange={handleInputChange} />
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
          <input type="text" name="detail" value={formData.detail} onChange={handleInputChange} />
        </label>

        <label>
          Remarks:
          <input type="text" name="remarks" value={formData.remarks} onChange={handleInputChange} />
        </label>

        <label>
          Weight:
          <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} />
        </label>

        <label>
          Priority:
          <select name="priority" value={formData.priority} onChange={handleInputChange}>
            <option value="">Select Priority</option>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
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
          Tech Use:
          <textarea name="tech_use" value={formData.tech_use} onChange={handleInputChange}></textarea>
        </label>

        <label>
          Risk:
          <input type="text" name="resiko" value={formData.resiko} onChange={handleInputChange} />
        </label>

        <label>
          Project Load:
          <input type="number" name="beban_proyek" value={formData.beban_proyek} onChange={handleInputChange} />
        </label>

        <label>
          Completion Percentage:
          <input type="number" name="completion_percentage" value={formData.completion_percentage} onChange={handleInputChange} />
        </label>

        <label>
          Engineers:
          <select name="engineers" multiple value={formData.engineers} onChange={handleInputChange}>
            <option value="">Select Engineers</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
    );
  };
  
  export default Form_Tambah_Project;
  
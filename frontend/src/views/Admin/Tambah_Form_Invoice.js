import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from './../../context/AuthContext';

const Tambah_Form_Invoice = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [formData, setFormData] = useState({
    project: '',
    to_contact: '',
    sent_date: '',
    due_date: '',
    date: '',
    amount: '',
    status: '',
    note: '',
    document_file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [statusOptions] = useState([
    'belum dibayar',
    'dibayar',
    'overdue',
    // Add other status options as needed
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        // Fetch projects
        const projectsResponse = await axios.get('http://localhost:8000/api/v1/project/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Fetch clients
        const clientsResponse = await axios.get('http://localhost:8000/api/v1/client/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects(projectsResponse.data);
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [authContext.authTokens]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document_file: e.target.files[0] });
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
        formDataToSend.append(key, value);
      });

      await axios.post('http://localhost:8000/api/v1/invoice/', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      
      setFormData({
        project: '',
        to_contact: '',
        sent_date: '',
        due_date: '',
        date: '',
        amount: '',
        status: '',
        note: '',
        document_file: null,
      });

      setError(null);

      history.push('/invoice-admin');
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
        Project:
        <select name="project" value={formData.project} onChange={handleInputChange}>
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </label>
  
      <label>
        To Contact:
        <select name="to_contact" value={formData.to_contact} onChange={handleInputChange}>
          <option value="">Select To Contact</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </label>
  
        <label>
          Sent Date:
          <input type="date" name="sent_date" value={formData.sent_date} onChange={handleInputChange} />
        </label>
  
        <label>
          Due Date:
          <input type="date" name="due_date" value={formData.due_date} onChange={handleInputChange} />
        </label>
  
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
        </label>
  
        <label>
          Amount:
          <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} />
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
          Note:
          <textarea name="note" value={formData.note} onChange={handleInputChange}></textarea>
        </label>
  
        <label>
        Document File:
        <input type="file" name="document_file" onChange={handleFileChange} />
      </label>
  
      <button type="submit" disabled={loading}>
        Submit
      </button>
      </form>
    );
  };
  
  export default Tambah_Form_Invoice;
  
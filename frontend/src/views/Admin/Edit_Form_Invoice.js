import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useInvoiceContext } from './../../context/InvoiceContext';
import AuthContext from '../../context/AuthContext';

const InvoiceEditForm = () => {
  const history = useHistory();
  const { authTokens } = useContext(AuthContext);
  const { invoiceId } = useParams();
  const { error, loading, fetchData } = useInvoiceContext() || {};

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
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const projectsResponse = await axios.get('http://localhost:8000/api/v1/project/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const clientsResponse = await axios.get('http://localhost:8000/api/v1/client/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const response = await axios.get(`http://localhost:8000/api/v1/invoice/edit/${invoiceId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setProjects(projectsResponse.data);
        setClients(clientsResponse.data);

        setFormData({
          project: data.project || '',
          to_contact: data.to_contact || '',
          sent_date: data.sent_date || '',
          due_date: data.due_date || '',
          date: data.date || '',
          amount: data.amount || '',
          status: data.status || '',
          note: data.note || '',
          document_file: data.document_file || null,
        });
      } catch (error) {
        console.error('Error fetching invoice data:', error.message);
      }
    };

    fetchData();
  }, [authTokens, invoiceId]);

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
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const formDataForUpload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataForUpload.append(key, value);
      });

      const response = await axios.put(
        `http://localhost:8000/api/v1/invoice/edit/${invoiceId}/`,
        formDataForUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      history.push('/invoice-admin');

      if (response.status === 200) {
        console.log('Invoice updated successfully!');
        // Perform any additional actions upon successful update
      } else {
        console.error('Failed to update invoice:', response.statusText);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error updating invoice:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
        <input
          type="file"
          name="document_file"
          onChange={handleFileChange}
        />
      </label>

      <button type="submit">Save Changes</button>
    </form>
  );
};

export default InvoiceEditForm;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from './../../context/AuthContext';

const Form_Tambah_Payment = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const [formData, setFormData] = useState({
    project: '',
    payer_name: '',
    payer_account_number: '',
    receiver_name: '',
    receiver_account_number: '',
    amount: '',
    note: '',
    payment_date: '',
    document_file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
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


        setProjects(projectsResponse.data);
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

      await axios.post('http://localhost:8000/api/v1/payment/', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      
      setFormData({
        project: '',
        payer_name: '',
        payer_account_number: '',
        receiver_name: '',
        receiver_account_number: '',
        amount: '',
        note: '',
        payment_date: '',
        document_file: null,
      });

      setError(null);

      history.push('/payment-admin');
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
          Payer:
          <input type="text" name="payer_name" value={formData.payer_name} onChange={handleInputChange}></input>
        </label>
  
        <label>
          Payer Account :
          <input type="number" name="payer_account_number" value={formData.payer_account_number} onChange={handleInputChange} />
        </label>
  
        <label>
          Receiver:
          <input type="text" name="receiver_name" value={formData.receiver_name} onChange={handleInputChange} />
        </label>
  
        <label>
          Receiver Account:
          <input type="number" name="receiver_account_number" value={formData.receiver_account_number} onChange={handleInputChange} />
        </label>
  
        <label>
          Amount:
          <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} />
        </label>
  
        <label>
          Date:
          <input type="date" name="payment_date" value={formData.payment_date} onChange={handleInputChange} />
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
  
  export default Form_Tambah_Payment;
  
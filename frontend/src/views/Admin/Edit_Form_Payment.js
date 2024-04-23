import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { usePaymentContext } from './../../context/PaymentContext';
import AuthContext from '../../context/AuthContext';

const PaymentEditForm = () => {
  const history = useHistory();
  const { authTokens } = useContext(AuthContext);
  const { paymentId } = useParams();
  const { error, loading, fetchData } = usePaymentContext() || {};

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
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const projectsResponse = await axios.get('http://localhost:8000/api/v1/project/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        const response = await axios.get(`http://localhost:8000/api/v1/payment/edit/${paymentId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setProjects(projectsResponse.data);

        setFormData({
          project: data.project || '',
          payer_name: data.payer_name || '',
          payer_account_number: data.payer_account_number || '',
          receiver_name: data.receiver_name || '',
          receiver_account_number: data.receiver_account_number || '',
          amount: data.amount || '',
          note: data.note || '',
          payment_date: data.payment_date || '',
          document_file: data.document_file || null,
        });
      } catch (error) {
        console.error('Error fetching invoice data:', error.message);
      }
    };

    fetchData();
  }, [authTokens, paymentId]);

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
        `http://localhost:8000/api/v1/payment/edit/${paymentId}/`,
        formDataForUpload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      history.push('/payment-admin');

      if (response.status === 200) {
        console.log('payment updated successfully!');
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

export default PaymentEditForm;

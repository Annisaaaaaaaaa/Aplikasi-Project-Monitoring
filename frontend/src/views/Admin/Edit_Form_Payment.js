import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { usePaymentContext } from './../../context/PaymentContext';
import AuthContext from '../../context/AuthContext';
import Swal from 'sweetalert2';

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import '../../Css/edit_payment.css';

import { Link } from 'react-router-dom';
import bill from '../../images/bill.png';
import money from '../../images/money.png';
import next from '../../images/next.png';


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
    type: '',
    no_invoice: '',
    name: '',
    note: '',
    payment_date: '',
    document_file: '',
  });

  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [typeOptions] = useState([
    'billing to customer',
    'billing from subcon',
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

        const invoiceResponse = await axios.get('http://localhost:8000/api/v1/invoice/', {
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
        setInvoices(invoiceResponse.data);

        setFormData({
          project: data.project || '',
          payer_name: data.payer_name || '',
          payer_account_number: data.payer_account_number || '',
          receiver_name: data.receiver_name || '',
          receiver_account_number: data.receiver_account_number || '',
          amount: data.amount || '',
          type: data.type || '',
          no_invoice: data.no_invoice || '',
          name: data.name || '',
          note: data.note || '',
          payment_date: data.payment_date || '',
          document_file: '', // No need to set document_file here
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
    // No need to directly set formData.document_file here
    // We handle adding the file to FormData in handleSubmit
    setFormData({ ...formData, document_file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const confirmed = await confirmBeforeSubmit();
        if (!confirmed) {
            return;
      }

      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const formDataForUpload = new FormData();
  
      // Add all fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        formDataForUpload.append(key, value);
      });
  
      // Add new file if present
      if (formData.document_file) {
        formDataForUpload.append('document_file', formData.document_file);
      }

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

  const confirmBeforeSubmit = async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to add this document?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add it!',
    });

    return result.isConfirmed;
};

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
    <Sidebar />
    <Navbar />

    <div className="navbar-edt-payment">
    
    {/* END NAVBAR SECTION */}
    <div className="parent-edt-payment">
      {/* FORM SECTION */}
      <div className="con-left-edt-payment">
        <div className="header-edt-payment">
          <div className="icon-edt-payment">
            <img src={bill} alt="Logo" />
          </div>
          <div className="text-1-edt-payment">EDIT PAYMENT.</div>
          <p className="ket-edt-payment">Form di bawah wajib di isi semua.</p>
        </div>
        <button className="back-edt-payment">
              <Link to="/payment-admin">
                  <img src={next} alt="Logo" />
                  Back
              </Link>
          </button>
        <div className="form-group-edt-payment">
          <span className="name-edt-payment">Name</span>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            className="f-name" 
            placeholder="Enter your name" 
          />
        </div>
        <div className="form-group-edt-payment">
          <span className="name2-edt-payment">Project</span>
          <select 
            className="f-name2-edt-payment" 
            name="project" 
            value={formData.project} 
            onChange={handleInputChange}>
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="c-dropdown-edt-payment">
          <div className="projek-edt-payment">
            <span>Invoice</span>
            <select 
              className="dropdown-edt-payment" 
              name="no_invoice" value={formData.no_invoice} onChange={handleInputChange}>
                <option value="">Select Invoice</option>
                {invoices.map((invoice) => (
                  <option key={invoice.id} value={invoice.id}>
                    {invoice.no_invoice}
                  </option>
                ))}
            </select>
          </div>
          <div className="status-edt-payment">
            <span>Type</span>
            <select 
              className="dropdown-2-edt-payment" 
              name="type" value={formData.type} onChange={handleInputChange}>
                <option value="">Select Type</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>
          <div className="penerima-edt-payment">
            <span className="namep-edt-payment">Nama Penerima</span>
            <input 
              type="text" 
              id="p-namep" 
              className="p-namep-edt-payment" 
              placeholder="Enter your name" 
              name="receiver_name" value={formData.receiver_name} onChange={handleInputChange} 
            />
          </div>
          <div className="rekening-edt-payment">
            <span className="namer-edt-payment">Nomor Rekening Penerima</span>
            <input 
              type="number" name="receiver_account_number" 
              value={formData.receiver_account_number} onChange={handleInputChange}
              id="p-namer" 
              className="p-namer-edt-payment" 
              placeholder="Enter your name" 
            />
          </div>
          <div className="upload-edt-payment">
            <span>Upload Bukti Pembayaran</span>
            <div className="file-input-container-edt-payment">
                <label htmlFor="file-input" className="label-file-edt-payment">Upload</label>
                <input 
                  id="file-input" 
                  type="file" 
                  name="document_file" onChange={handleFileChange}
                />
                <span id="file-name"></span>
            </div>
          </div>
          <div className="note-edt-payment">
            <span>Note</span>
            <form action="/submit" method="post">
              <textarea 
                className="deskripsiField-edt-payment" 
                name="note" value={formData.note} onChange={handleInputChange}
                placeholder="Masukkan deskripsi di sini..."
              ></textarea>
            </form>
          </div>
        </div>
      </div>
      {/* END FORM SECTION */}
      {/* PROGRESS SECTION */}
      <div className="bg-edt-payment">
       <img src={money} alt="Logo" />
      </div>
      <div className="con-rigth-edt-payment">
        <div className="bg-atas-edt-payment">
          <span></span>
        </div>
        <div className="bg-bawah-edt-payment">
          <span>PAYER INFO.</span>
          <p className="text-2-edt-payment">Payer Name</p>
          <input 
            type="text" 
            id="customer" 
            className="f-customer" 
            placeholder="Ex. Aku Bank BJB" 
            name="payer_name"
            value={formData.payer_name} onChange={handleInputChange}
          />
          <p className="text-an-edt-payment">Account Number</p>
          <input 
            type="number" name="payer_account_number" 
            value={formData.payer_account_number} onChange={handleInputChange} 
            id="customer" 
            className="an-customer-edt-payment" 
            placeholder="Ex. Aku Bank BJB" 
          />
          <p className="text-mount-edt-payment">Amount</p>
          <input 
            type="number" name="amount" 
            value={formData.amount} onChange={handleInputChange}
            id="customer" 
            className="mount-customer-edt-payment" 
            placeholder="Ex. Aku Bank BJB" 
          />
          <p className="text-date-edt-payment">Date</p>
          <input 
            type="date" 
            id="customer" 
            className="date-customer-edt-payment" 
            placeholder="Ex. Aku Bank BJB" 
            name="payment_date" value={formData.payment_date} onChange={handleInputChange}
          />
          <button className="save-edt-payment" onClick={handleSubmit}>Save</button>
        </div>
        <div className="bbawah-edt-payment">
          <svg width="373" height="57" viewBox="0 0 373 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.701172 0.0275879H372.534V43.9234C372.534 51.1031 366.714 56.9234 359.534 56.9234H25.7011C11.894 56.9234 0.701172 45.7305 0.701172 31.9234V0.0275879Z" fill="url(#paint0_linear_2093_439)" />
            <defs>
              <linearGradient id="paint0_linear_2093_439" x1="228.271" y1="14.7081" x2="228.271" y2="92.9608" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C6CFEA" />
                <stop offset="0.697368" stopColor="#9AAAD4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      {/* END PROGRESS SECTION */}
      <div className="bg1-edt-payment"></div>
      <div className="bg2-edt-payment"></div>
      <div className="bg3-edt-payment"></div>
    </div>
  </div>
  </div>

  );
};

export default PaymentEditForm;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from './../../context/AuthContext';
import Swal from 'sweetalert2';

import Sidebar from './../../component/sidebar';
import Navbar from './../../component/header';
import '../../Css/add_payment.css';

import { Link } from 'react-router-dom';
import bill from '../../images/bill.png';
import money from '../../images/money.png';
import next from '../../images/next.png';

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
    type: '',
    no_invoice: '',
    name: '',
    note: '',
    payment_date: '',
    document_file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [typeOptions] = useState([
    'billing to customer',
    'billing from subcon',
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

        // Fetch projects
        const invoiceResponse = await axios.get('http://localhost:8000/api/v1/invoice/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        setProjects(projectsResponse.data);
        setInvoices(invoiceResponse.data);
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
      const confirmed = await confirmBeforeSubmit();
        if (!confirmed) {
            return;
      }

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
        type: '',
        no_invoice: '',
        name: '',
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
  
    return (
      <div>
        <Sidebar />
      <Navbar />

      <div className="navbar">
      
      {/* END NAVBAR SECTION */}
      <div className="parent">
        {/* FORM SECTION */}
        <div className="con-left">
          <div className="header">
            <div className="icon">
              <img src={bill} alt="Logo" />
            </div>
            <div className="text-1">ADD PAYMENT.</div>
            <p className="ket">Form di bawah wajib di isi semua.</p>
          </div>
          <button className="back">
                <Link to="/payment-admin">
                    <img src={next} alt="Logo" />
                    Back
                </Link>
            </button>
          <div className="form-group">
            <span className="name">Name</span>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              className="f-name" 
              placeholder="Enter your name" 
            />
          </div>
          <div className="form-group">
            <span className="name2">Project</span>
            <select 
              className="f-name2" 
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
          <div className="c-dropdown">
            <div className="projek">
              <span>Invoice</span>
              <select 
                className="dropdown" 
                name="no_invoice" value={formData.no_invoice} onChange={handleInputChange}>
                <option value="">Select Invoice</option>
                {invoices.map((invoice) => (
                  <option key={invoice.id} value={invoice.id}>
                    {invoice.no_invoice}
                  </option>
                ))}
              </select>
            </div>
            <div className="status">
              <span>Type</span>
              <select 
                className="dropdown-2" 
                name="type" value={formData.type} onChange={handleInputChange}>
                <option value="">Select Type</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="penerima">
              <span className="namep">Nama Penerima</span>
              <input 
                type="text" 
                id="p-namep" 
                className="p-namep" 
                placeholder="Enter your name" 
                name="receiver_name" value={formData.receiver_name} onChange={handleInputChange} 
              />
            </div>
            <div className="rekening">
              <span className="namer">Nomor Rekening Penerima</span>
              <input 
                type="number" name="receiver_account_number" 
                value={formData.receiver_account_number} onChange={handleInputChange}
                id="p-namer" 
                className="p-namer" 
                placeholder="Enter your name" 
              />
            </div>
            <div className="upload">
              <span>Upload Bukti Pembayaran</span>
              <div className="file-input-container">
                  <label htmlFor="file-input" className="label-file">Upload</label>
                  <input 
                    id="file-input" 
                    type="file" 
                    name="document_file" onChange={handleFileChange}
                  />
                  <span id="file-name"></span>
              </div>
            </div>
            <div className="note">
              <span>Note</span>
              <form action="/submit" method="post">
                <textarea 
                  className="deskripsiField" 
                  name="note" value={formData.note} onChange={handleInputChange}
                  placeholder="Masukkan deskripsi di sini..."
                ></textarea>
              </form>
            </div>
          </div>
        </div>
        {/* END FORM SECTION */}
        {/* PROGRESS SECTION */}
        <div className="bg">
         <img src={money} alt="Logo" />
        </div>
        <div className="con-rigth">
          <div className="bg-atas">
            <span></span>
          </div>
          <div className="bg-bawah">
            <span>PAYER INFO.</span>
            <p className="text-2">Payer Name</p>
            <input 
              type="text" 
              id="customer" 
              className="f-customer" 
              placeholder="Ex. Aku Bank BJB" 
              name="payer_name"
              value={formData.payer_name} onChange={handleInputChange}
            />
            <p className="text-an">Account Number</p>
            <input 
              type="number" name="payer_account_number" 
              value={formData.payer_account_number} onChange={handleInputChange} 
              id="customer" 
              className="an-customer" 
              placeholder="Ex. Aku Bank BJB" 
            />
            <p className="text-mount">Amount</p>
            <input 
              type="number" name="amount" 
              value={formData.amount} onChange={handleInputChange}
              id="customer" 
              className="mount-customer" 
              placeholder="Ex. Aku Bank BJB" 
            />
            <p className="text-date">Date</p>
            <input 
              type="date" 
              id="customer" 
              className="date-customer" 
              placeholder="Ex. Aku Bank BJB" 
              name="payment_date" value={formData.payment_date} onChange={handleInputChange}
            />
            <button className="save" onClick={handleSubmit}>Save</button>
          </div>
          <div className="bbawah">
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
        <div className="bg1"></div>
        <div className="bg2"></div>
        <div className="bg3"></div>
      </div>
    </div>
    </div>

    );
  };
  
  export default Form_Tambah_Payment;
  
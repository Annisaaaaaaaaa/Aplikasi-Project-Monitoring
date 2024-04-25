import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useInvoiceContext } from './../../context/InvoiceContext';
import AuthContext from '../../context/AuthContext';
import Swal from 'sweetalert2';

import Sidebar from './../../component/sidebar';
import Navbar from './../../component/header';
import '../../Css/edit_invoice.css';

import { Link } from 'react-router-dom';
import bill from '../../images/bill.png';
import next from '../../images/next.png';
import iconbg from '../../images/icon-bg.png';

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
    type: '',
    purchase_order: '',
    no_invoice: '',
    name: '',
    note: '',
    document_file: '',
  });

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [statusOptions] = useState([
    'belum dibayar',
    'dibayar',
    'overdue',
    // Add other status options as needed
  ]);
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
          type: data.type || '',
          purchase_order: data.purchase_order || '',
          no_invoice: data.no_invoice || '',
          name: data.name || '',
          note: data.note || '',
          document_file: '', // No need to set document_file here
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
      
      <div className="bungkus-edit-inv">
        <div className="bungkuss-edit-inv">
          <div className="con-kiri-edit-inv">
            <div className="header">
              <div className="ikon-edit-inv">
              <img src={bill} alt="Logo" />
              </div>
              <div className="header-edit-inv">EDIT INVOICE.</div>
              <p className="isi-edit-inv">Masukkan data terkait Invoice.</p>
            </div>
            <button className="back-inv">
                <Link to="/invoice-admin">
                    <img src={next} alt="Logo" />
                    Back
                </Link>
            </button>
            <div className="form-group">
              <span className="nama-edit-inv">Name</span>
              <input type="text" id="name" className="isi-name-edit-inv" placeholder="Enter your name" value={formData.name} onChange={handleInputChange} name="name" />
            </div>
            <div className="form-group">
              <span className="nama-p-edit-inv">Project</span>
              <select className="drop-3-edit-inv" name="project" value={formData.project} onChange={handleInputChange}>
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="c-dropdown">
              <div className="in-edit-inv">
                <span>Invoice Number</span>
                <input type="number" id="numberInput" className="drop-edit-inv" value={formData.no_invoice} onChange={handleInputChange} name="no_invoice" placeholder="Ex. 0123" />
              </div>
              <div className="stat-edit-inv">
                <span>Status</span>
                <select className="drop-2-edit-inv" name="status" value={formData.status} onChange={handleInputChange}>
                <option value="">Select Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
                </select>
              </div>
              <div className="upf-edit-inv">
                <span>Upload Faktur</span>
                <div className="upload-faktur-file-edit-inv">
                  <label htmlFor="file-input" className="faktur-label-file">Upload</label>
                  <input 
                    id="file-input" 
                    type="file" 
                    name="document_file" 
                    onChange={handleFileChange} 
                  />
                  <span id="file-name"></span>
                </div>
              </div>
              <div className="notes-edit-inv">
                <span>Note</span>
                <textarea className="deskField-edit-inv" name="note" placeholder="Masukkan deskripsi di sini..." value={formData.note} onChange={handleInputChange}></textarea>
              </div>
            </div>
          </div>
          <div className="bg-invoice-edit-inv">
            <img src={iconbg} alt="paper" />
          </div>

          <div className="con-kanan-edit-inv">
            <div className="atas-edit-inv">
              <div className="custom-infoo-edit-inv">CUSTOMER INFO.</div>
            </div>
            <div className="bawah-edit-inv">
            <div className="form-group">
              <p className="inv-type-edit-inv">Invoice Type</p>
              <select className="drop-inv-edit-inv" name="status" onChange={handleInputChange}>
              <option value="">Select Type</option>
              {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
                <p className="client-name-edit-inv">Receiver</p>
                <select className="drop-cn" name="to_contact" value={formData.to_contact} onChange={handleInputChange}>
                <option value="">Select To Contact</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>

              <p className="send-inv">Send Date</p>
              <input type="date" id="sendd" name="sent_date" className="inv-send-input" value={formData.sent_date} onChange={handleInputChange} />

              <p className="due-inv">Due Date</p>
              <input type="date" id="due" name="due_date" className="duee-inv" value={formData.due_date} onChange={handleInputChange} />

              <p className="dat-inv">Date</p>
                <input type="date" name="date" className="datt-inv" value={formData.date} onChange={handleInputChange} />

              <p className="nopo">PO</p>
              <input type="text" id="name" className="no-po" placeholder="Enter your name" name="purchase_order" value={formData.purchase_order} onChange={handleInputChange}/>

              <p className="am-inv">Amount</p>
              <input type="number" id="numberInput" className="inv-number-input" value={formData.amount} onChange={handleInputChange} name="amount" placeholder="Ex. 0123"/>

              <button className="save-inv-edit-inv" onClick={handleSubmit}>
               {/* <img src={add} alt="Logo" /> */}
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default InvoiceEditForm;

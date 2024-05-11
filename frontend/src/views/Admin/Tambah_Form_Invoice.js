import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AuthContext from './../../context/AuthContext';
import Swal from 'sweetalert2';

import Sidebar from './../../component/sidebar';
import Navbar from './../../component/header';
import '../../Css/add_invoice.css';

import { Link } from 'react-router-dom';
import bill from '../../images/bill.png';
import next from '../../images/next.png';
import iconbg from '../../images/icon-bg.png';


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
    type: '',
    purchase_order: '',
    no_invoice: '',
    name: '',
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
        type: '',
        purchase_order: '',
        no_invoice: '',
        name: '',
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

  const confirmBeforeSubmit = async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to add this invoice?',
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
      
      <div className="bungkus">
        <div className="bungkuss">
          <div className="con-kiri">
            <div className="header">
              <div className="ikon">
              <img src={bill} alt="Logo" />
              </div>
              <div className="add">ADD INVOICE.</div>
              <p className="isi">Masukkan data terkait Invoice.</p>
            </div>
            <button className="back-inv">
                <Link to="/invoice-admin">
                    <img src={next} alt="Logo" />
                    Back
                </Link>
            </button>
            <div className="form-group">
              <span className="nama">Name</span>
              <input type="text" id="name" className="isi-name" placeholder="File Name" value={formData.name} onChange={handleInputChange} name="name" />
            </div>
            <div className="form-group">
              <span className="nama-p">Project</span>
                <select className="drop-3" name="project" value={formData.project} onChange={handleInputChange}>
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="c-dropdown">
              <div className="in">
                <span>Invoice Number</span>
                <input type="number" id="numberInput" className="drop" value={formData.no_invoice} onChange={handleInputChange} name="no_invoice" placeholder="Ex. DS/01/2024" />
              </div>
              <div className="stat">
                <span>Status</span>
                <select className="drop-2" name="status" value={formData.status} onChange={handleInputChange}>
                <option value="">Select Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
                </select>
              </div>
              <div className="upf">
                <span>Upload Faktur</span>
                <div className="upload-faktur-file">
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
              <div className="notes">
                <span>Note</span>
                <textarea className="deskField" name="note" placeholder="Masukkan deskripsi di sini..." value={formData.note} onChange={handleInputChange}></textarea>
              </div>
            </div>
          </div>
          <div className="bg-invoice">
            <img src={iconbg} alt="paper" />
          </div>

          <div className="con-kanan">
            <div className="atas">
              <div className="custom-infoo">CUSTOMER INFO.</div>
            </div>
            <div className="bawah">
            <div className="form-group">
              <p className="inv-type">Invoice Type</p>
              <select className="drop-inv" name="status" onChange={handleInputChange}>
              <option value="">Select Type</option>
              {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
                </select>
            </div>
                <p className="client-name">Client Name</p>
              <select className="drop-cn" name="to_contact" value={formData.to_contact} onChange={handleInputChange}>
                <option value="">Select Client Name</option>
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
              <input type="text" id="name" className="no-po" placeholder="Purchase Order" name="purchase_order" value={formData.purchase_order} onChange={handleInputChange}/>

              <p className="am-inv">Amount</p>
              <input type="number" id="numberInput" className="inv-number-input" value={formData.amount} onChange={handleInputChange} name="amount" placeholder="Ex. 0123"/>

              <button className="save-inv" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
  };
  
  export default Tambah_Form_Invoice;
  
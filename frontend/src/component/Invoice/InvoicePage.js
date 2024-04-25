import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import '../../Css/detail_invoice.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFileAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useInvoiceContext } from './../../context/InvoiceContext';
import Swal from 'sweetalert2';

import po from '../../images/po.png';
import gc2 from '../../images/gc.png';
import inv from '../../images/inv.png';
import bc from '../../images/bc.png';
import pw2 from '../../images/pw.png';
import os2 from '../../images/os.png';
import delet from '../../images/Delete.png';
import pencil from '../../images/Pencil.png';
import chip from '../../images/Chip.png';

const DetailFormInvoice = () => {
    const { invoices, editInvoice, deleteInvoice } = useInvoiceContext();
  const history = useHistory();
  const { authTokens } = useContext(AuthContext);
  const { invoiceId } = useParams();
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
    document_file: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      uploadFile(selectedFile);
    }
  };

  const uploadFile = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await axios.post('http://localhost:8000/api/v1/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(progress);
        },
      });
      console.log('Upload success:', response.data);
      setProgress(0);
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setError('Error uploading file');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Lakukan pengecekan token dan kirim data form dengan axios
      history.push('/payment-admin');
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (invoiceId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to edit this document.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!',
    }).then((result) => {
        if (result.isConfirmed) {
            const newData = {};
            editInvoice(invoiceId, newData);
            history.push(`/invoice-edit/${invoiceId}/`);
        }
    });
};


const confirmDelete = (invoiceId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this document!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteInvoice(invoiceId);
            Swal.fire('Deleted!', 'Your document has been deleted.', 'success');
        }
    });
  };

  return (
    <div>
      <Sidebar />
      <Navbar />

      {/* Tampilkan pesan error jika ada */}
      {error && <div className="error-message">{error}</div>}

      <div className="navbar-inv">
        {/* Tampilkan form dan tampilan progress */}
        <div className="parent-inv">
          <div className="con-left-inv">
            <div className="wrapper-inv">
              <header>File Uploader</header>
              <form>
                <input className="file-input-inv" type="file" name="file" onChange={handleFileChange} hidden />
                <FontAwesomeIcon icon={faCloudUploadAlt} />
                <p>Browse File to Upload</p>
              </form>
              <section className={`progress-area-inv ${uploading ? 'onprogress' : ''}`}>
                <ul className="progress-details-inv">
                  <li className="row-inv">
                    <FontAwesomeIcon icon={faFileAlt} />
                    <div className="content-inv">
                      <div className="details-inv">
                        <span className="name-inv">{file && file.name} • Uploading</span>
                        <span className="percent-inv">{progress}%</span>
                      </div>
                      <div className="progress-bar-inv">
                        <div className="progress-inv" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              <section className="uploaded-area-inv">
                <ul>
                  {uploading ? null : (
                    <li className="row-inv">
                      <div className="content upload-inv">
                        <FontAwesomeIcon icon={faFileAlt} />
                        <div className="details-inv">
                          <span className="name-inv">{file && file.name} • Uploaded</span>
                          <span className="size-inv">{file && (file.size < 1024 ? `${file.size} KB` : `${(file.size / (1024 * 1024)).toFixed(2)} MB`)}</span>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faCheck} />
                    </li>
                  )}
                </ul>
              </section>
            </div>
          </div>
          <div className="con-rigth-inv">
            <div className="re1-inv">
              <img src={po} alt="Logo" className="icon-inv" />
              <div className="header1-inv">PEMBAYARAN {formData.project} BATCH 2 PER TANGGAL {formData.date}</div>
              <div className="complete-inv">{formData.status}</div>
              <div className="header2-inv">{formData.type}
                <span/>{formData.no_invoice}<span/>
              </div>
              <button className="back-inv">Back</button>
              <img src={gc2} alt="Logo" className="ic-1-inv" />
              <div className="text-1-inv">Project</div>
              <div className="ans-1-inv">{formData.project}</div>
              <div className="ic-2-inv">
                <img src={inv} alt="Logo" />
              </div>
              <div className="text-2-inv">Invoice</div>
              <div className="ans-2-inv">{formData.no_invoice}</div>
              <div className="ic-3-inv">
                <img src={bc} alt="Logo" />
              </div>
              <div className="text-3-inv">Receiver</div>
              <div className="ans-3-inv">{formData.to_contact}</div>
              {invoices.map((invoice) => (
              <div key={invoice.id} value={invoice.id}>
                <button className="delete-inv" onClick={() => confirmDelete(invoice.id)}>
                <img src={delet} alt="Logo" />
              </button>
              <button className="edit-inv" onClick={() => handleEdit(invoice.id)}>
                <img src={pencil} alt="Logo" />
              </button>
              </div>
            ))}
              
            </div>
            <div className="re2-inv">
              <div className="icon-re2-inv">
                <img src={chip} alt="Logo" />
              </div>
              <div className="nominal-inv">{formData.amount}</div>
              <div className="amount-inv">AMOUNT</div>
              <div className="teks-1-inv">PAYER NAME</div>
              <div className="jw-1-inv">{formData.payer_name}</div>
              <div className="teks-2-inv">SEND DATE</div>
              <div className="jw-2-inv">{formData.sent_date}</div>
              <div className="teks-3-inv">DUE DATE</div>
              <div className="jw-3-inv">{formData.due_date}</div>
            </div>
            <div className="re3-inv">
              <div className="catatan-inv">Catatan.</div>
              <div className="header-re3-inv">
              {formData.note}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-1-inv"></div>
        <div className="bg-2-inv"></div>
        <div className="bg-3-inv"></div>
        <div className="bg-4-inv"></div>
      </div>
    </div>
  );
};

export default DetailFormInvoice;

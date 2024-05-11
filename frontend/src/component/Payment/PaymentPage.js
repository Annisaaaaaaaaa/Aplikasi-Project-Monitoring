import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import '../../Css/detail_payment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFileAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { usePaymentContext } from './../../context/PaymentContext';

import po from '../../images/po.png';
import gc2 from '../../images/gc2.png';
import inv from '../../images/inv.png';
import bc from '../../images/bc.png';
import pw2 from '../../images/pw2.png';
import os2 from '../../images/os2.png';
import delet from '../../images/Delete.png';
import pencil from '../../images/Pencil.png';
import chip from '../../images/Chip.png';

const DetailFormPayment = () => {
    const { payments, editPayment, deletePayment } = usePaymentContext();
  const history = useHistory();
  const { authTokens } = useContext(AuthContext);
  const { paymentId } = useParams();
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
    document_file: '',
  });

  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

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
      const response = await axios.post('http://localhost:8000/api/v1/payment/', formData, {
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

  const handleEdit = (paymentId) => {
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
            editPayment(paymentId, newData);
            history.push(`/payment-edit/${paymentId}/`);
        }
    });
};

const getProjectName = (projectId) => {
  const project = projects.find((proj) => proj.id === projectId);
  return project ? project.name : '';
};

const getInvoiceName = (invoiceId) => {
  const invoice = invoices.find((inv) => inv.id === invoiceId);
  return invoice ? invoice.name : '';
};

// const getInvoiceSend = (invoiceId) => {
//   const invoice = invoices.find((se) => se.id === invoiceId);
//   return invoice ? invoice.send_date : '';
// };

const getInvoiceDue = (invoiceId) => {
  const invoice = invoices.find((du) => du.id === invoiceId);
  return invoice ? invoice.due_date : '';
};

const getInvoiceSD = (invoiceId) => {
  const invoice = invoices.find((sd) => sd.id === invoiceId);
  return invoice ? invoice.sent_date : '';
};

const confirmDelete = (paymentId) => {
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
            deletePayment(paymentId);
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

      <div className="navbar-dpay">
        {/* Tampilkan form dan tampilan progress */}
        <div className="parent-dpay">
          <div className="con-left-dpay">
            <div className="wrapper">
              <header>File Uploader</header>
              <form>
                <input className="file-input" type="file" name="file" onChange={handleFileChange} hidden />
                <FontAwesomeIcon icon={faCloudUploadAlt} />
                <p>Browse File to Upload</p>
              </form>
              <section className={`progress-area ${uploading && 'onprogress'}`}>
                <ul className="progress-details">
                  <li className="row">
                    <FontAwesomeIcon icon={faFileAlt} />
                    <div className="content">
                      <div className="details">
                        <span className="name">{file && file.name} • Uploading</span>
                        <span className="percent">{progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              <section className="uploaded-area">
                <ul>
                  {uploading ? null : (
                    <li className="row">
                      <div className="content upload">
                        <FontAwesomeIcon icon={faFileAlt} />
                        <div className="details">
                          <span className="name">{file && file.name} • Uploaded</span>
                          <span className="size">{file && (file.size < 1024 ? `${file.size} KB` : `${(file.size / (1024 * 1024)).toFixed(2)} MB`)}</span>
                        </div>
                      </div>
                      <FontAwesomeIcon icon={faCheck} />
                    </li>
                  )}
                </ul>
              </section>
            </div>
          </div>
          <div className="con-rigth-dpay">
            <div className="re1-dpay">
              <img src={po} alt="Logo" className="icon-dpay" />
              <div className="header1-dpay">{getProjectName(formData.project)}</div>
              <div className="complete-dpay">{formData.no_invoice} {invoices.map((invoice) => (
                  <div key={invoice.id} value={invoice.id}>
                    {invoice.no_invoice}
                  </div>
                ))}</div>
              <div className="header2-dpay">{formData.type}</div>
              <button className="back-dpay">Back</button>
              <img src={gc2} alt="Logo" className="ic-1-dpay" />
              <div className="text-1-dpay">Project</div>
              <div className="ans-1-dpay">{getProjectName(formData.project)}</div>
              <div className="ic-2-dpay">
                <img src={inv} alt="Logo" />
              </div>
              <div className="text-2-dpay">Invoice</div>
              <div className="ans-2-dpay">{getInvoiceName(formData.no_invoice)}</div>
              <div className="ic-3-dpay">
                <img src={bc} alt="Logo" />
              </div>
              <div className="text-3-dpay">Receiver</div>
              <div className="ans-3-dpay">{formData.receiver_name}</div>
              <div className="ic-4-dpay">
                <img src={pw2} alt="Logo" />
              </div>
              <div className="text-4-dpay">Client</div>
              <div className="ans-4-dpay">{formData.payer_name}</div>
              <div className="ic-5-dpay">
                <img src={os2} alt="Logo" />
              </div>
              <div className="text-5-dpay">Sales</div>
              <div className="ans-5-dpay">{formData.receiver_name}</div>
              {payments.map((payment) => (
              <div key={payment.id} value={payment.id}>
                <button className="delete-inv" onClick={() => confirmDelete(payment.id)}>
                <img src={delet} alt="Logo" />
              </button>
              <button className="edit-inv" onClick={() => handleEdit(payment.id)}>
                <img src={pencil} alt="Logo" />
              </button>
              </div>
            ))}
            </div>
            <div className="re2-dpay">
              <div className="icon-re2-dpay">
                <img src={chip} alt="Logo" />
              </div>
              <div className="nominal-dpay">{formData.amount}</div>
              <div className="amount-dpay">AMOUNT</div>
              <div className="teks-1-dpay">PAYER NAME</div>
              <div className="jw-1-dpay">{formData.payer_name}</div>
              <div className="teks-2-dpay">SEND DATE</div>
              <div className="jw-2-dpay">{getInvoiceSD(formData.no_invoice)}</div>
              <div className="teks-3-dpay">DUE DATE</div>
              <div className="jw-3-dpay">{getInvoiceDue(formData.no_invoice)}</div>
            </div>
            <div className="re3-dpay">  
              <div className="catatan-dpay">Catatan.</div>
              <div className="header-re3-dpay">
              {formData.note}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-1-dpay"></div>
        <div className="bg-2-dpay"></div>
        <div className="bg-3-dpay"></div>
        <div className="bg-4-dpay"></div>
      </div>
    </div>
  );
};

export default DetailFormPayment;

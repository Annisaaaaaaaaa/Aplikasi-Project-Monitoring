import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Import axios
import Swal from 'sweetalert2';
import { usePaymentContext } from './../../context/PaymentContext';
import gambarorg from '../../assets/img/gambarorg.png';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const PaymentTable = ({ currentPage, itemsPerPage, totalItems }) => {    
  const { payments, projects, invoices, error, loading, editPayment, deletePayment } = usePaymentContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    id: 'asc',
    project: 'asc',
    payer: 'asc',
    receiver: 'asc',
    amount: 'asc',
    date: 'asc',
  });
  const history = useHistory();
  const { authTokens } = useContext(AuthContext);
  const [selectedMonth, setSelectedMonth] = useState(''); // State untuk bulan yang dipilih
  const [selectedYear, setSelectedYear] = useState(''); // State untuk tahun yang dipilih
  const [filteredDocumentsByDate, setFilteredDocumentsByDate] = useState([]);
  const [selectedDetailId, setSelectedDetailId] = useState(null); // State untuk ID detail yang dipilih
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [filteredDocumentsByStatus, setFilteredDocumentsByStatus] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');


  const toggleDetail = (paymentId) => {
      setIsDetailVisible(selectedDetailId === paymentId ? false : true);
      setSelectedDetailId(paymentId);
  };

  const filteredPayments = filteredDocumentsByDate.length > 0 ? 
  filteredDocumentsByDate
  .map((payment) => {
    const projectName = projects.find((project) => project.id === payment.project)?.name || 'N/A';
    const invoiceNo = invoices.find((invoice) => invoice.id === payment.no_invoice)?.no_invoice || 'N/A';
  
    return {
      ...payment,
      invoiceNo,
      projectName,
    };
      })  :
  filteredDocumentsByStatus.length > 0 ? 
  filteredDocumentsByStatus
  .map((payment) => {
    const projectName = projects.find((project) => project.id === payment.project)?.name || 'N/A';
    const invoiceNo = invoices.find((invoice) => invoice.id === payment.no_invoice)?.no_invoice || 'N/A';
  
    return {
      ...payment,
      invoiceNo,
      projectName,
    };
      })  :
  payments
  .map((payment) => {
    const projectName = projects.find((project) => project.id === payment.project)?.name || 'N/A';
    const invoiceNo = invoices.find((invoice) => invoice.id === payment.no_invoice)?.no_invoice || 'N/A';
  
    return {
      ...payment,
      invoiceNo,
      projectName,
    };
  }).filter(
    (payment) =>
      payment.payment_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.payer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.receiver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.amount.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const column = Object.keys(sortOrder).find((key) => sortOrder[key] !== 'asc');
    const order = sortOrder[column] === 'asc' ? 1 : -1;

    if (column === 'id') {
        const idA = isNaN(parseInt(a[column])) ? a[column] : parseInt(a[column]);
        const idB = isNaN(parseInt(b[column])) ? b[column] : parseInt(b[column]);
        return (idA - idB) * order;
    }

    const valueA = (a[column] || '').toLowerCase();
    const valueB = (b[column] || '').toLowerCase();

    if (valueA < valueB) return -1 * order;
    if (valueA > valueB) return 1 * order;
    return 0;
})
.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

useEffect(() => {
  animateRows();
}, [invoices, searchTerm, currentPage, itemsPerPage, filteredDocumentsByDate, filteredDocumentsByStatus]);

const animateRows = () => {
  const rows = document.querySelectorAll('tbody tr');
  
  rows.forEach((row, i) => {
    row.classList.remove('hide');
    row.classList.add('animate__animated', 'animate__slideInLeft'); // Ganti dengan 'animate__slideInRight' jika ingin dari kanan
    row.style.setProperty('--delay', i / 25 + 's');
  });

  const visibleRows = Array.from(rows);
  setVisibleRows(visibleRows);

  visibleRows.forEach((visibleRow, i) => {
    visibleRow.style.backgroundColor = i % 2 === 0 ? 'transparent' : '#0000000b';
  });
};

  const handleSort = (column) => {
    const newOrder = sortOrder[column] === 'asc' ? 'desc' : 'asc';
    setSortOrder({ ...sortOrder, [column]: newOrder });
  };

  const sortedPayments = filteredPayments.sort((a, b) => {
    const column = Object.keys(sortOrder).find((key) => sortOrder[key] !== 'asc');
    const order = sortOrder[column] === 'asc' ? 1 : -1;

    if (a[column] < b[column]) return -1 * order;
    if (a[column] > b[column]) return 1 * order;
    return 0;
  });

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
};

const cellStyle = {
    textAlign: 'center',
    padding: '8px',
};

const buttonStyle = {
    background: 'linear-gradient(89.94deg, rgba(172, 180, 252, 0.6) 2.11%, rgba(146, 158, 201, 0.6) 75.47%, rgba(71, 67, 247, 0.6) 102.23%)',
    border: 'none',
    borderRadius: '15px',
    color: '#000', 
    fontSize: '16px',
    padding: '8px 20px',
    marginRight: '5px',
    marginLeft: '12px',
    marginBottom: '18px',
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '2px 2px 4px rgba(44, 62, 80, 0.6)',
    transition: 'background-color 0.3s, color 0.3s', 
};

const detail = {
  width: '25px',
  height: '25px',
  position: 'relative',
  borderRadius: '50%',
  background: 'linear-gradient(89.94deg, rgba(172, 180, 252, 0.6) 2.11%, rgba(146, 158, 201, 0.6) 75.47%, rgba(71, 67, 247, 0.6) 102.23%)',
  marginLeft: '55px', // Menambahkan margin right sebesar 15px
};

const buttonHoverStyle = {
    background: 'linear-gradient(89.94deg, rgba(172, 180, 252, 0.35) 2.11%, rgba(146, 158, 201, 0.35) 75.47%, rgba(71, 67, 247, 0.35) 102.23%)',
    color: '#fff', 
};

const [isHoveredFilter, setIsHoveredFilter] = useState(false);
const [isHoveredRefresh, setIsHoveredRefresh] = useState(false);
const [isHoveredStatus, setIsHoveredStatus] = useState(false);

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

const handleDetail = (paymentId) => {
 
  const newData = {};
  editPayment(paymentId, newData);
  history.push(`/payment-detail/${paymentId}/`);

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

  const filterDateDocuments = async () => {
    try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
            throw new Error('Authentication token is missing');
        }

        // Tampilkan SweetAlert dengan dropdown untuk memilih bulan dan tahun
        const { value: formValues, dismiss } = await Swal.fire({
            title: 'Filter Documents',
            html:
                `<select id="swal-select-month" class="swal2-select" style="margin-bottom: 10px;">
                    <option value="">Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select id="swal-select-year" class="swal2-select">
                    <option value="">Select Year</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2030">2030</option>
                    <!-- Add more years if needed -->
                </select>`,
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Filter',
            preConfirm: () => {
                return [
                    document.getElementById('swal-select-month').value,
                    document.getElementById('swal-select-year').value
                ];
            }
        });

        // Jika pengguna menekan tombol "Cancel" atau menutup dialog
        if (dismiss === Swal.DismissReason.cancel) {
            return;
        }

        // Jika pengguna menekan tombol "OK" tanpa memilih bulan atau tahun
        if (!formValues[0] && !formValues[1]) {
            throw new Error('Please select month and year.');
        }

        const [selectedMonth, selectedYear] = formValues;

        // Buat URL dengan parameter bulan atau tahun berdasarkan pilihan pengguna
        let url = 'http://localhost:8000/api/v1/payment/filter/?';
        if (selectedMonth) {
            url += `month=${selectedMonth}`;
        }
        if (selectedYear) {
            url += selectedMonth ? `&year=${selectedYear}` : `year=${selectedYear}`;
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data);
        // Set filtered documents
        setFilteredDocumentsByDate(response.data);

        // Simpan bulan dan tahun yang dipilih
        if (selectedMonth || selectedYear) {
            setSelectedMonth(selectedMonth);
            setSelectedYear(selectedYear);
            setSelectedStatus('');
        }

        // Cek apakah respon memiliki data
        if (response.data.length === 0) {
            throw new Error('No data available for the selected month and year.');
        }
    } catch (error) {
        Swal.fire({
            title: 'No Data Found',
            text: 'There is no data available for the selected month and year.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        console.error('Error searching documents:', error.message);
        // Tambahkan logika untuk menghilangkan bagian yang tidak ingin ditampilkan saat tidak ada data yang ditemukan
        setSelectedMonth('');
        setSelectedYear('');
        setFilteredDocumentsByDate([]);
    }
};

const filterByStatus = async () => {
    try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
            throw new Error('Authentication token is missing');
        }

        const { value: selectedStatus, dismiss } = await Swal.fire({
            title: 'Filter Documents by Type',
            input: 'select',
            inputOptions: {
                'billing to customer': 'Billing To Customer',
                'billing from subcon': 'Billing From Subcon',
            },
            inputPlaceholder: 'Select Type',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Filter',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose a Status';
                }
            }
        });

        // Jika pengguna menekan tombol "Cancel" atau menutup dialog
        if (dismiss === Swal.DismissReason.cancel) {
            return;
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/payment/bytype/?type=${selectedStatus}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data);
        // Set filtered documents
        setFilteredDocumentsByStatus(response.data);
        setFilteredDocumentsByDate([]);

        // Simpan kategori yang dipilih dalam state
        setSelectedStatus(selectedStatus);
        setSelectedMonth('');
        setSelectedYear('');

        // Cek apakah respon memiliki data
        if (response.data.length === 0) {
            throw new Error('No data available for the selected Status.');
        }
    } catch (error) {
        Swal.fire({
            title: 'No Data Found',
            text: 'There is no data available for the selected Status.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        console.error('Error searching documents by Status:', error.message);
        // Tambahkan logika untuk menghilangkan bagian yang tidak ingin ditampilkan saat tidak ada data yang ditemukan
        setFilteredDocumentsByStatus([]);
        setSelectedStatus('');
    }
};

    const refreshTable = () => {
        setFilteredDocumentsByDate([]);
        setFilteredDocumentsByStatus([]);
        setSelectedMonth('');
        setSelectedYear('');
        setSelectedStatus('');
    };

  if (loading) {
    return (
      <div className="gambarorg">
        <img src={gambarorg} alt="logo" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!payments || payments.length === 0) {
    return <p>No Data found.</p>;
  }

  return (
    <div>
      <div className="input-group" style={{ marginTop: '34px' }}>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="button-container">
                <button 
                    style={isHoveredFilter ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle} 
                    onMouseEnter={() => setIsHoveredFilter(true)} 
                    onMouseLeave={() => setIsHoveredFilter(false)} 
                     onClick={filterDateDocuments}>
                    Filter
                </button>
                <button
                    style={isHoveredStatus ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle}
                    onMouseEnter={() => setIsHoveredStatus(true)}
                    onMouseLeave={() => setIsHoveredStatus(false)}
                    onClick={filterByStatus}>
                        Status
                </button>
                <button 
                    style={isHoveredRefresh ? {...buttonStyle, ...buttonHoverStyle} : buttonStyle} 
                    onMouseEnter={() => setIsHoveredRefresh(true)} 
                    onMouseLeave={() => setIsHoveredRefresh(false)} 
                    onClick={refreshTable}>
                    Refresh
                </button>
            </div>
            <div style={{ marginBottom: '8px' }}>
                {(selectedMonth || selectedYear) && (
                    <p>
                        Filtered by : {selectedMonth || ''} / {selectedYear || ''}
                    </p>
                )}
                {selectedStatus && (
                <p>
                    Status : {selectedStatus}
                </p>
            )}
            </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle} onClick={() => handleSort('id')}>
              NOMOR {sortOrder.id === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('project')}>
              Nama Payment {sortOrder.project === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('payer')}>
              Project {sortOrder.payer === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('receiver')}>
              Payer {sortOrder.receiver === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('amount')}>
              Receiver {sortOrder.amount === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('date')}>
              Type {sortOrder.date === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredPayments.map((payment, index) => (
            <tr key={payment.id} className={visibleRows.includes(index) ? '' : 'hide'}>
              <td style={cellStyle}>{payment.invoiceNo}</td>
              <td style={cellStyle}>{payment.name}</td>
              <td style={cellStyle}>{payment.projectName}</td>
              <td style={cellStyle}>{payment.payer_name}</td>
              <td style={cellStyle}>{payment.receiver_name}</td>
              <td style={cellStyle}>{payment.type}</td>
              <td style={cellStyle}>
                <button onClick={() => handleEdit(payment.id)} className='edit-button'>Edit</button>
                <button onClick={() => confirmDelete(payment.id)}  className='delete-button'>Delete</button>
                <button onClick={() => handleDetail(payment.id)} style={detail}></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;

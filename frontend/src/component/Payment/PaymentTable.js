import React, { useState, useEffect } from 'react';
import { usePaymentContext } from './../../context/PaymentContext';
import gambarorg from '../../assets/img/gambarorg.png';
import { useHistory } from 'react-router-dom';

const PaymentTable = () => {    
  const { payments, projects, error, loading, editPayment, deletePayment } = usePaymentContext();
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

  const filteredPayments = payments.map((payment) => {
    const projectName = projects.find((project) => project.id === payment.project)?.name || 'N/A';
  
    return {
      ...payment,
      projectName,
    };
  }).filter(
    (payment) =>
      payment.payment_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.payer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.receiver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.amount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    animateRows();
  }, [payments, searchTerm]);  

  const animateRows = () => {
    const rows = document.querySelectorAll('tbody tr');
  
    rows.forEach((row, i) => {
      let tableData = row.innerText.toLowerCase();
      let searchData = searchTerm.toLowerCase();
  
      row.classList.toggle('hide', tableData.indexOf(searchData) < 0);
      row.style.setProperty('--delay', i / 25 + 's');
    });
  
    const visibleRows = Array.from(rows).filter((row) => !row.classList.contains('hide'));
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

  const handleEdit = (paymentId) => {
    const newData = {};
    editPayment(paymentId, newData);
    history.push(`/payment-edit/${paymentId}/`);
  };

  const confirmDelete = (paymentId) => {
    console.log('Menghapus Data dengan ID:', paymentId);

    if (window.confirm('Apakah Anda yakin ingin menghapus Data Payment ini?')) {
      deletePayment(paymentId);
    }
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
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle} onClick={() => handleSort('id')}>
              ID {sortOrder.id === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('project')}>
              Project {sortOrder.project === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('payer')}>
              Payer {sortOrder.payer === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('receiver')}>
              Receiver {sortOrder.receiver === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('amount')}>
              Amount {sortOrder.amount === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('date')}>
              Date {sortOrder.date === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
        {sortedPayments.map((payment, index) => (
            <tr key={payment.id} className={visibleRows.includes(index) ? '' : 'hide'}>
              <td style={cellStyle}>{payment.id}</td>
              <td style={cellStyle}>{payment.projectName}</td>
              <td style={cellStyle}>{payment.payer_name}</td>
              <td style={cellStyle}>{payment.receiver_name}</td>
              <td style={cellStyle}>{payment.amount}</td>
              <td style={cellStyle}>{payment.payment_date.split('T')[0]}</td>
              <td style={cellStyle}>
                <button onClick={() => handleEdit(payment.id)}>Edit</button>
                <button onClick={() => confirmDelete(payment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;

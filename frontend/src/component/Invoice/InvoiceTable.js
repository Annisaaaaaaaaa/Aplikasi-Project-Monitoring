import React, { useState, useEffect } from 'react';
import { useInvoiceContext } from './../../context/InvoiceContext';
import gambarorg from '../../assets/img/gambarorg.png';
import { useHistory } from 'react-router-dom'; 

const InvoiceTable = () => {
  const { invoices, projects, clients, error, loading, editInvoice, deleteInvoice } = useInvoiceContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState([]);
  const history = useHistory();
  const [sortOrder, setSortOrder] = useState({
    id: 'asc',
    status: 'asc',
    project: 'asc',
    contact: 'asc',
    amount: 'asc',
    date: 'asc',
  });
  const handleSort = (column) => {
    const newOrder = sortOrder[column] === 'asc' ? 'desc' : 'asc';
    setSortOrder({ ...sortOrder, [column]: newOrder });
  };
  const filteredInvoices = invoices.map((invoice) => {
    const projectName = projects.find((project) => project.id === invoice.project)?.name || 'N/A';
    const contactName = clients.find((client) => client.id === invoice.to_contact)?.name || 'N/A';
  
    return {
      ...invoice,
      projectName,
      contactName,
    };
  }).filter(
    (invoice) =>
      invoice.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.contactName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedInvoices = filteredInvoices.sort((a, b) => {
    const column = Object.keys(sortOrder).find((key) => sortOrder[key] !== 'asc');
    const order = sortOrder[column] === 'asc' ? 1 : -1;

    if (a[column] < b[column]) return -1 * order;
    if (a[column] > b[column]) return 1 * order;
    return 0;
  });

  useEffect(() => {
    animateRows();
  }, [invoices, searchTerm]);

  const animateRows = () => {
    const rows = document.querySelectorAll('tbody tr');
  
    rows.forEach((row, i) => {
      let tableData = row.innerText.toLowerCase(),
          searchData = searchTerm.toLowerCase();
  
      row.classList.toggle('hide', tableData.indexOf(searchData) < 0);
      row.style.setProperty('--delay', i / 25 + 's');
    });
  
    const visibleRows = Array.from(rows).filter((row) => !row.classList.contains('hide'));
    setVisibleRows(visibleRows);
  
    visibleRows.forEach((visibleRow, i) => {
      visibleRow.style.backgroundColor = i % 2 === 0 ? 'transparent' : '#0000000b';
    });
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '8px',
  };

  const handleEdit = (invoiceId) => {
    const newData = {};
    editInvoice(invoiceId, newData);
    history.push(`/invoice-edit/${invoiceId}/`);
  };

  const confirmDelete = (invoiceId) => {
    console.log('Menghapus Data dengan ID:', invoiceId);

    if (window.confirm('Apakah Anda yakin ingin menghapus Data Invoice ini?')) {
      deleteInvoice(invoiceId);
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

  if (!invoices || invoices.length === 0) {
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
            <th style={cellStyle} onClick={() => handleSort('status')}>
              Status {sortOrder.status === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('project')}>
              Project {sortOrder.project === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('contact')}>
              Contact {sortOrder.contact === 'asc' ? '↑' : '↓'}
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
          {sortedInvoices.map((invoice, index) => (
            <tr key={invoice.id} className={visibleRows.includes(index) ? '' : 'hide'}>
              <td style={cellStyle}>{invoice.id}</td>
              <td style={cellStyle}>{invoice.status}</td>
              <td style={cellStyle}>{invoice.projectName}</td>
              <td style={cellStyle}>{invoice.contactName}</td>
              <td style={cellStyle}>{invoice.amount}</td>
              <td style={cellStyle}>{invoice.date}</td>
              <td style={cellStyle}>
                <button onClick={() => handleEdit(invoice.id)}>Edit</button>
                <button onClick={() => confirmDelete(invoice.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;

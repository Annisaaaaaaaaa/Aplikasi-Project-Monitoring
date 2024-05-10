import React, { useState, useEffect } from 'react';
import { useClientContext } from './../../context/ClientContext';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import gambarorg from '../../assets/img/gambarorg.png';
// import 'animate.css';

const ClientTable = ({ currentPage, itemsPerPage, totalItems }) => {
  const { clients, error, loading, editClient, deleteClient } = useClientContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState([]);
  const history = useHistory();
  const [sortOrder, setSortOrder] = useState({
    id: 'asc',
    industry: 'asc',
    name: 'asc',
    company_address: 'asc',
    company_email: 'asc',
    company_phone: 'asc',
  });

  const handleSort = (column) => {
    const newOrder = sortOrder[column] === 'asc' ? 'desc' : 'asc';
    setSortOrder({ ...sortOrder, [column]: newOrder });
  };

  const handleEdit = (clientId) => {
    const newData = {};
    editClient(clientId, newData);
    history.push(`/client-edit/${clientId}/`);
  };

  const confirmDelete = (clientId) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClient(clientId);
        Swal.fire('Dihapus!', 'Klien telah dihapus.', 'success');
      }
    });
  };

  useEffect(() => {
    animateRows();
  }, [clients, searchTerm, currentPage, itemsPerPage]);

  const sortedAndSlicedClients = clients
    .map((client) => ({ ...client }))
    .filter((client) =>
      client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company_phone.toLowerCase().includes(searchTerm.toLowerCase())
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
            
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '8px',
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

  if (!clients || clients.length === 0) {
    return <p>No Clients Found</p>;
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
            <th style={cellStyle}>
              ID 
            </th>
            <th style={cellStyle} onClick={() => handleSort('industry')}>
              Company {sortOrder.industry === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('name')}>
              Name {sortOrder.name === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('company_address')}>
              Company Address {sortOrder.company_address === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('company_email')}>
              Company Email{sortOrder.company_email === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('company_phone')}>
              Company Phone{sortOrder.company_phone === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndSlicedClients.map((client) => (
            <tr key={client.id}>
              <td style={cellStyle}>{client.id}</td>
              <td style={cellStyle}>{client.industry}</td>
              <td style={cellStyle}>{client.name}</td>
              <td style={cellStyle}>{client.company_address}</td>
              <td style={cellStyle}>{client.company_email}</td>
              <td style={cellStyle}>{client.company_phone}</td>
              <td style={cellStyle}>
                <button className="edit-button" onClick={() => handleEdit(client.id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => confirmDelete(client.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
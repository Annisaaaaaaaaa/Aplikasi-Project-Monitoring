import React, { useState } from 'react';
import { useClientContext } from './../../context/ClientContext';
import gambarorg from '../../assets/img/gambarorg.png';

const ClientTable = () => {
  const { clients, error, loading, editClient, deleteClient } = useClientContext();
  const [searchTerm, setSearchTerm] = useState('');

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '8px',
  };

  const handleEdit = (clientId) => {
    const newData = {}; 
    editClient(clientId, newData);
  };

  const confirmDelete = (clientId) => {
    console.log('Menghapus klien dengan ID:', clientId);
  
    if (window.confirm('Apakah Anda yakin ingin menghapus klien ini?')) {
      deleteClient(clientId);
    }
  };
  
  const filteredClients = clients.filter(client =>
    client.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.pic_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    return <p>No clients found.</p>;
  }  

  return (
    <div>
      <div className="input-group" style={{ marginTop: '34px'}}>
      <input
        type="search"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Company</th>
            <th style={cellStyle}>Nama</th>
            <th style={cellStyle}>PIC Title</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Logo</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client.id}>
              <td style={cellStyle}>{client.id}</td>
              <td style={cellStyle}>{client.industry}</td>
              <td style={cellStyle}>{client.name}</td>
              <td style={cellStyle}>{client.pic_title}</td>
              <td style={cellStyle}>{client.status}</td>
              <td style={cellStyle}>{client.logo}</td>
              <td style={cellStyle}>
                <button onClick={() => handleEdit(client.id)}>Edit</button>
                <button onClick={() => confirmDelete(client.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;

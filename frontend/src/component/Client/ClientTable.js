import React from 'react';
import { useClientContext } from './../../context/ClientContext';
import gambarorg from '../../assets/img/gambarorg.png';
import sad from '../../assets/img/found.png';
import '../../Css/Dashboard.css'

const ClientTable = () => {
  const { clients, error, loading, editClient, deleteClient } = useClientContext();

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
  
  if (loading) {
    return <div className="gambarorg">
      <img src={gambarorg} alt="logo" />
      </div>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!clients || clients.length === 0) {
    return <div className="gambarfound">
    <img src={sad} alt="logo" />
    <br/>No Clients Found
</div>
    
  }

  return (
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
        {clients.map((client) => (
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
  );
};

export default ClientTable;

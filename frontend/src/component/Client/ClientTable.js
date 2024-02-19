import React from 'react';
import { useClientContext } from './../../context/ClientContext';
import gambarorg from '../../assets/img/gambarorg.png';

const ClientTable = () => {
  const { clients, error, loading } = useClientContext();

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '8px',
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
    return <p>No clients found.</p>;
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;

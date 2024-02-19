// ClientTable.js
import React, { useEffect, useState } from 'react';
import { useClientContext } from '../../context/ClientContext';

function ClientTable() {
  const { clients, error, loading } = useClientContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>List of Clients</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {error && <div>Error: {error.message}</div>}
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientTable;

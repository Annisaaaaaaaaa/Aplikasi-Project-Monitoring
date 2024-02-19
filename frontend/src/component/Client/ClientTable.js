import React from 'react';
import { useClientContext } from './../../context/ClientContext';

const ClientTable = () => {
  const { clients, error, loading } = useClientContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!clients || clients.length === 0) {
    return <p>No clients found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            <td>{client.id}</td>
            <td>{client.name}</td>
            {/* Add more cells with corresponding data as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;

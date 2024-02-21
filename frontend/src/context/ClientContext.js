import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const ClientContext = createContext();

export const useClientContext = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [authTokens]);

  const fetchData = async () => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.get('http://localhost:8000/api/v1/client/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClients(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching client data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editClient = async (clientId, newData) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.put(`http://localhost:8000/api/v1/client/edit/${clientId}/`, newData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClients(clients.map(client => client.id === clientId ? response.data : client));
      setError(null);
    } catch (error) {
      console.error('Error editing client:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      await axios.delete(`http://localhost:8000/api/v1/client/delete/${clientId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClients(clients.filter(client => client.id !== clientId));
      setError(null);
    } catch (error) {
      console.error('Error deleting client:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    clients,
    error,
    loading,
    fetchData,
    editClient,
    deleteClient,
  };

  return (
    <ClientContext.Provider value={contextData}>
      {children}
    </ClientContext.Provider>
  );
};

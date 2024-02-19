import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthContext from './AuthContext'; // Assuming your AuthContext file is in the same directory

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

  const contextData = {
    clients,
    error,
    loading,
    fetchData,
  };

  return (
    <ClientContext.Provider value={contextData}>
      {children}
    </ClientContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const ClientContext = createContext();

export const useClientContext = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authTokens');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      // Decode the token to check if it's expired
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        // Token is expired, try to refresh token
        try {
          const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
            refresh: token
          });
          const newAuthToken = refreshResponse.data.access;

          // Save the new token to localStorage
          localStorage.setItem('authTokens', newAuthToken);

          // Retry original request with new auth token
          const response = await axios.get('http://localhost:8000/api/v1/client/', {
            headers: {
              Authorization: `Bearer ${newAuthToken}`
            }
          });

          setClients(response.data);
          setError(null);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError.message);
          setError(refreshError.message);
        }
      } else {
        // Token is still valid, make the original request
        const response = await axios.get('http://localhost:8000/api/v1/client/', {
          headers: {
            Authorization: `JWT ${token}`
          }
        });

        setClients(response.data);
        setError(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientContext.Provider value={{ clients, error, loading }}>
      {children}
    </ClientContext.Provider>
  );
};

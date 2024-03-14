// context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authTokens) {
          const response = await axios.get('http://localhost:8000/api/user/', {
            headers: {
              Authorization: `Bearer ${authTokens.access}`
            }
          });
          setUsers(response.data);
          setError(null);
          setLoading(false); // Set loading to false after data is fetched
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setError(error.message);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData();

  }, [authTokens]);

  const contextData = {
    users,
    error,
    loading
  };

  return (
    <UserContext.Provider value={contextData}>
      {children}
    </UserContext.Provider>
  );
};

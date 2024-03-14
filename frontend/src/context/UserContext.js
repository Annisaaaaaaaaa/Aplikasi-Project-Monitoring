import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthContext from './AuthContext';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);


  const fetchData = async () => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
  
      // Fetch Project data
      const userResponse = await axios.get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Fetch Client data
      const profileResponse = await axios.get('http://localhost:8000/api/profile/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setUsers(userResponse.data);
      setProfiles(profileResponse.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [authTokens]);
  
  console.log('Users:', users);
  console.log('Profiles:', profiles);
    





const contextData = {
  users,
  profiles,
  error,
  loading,
  fetchData,
  searchValue,
  setSearchValue,
  
};

return (
  <UserContext.Provider value={contextData}>
    {children}
  </UserContext.Provider>
);
};
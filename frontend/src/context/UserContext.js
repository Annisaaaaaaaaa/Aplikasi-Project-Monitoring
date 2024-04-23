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
    const fetchUsers = async () => {
      try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const response = await axios.get('http://localhost:8000/api/users/tambah', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching client data:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      await axios.delete(`http://localhost:8000/api/user/delete/${userId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      // Update users state after successful deletion
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      return true;
    } catch (error) {
      console.error('Error deleting user:', error.message);
      return false;
    }
  };

  // Function to search users
  const searchUsers = async (query) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      
      const response = await axios.get(`http://127.0.0.1:8000/api/user/search/?search=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Function to filter users by groups
  const filterUsersByGroups = async (selectedGroups) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/user/filter/groups/',
        { selected_groups: selectedGroups },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <UserContext.Provider value={{ 
      users, 
      error, 
      loading, 
      searchUsers,
      deleteUser,
      filterUsersByGroups 
    }}>
      {children}
    </UserContext.Provider>
  );
};

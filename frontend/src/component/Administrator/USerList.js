import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './../../context/AuthContext';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const UserList = () => {
  const { authTokens } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const response = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.data) {
          throw new Error('Failed to fetch data');
        }

        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
            <p>grup: {user.groups}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

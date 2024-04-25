import { createContext, useContext, useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';

const ProfileContext = createContext();

export const useProfileContext = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
const { authTokens } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
            throw new Error('Authentication token is missing');
        }

        const response = await axios.get('http://localhost:8000/api/profiles/administrator/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching Profile data:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <ProfileContext.Provider value={{ profiles, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

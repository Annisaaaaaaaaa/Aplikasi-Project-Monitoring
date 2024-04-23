import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { BASE_API } from '../utils/constant';

const ActivityContext = createContext();

export const useActivityContext = () => useContext(ActivityContext);

export const ActivityProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [activityData, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState([]);
  const [projectData, setProjectData] = useState([]);


  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }
  
        const response = await axios.get(`${BASE_API}/api/v1/aktivitas-projek/engineer-activities/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (Array.isArray(response.data) && response.data.length > 0) {
          setActivities(response.data);
          setError(null);
        } else {
          throw new Error('Empty response or invalid data format');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to fetch activities');
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [authTokens]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const response = await axios.get(`${BASE_API}/api/users/tambah`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
          setUserData(response.data);
          setError(null);
        } else {
          throw new Error('Empty response or invalid data format');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authTokens]);


  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }
  
        const response = await axios.get(`${BASE_API}/api/v1/project/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (Array.isArray(response.data) && response.data.length > 0) {
          setProjectData(response.data); // Mengatur data proyek
          setError(null);
        } else {
          throw new Error('Empty response or invalid data format');
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
        setError('Failed to fetch project data');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjectData();
  }, [authTokens]);

  const deleteActivity = async (activityId) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      await axios.delete(`http://127.0.0.1:8000/api/v1/aktivitas-projek/delete/${activityId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      // Setelah penghapusan berhasil, perbarui data aktivitas lokal
      setActivities(prevData => prevData.filter(activity => activity.id !== activityId));
      return true;
    } catch (error) {
      console.error('Error deleting activity:', error.message);
      return false;
    }
  };

  // Function to search users
  const searchActivity = async (query) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/aktivitas-projek/search/?search=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setActivities(response.data);
    } catch (error) {
      setError(error.message);
    }
  };


  // Function to filter acitity by status
  const filterAcitivityByStatus = async (selectedStatus) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/aktivitas-projek/filter_status/',
        { selected_status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      setActivities(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const contextData = {
    activityData,
    loading,
    error,
    userData,
    projectData,
    deleteActivity,
    searchActivity,
    filterAcitivityByStatus
  };

  return (
    <ActivityContext.Provider value={contextData}>
      {children}
    </ActivityContext.Provider>
  );
};

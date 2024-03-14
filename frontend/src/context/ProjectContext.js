import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const fetchData = async () => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.get('http://localhost:8000/api/v1/project/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProjects(response.data);  // Fix typo 'setInvoice' to 'setProjects'
      setError(null);
    } catch (error) {
      console.error('Error fetching Project data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authTokens]);

  const contextData = {
    projects,
    error,
    loading,
    fetchData,
    searchValue,
    setSearchValue,
    // other functions and values
  };

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContext;

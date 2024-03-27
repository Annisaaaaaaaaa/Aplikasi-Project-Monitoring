import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
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
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);


  const fetchData = async () => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const projectResponse = await axios.get('http://localhost:8000/api/v1/project/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const userResponse = await axios.get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const clientResponse = await axios.get('http://localhost:8000/api/v1/client/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  

      setProjects(projectResponse.data);
      setUsers(userResponse.data);
      setClients(clientResponse.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching project data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authTokens]);

  console.log('Projects:', projects);
  console.log('Users:', users);
  console.log('Clients:', clients);

  const editProject = async (projectId, newData) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.put(`http://localhost:8000/api/v1/project/edit/${projectId}/`, newData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProjects(projects.map(project => project.id === projectId ? response.data : project));
      setError(null);
    } catch (error) {
      console.error('Error editing project:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      await axios.delete(`http://localhost:8000/api/v1/project/delete/${projectId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProjects(projects.filter(project => project.id !== projectId));
      setError(null);
    } catch (error) {
      console.error('Error deleting project:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
            throw new Error('Authentication token is missing');
        }
  
        const response = await axios.get(`http://localhost:8000/api/v1/project/search/?search=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
  
        // Process the search data received from the API
        console.log(response.data);
    } catch (error) {
        console.error('Error searching projects:', error.message);
    }
  };
  

const exportToExcel = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel export
    const response = await fetch('http://localhost:8000/api/v1/project/export-projects-to-excel/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Redirect to the generated Excel file
      window.location.href = response.url;
    } else {
      console.error('Error exporting to Excel:', response.statusText);
    }
  } catch (error) {
    console.error('Error exporting to Excel:', error.message);
  }
};


const exportToCsv = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel export
    const response = await fetch('http://localhost:8000/api/v1/project/export-projects-to-csv/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Redirect to the generated Excel file
      window.location.href = response.url;
    } else {
      console.error('Error exporting to Csv:', response.statusText);
    }
  } catch (error) {
    console.error('Error exporting to Csv:', error.message);
  }
};

const exportToPdf = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel export
    const response = await fetch('http://localhost:8000/api/v1/project/export-projects-to-pdf/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Redirect to the generated Excel file
      window.location.href = response.url;
    } else {
      console.error('Error exporting to Pdf:', response.statusText);
    }
  } catch (error) {
    console.error('Error exporting to Pdf:', error.message);
  }
};

const exportToJson = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel export
    const response = await fetch('http://localhost:8000/api/v1/project/export-projects-to-json/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Redirect to the generated Excel file
      window.location.href = response.url;
    } else {
      console.error('Error exporting to Json:', response.statusText);
    }
  } catch (error) {
    console.error('Error exporting to Json:', error.message);
  }
};

const importProjects = async (formData) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the import
    const response = await fetch('http://localhost:8000/api/v1/project/import-projects/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      console.log('Project successful');
    } else {
      console.error('Error importing projects:', response.statusText);
      throw new Error('Import failed');
    }
  } catch (error) {
    console.error('Error importing projects:', error.message);
    throw error;
  }
};

  const contextData = {
    projects,
    users,
    clients,
    error,
    loading,
    fetchData,
    searchValue,
    setSearchValue,
    editProject,
    deleteProject,
    handleSearch,
    exportToExcel, 
    exportToJson, 
    exportToCsv,
    exportToPdf,
    importProjects
  };

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};

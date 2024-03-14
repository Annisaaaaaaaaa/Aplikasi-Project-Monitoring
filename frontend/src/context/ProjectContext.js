import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
=======
import jwt_decode from 'jwt-decode';
>>>>>>> 9c358dfce7d9d7abec47b2d2dfc78f475babde3e
import AuthContext from './AuthContext';

const ProjectContext = createContext();

export const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
<<<<<<< HEAD
  const [projects, setProjects] = useState([]);  
=======
  const [projects, setProjects] = useState([]);
>>>>>>> 9c358dfce7d9d7abec47b2d2dfc78f475babde3e
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
<<<<<<< HEAD
=======
  const [selectedFile, setSelectedFile] = useState(null);

>>>>>>> 9c358dfce7d9d7abec47b2d2dfc78f475babde3e

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

<<<<<<< HEAD
      setProjects(response.data);  // Fix typo 'setInvoice' to 'setProjects'
      setError(null);
    } catch (error) {
      console.error('Error fetching Project data:', error.message);
=======
      setProjects(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching project data:', error.message);
>>>>>>> 9c358dfce7d9d7abec47b2d2dfc78f475babde3e
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authTokens]);

<<<<<<< HEAD
=======
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

const importFromExcel = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel import
    const response = await fetch('http://localhost:8000/api/v1/project/import-projects-from-excel/', {
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


const importFromCsv = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel import
    const response = await fetch('http://localhost:8000/api/v1/project/import-projects-from-csv/', {
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

const importFromPdf = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel import
    const response = await fetch('http://localhost:8000/api/v1/project/import-projects-from-pdf/', {
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

const importFromJson = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel import
    const response = await fetch('http://localhost:8000/api/v1/project/import-projects-from-json/', {
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

>>>>>>> 9c358dfce7d9d7abec47b2d2dfc78f475babde3e
  const contextData = {
    projects,
    error,
    loading,
    fetchData,
    searchValue,
    setSearchValue,
<<<<<<< HEAD
    // other functions and values
=======
    editProject,
    deleteProject,
    handleSearch,
    exportToExcel, 
    exportToJson, 
    exportToCsv,
    exportToPdf,
    importFromExcel, 
    importFromJson, 
    importFromCsv,
    importFromPdf,
    setSelectedFile
>>>>>>> 9c358dfce7d9d7abec47b2d2dfc78f475babde3e
  };

  return (
    <ProjectContext.Provider value={contextData}>
      {children}
    </ProjectContext.Provider>
  );
};
<<<<<<< HEAD

export default ProjectContext;
=======
>>>>>>> 9c358dfce7d9d7abec47b2d2dfc78f475babde3e

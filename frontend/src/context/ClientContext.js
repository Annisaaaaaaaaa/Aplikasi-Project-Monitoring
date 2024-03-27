import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthContext from './AuthContext';

const ClientContext = createContext();

export const useClientContext = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
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

      const response = await axios.get('http://localhost:8000/api/v1/client/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClients(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching client data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authTokens]);

  console.log('Clients:', clients);

  const editClient = async (clientId, newData) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.put(`http://localhost:8000/api/v1/client/edit/${clientId}/`, newData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClients(clients.map(client => client.id === clientId ? response.data : client));
      setError(null);
    } catch (error) {
      console.error('Error editing client:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      await axios.delete(`http://localhost:8000/api/v1/client/delete/${clientId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setClients(clients.filter(client => client.id !== clientId));
      setError(null);
    } catch (error) {
      console.error('Error deleting client:', error.message);
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
  
        const response = await axios.get(`http://localhost:8000/api/v1/client/search/?search=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
  
        // Process the search data received from the API
        console.log(response.data);
    } catch (error) {
        console.error('Error searching clients:', error.message);
    }
  };
  

const exportToExcel = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel export
    const response = await fetch('http://localhost:8000/api/v1/client/export-clients-to-excel/', {
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
    const response = await fetch('http://localhost:8000/api/v1/client/export-clients-to-csv/', {
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
    const response = await fetch('http://localhost:8000/api/v1/client/export-clients-to-pdf/', {
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
    const response = await fetch('http://localhost:8000/api/v1/client/export-clients-to-json/', {
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

const importClients = async (formData) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the import
    const response = await fetch('http://localhost:8000/api/v1/client/import-clients/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      console.log('Import successful');
    } else {
      console.error('Error importing clients:', response.statusText);
      throw new Error('Import failed');
    }
  } catch (error) {
    console.error('Error importing clients:', error.message);
    throw error;
  }
};

  const contextData = {
    clients,
    error,
    loading,
    fetchData,
    searchValue,
    setSearchValue,
    editClient,
    deleteClient,
    handleSearch,
    exportToExcel, 
    exportToJson, 
    exportToCsv,
    exportToPdf,
    importClients
  };

  return (
    <ClientContext.Provider value={contextData}>
      {children}
    </ClientContext.Provider>
  );
};
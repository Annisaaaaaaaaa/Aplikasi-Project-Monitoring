import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthContext from './AuthContext';

const DocumentContext = createContext();

export const useDocumentContext = () => useContext(DocumentContext);

export const DocumentProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [documents, setDocument] = useState([]);
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

      const response = await axios.get('http://localhost:8000/api/v1/document/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDocument(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching Document data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [authTokens]);

  


const exportToExcel = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel export
    const response = await fetch('http://localhost:8000/api/v1/document/export-documents-to-excel/', {
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
    const response = await fetch('http://localhost:8000/api/v1/document/export-documents-to-csv/', {
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
    const response = await fetch('http://localhost:8000/api/v1/document/export-documents-to-pdf/', {
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
    const response = await fetch('http://localhost:8000/api/v1/document/export-documents-to-json/', {
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

const editDocument = async (documentId, newData) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.put(`http://localhost:8000/api/v1/document/edit/${documentId}/`, newData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setDocument(documents.map(document => document.id === documentId ? response.data : document));
    setError(null);
  } catch (error) {
    console.error('Error editing client:', error.message);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

const deleteDocument = async (documentId) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    await axios.delete(`http://localhost:8000/api/v1/document/delete/${documentId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setDocument(documents.filter(document => document.id !== documentId));
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

      const response = await axios.get(`http://localhost:8000/api/v1/document/search/?search=${searchTerm}`, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });

      // Process the search data received from the API
      console.log(response.data);
  } catch (error) {
      console.error('Error searching documents:', error.message);
  }
};


const contextData = {
  documents,
  error,
  loading,
  fetchData,
  searchValue,
  setSearchValue,
  handleSearch,
  exportToExcel, 
  exportToJson, 
  exportToCsv,
  exportToPdf,
  deleteDocument
};

return (
  <DocumentContext.Provider value={contextData}>
    {children}
  </DocumentContext.Provider>
);
};
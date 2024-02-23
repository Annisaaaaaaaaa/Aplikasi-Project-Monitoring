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

  const handleSearch = async () => {
    try {
        const response = await fetch('http://localhost:8000/api/v1/document/search/', {
            method: 'GET',
            // You can add more headers or parameters as needed
        });

        if (response.ok) {
            const searchData = await response.json();
            // Process the search data received from the API
            console.log(searchData);
        } else {
            console.error('Error searching documents:', response.statusText);
        }
    } catch (error) {
        console.error('Error searching documents:', error.message);
    }
};


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


const contextData = {
  documents,
  error,
  loading,
  fetchData,
  handleSearch,
  exportToExcel, 
  exportToJson, 
  exportToCsv,
  exportToPdf
};

return (
  <DocumentContext.Provider value={contextData}>
    {children}
  </DocumentContext.Provider>
);
};
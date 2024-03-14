import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthContext from './AuthContext';

const InvoiceContext = createContext();

export const useInvoiceContext = () => useContext(InvoiceContext);

export const InvoiceProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [invoices, setInvoice] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);


  const fetchData = async () => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
  
      // Fetch Invoice data
      const invoiceResponse = await axios.get('http://localhost:8000/api/v1/invoice/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Fetch Project data
      const projectResponse = await axios.get('http://localhost:8000/api/v1/project/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Fetch Client data
      const clientResponse = await axios.get('http://localhost:8000/api/v1/client/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setInvoice(invoiceResponse.data);
      setProjects(projectResponse.data);
      setClients(clientResponse.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [authTokens]);
  
  console.log('Invoices:', invoices);
  console.log('Projects:', projects);
  console.log('Clients:', clients);
    


const exportToExcel = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel export
    const response = await fetch('http://localhost:8000/api/v1/invoice/export-invoices-to-excel/', {
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
    const response = await fetch('http://localhost:8000/api/v1/invoice/export-invoices-to-csv/', {
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
    const response = await fetch('http://localhost:8000/api/v1/invoice/export-invoices-to-pdf/', {
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
    const response = await fetch('http://localhost:8000/api/v1/invoice/export-invoices-to-json/', {
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

const importInvoices = async (formData) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the import
    const response = await fetch('http://localhost:8000/api/v1/invoice/import-invoices/', {
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
      console.error('Error importing invoices:', response.statusText);
      throw new Error('Import failed');
    }
  } catch (error) {
    console.error('Error importing invoices:', error.message);
    throw error;
  }
};

const editInvoice = async (invoiceId, newData) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.get(`http://localhost:8000/api/v1/invoice/edit/${invoiceId}/`, newData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setInvoice(invoices.map(invoice => invoice.id === invoiceId ? response.data : invoice));
    setError(null);
  } catch (error) {
    console.error('Error editing client:', error.message);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

const deleteInvoice = async (invoiceId) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    await axios.delete(`http://localhost:8000/api/v1/invoice/delete/${invoiceId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setInvoice(invoices.filter(invoice => invoice.id !== invoiceId));
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

      const response = await axios.get(`http://localhost:8000/api/v1/invoice/search/?search=${searchTerm}`, {
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
  projects,
  clients,
  invoices,
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
  deleteInvoice,
  importInvoices,
  editInvoice
};

return (
  <InvoiceContext.Provider value={contextData}>
    {children}
  </InvoiceContext.Provider>
);
};
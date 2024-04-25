import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthContext from './AuthContext';

const PaymentContext = createContext();

export const usePaymentContext = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [payments, setPayment] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);

  const fetchData = async () => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
  
      // Fetch Invoice data
      const paymentResponse = await axios.get('http://localhost:8000/api/v1/payment/', {
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

      // Fetch Project data
      const invoiceResponse = await axios.get('http://localhost:8000/api/v1/invoice/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setPayment(paymentResponse.data);
      setProjects(projectResponse.data);
      setInvoices(invoiceResponse.data);
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
  
  console.log('Payments:', payments);
  console.log('Projects:', projects);
  console.log('Invoices:', invoices);


const exportToExcel = async () => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the Excel export
    const response = await fetch('http://localhost:8000/api/v1/payment/export-payments-to-excel/', {
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
    const response = await fetch('http://localhost:8000/api/v1/payment/export-payments-to-csv/', {
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
    const response = await fetch('http://localhost:8000/api/v1/payment/export-payments-to-pdf/', {
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
    const response = await fetch('http://localhost:8000/api/v1/payment/export-payments-to-json/', {
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

const importPayment = async (formData) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    // Make a request to the backend to trigger the import
    const response = await fetch('http://localhost:8000/api/v1/payment/import-payments/', {
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

const editPayment = async (paymentId, newData) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await axios.get(`http://localhost:8000/api/v1/payment/edit/${paymentId}/`, newData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setPayment(payments.map(payment => payment.id === paymentId ? response.data : payment));
    setError(null);
  } catch (error) {
    console.error('Error editing payment:', error.message);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

const deletePayment = async (paymentId) => {
  try {
    const token = authTokens ? authTokens.access : null;
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    await axios.delete(`http://localhost:8000/api/v1/payment/delete/${paymentId}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setPayment(payments.filter(payment => payment.id !== paymentId));
    setError(null);
  } catch (error) {
    console.error('Error deleting payment:', error.message);
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

      const response = await axios.get(`http://localhost:8000/api/v1/payment/search/?search=${searchTerm}`, {
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
  payments,
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
  deletePayment,
  importPayment,
  editPayment
};

return (
  <PaymentContext.Provider value={contextData}>
    {children}
  </PaymentContext.Provider>
);
};
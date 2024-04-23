import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AuthContext from './AuthContext';
import Swal from 'sweetalert2';

const DocumentContext = createContext();

export const useDocumentContext = () => useContext(DocumentContext);

export const DocumentProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [documents, setDocument] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [exportOption, setExportOption] = useState('all');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const fetchData = async () => {
    try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
  
      // Fetch Document data
      const documentResponse = await axios.get('http://localhost:8000/api/v1/document/', {
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
  
      // Fetch User data
      const userResponse = await axios.get('http://localhost:8000/api/user/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setDocument(documentResponse.data);
      setProjects(projectResponse.data);
      setUsers(userResponse.data);
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
  
  console.log('Documents:', documents);
  console.log('Projects:', projects);
  console.log('Users:', users);
     


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

const filterExportpdf = async () => {
  try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
          throw new Error('Authentication token is missing');
      }

      // Ambil nilai dari dropdown bulan dan tahun berdasarkan pilihan pengguna
      let selectedMonth = '';
      let selectedYear = '';
      if (exportOption === 'month' || exportOption === 'monthYear') {
          selectedMonth = month;
      }
      if (exportOption === 'year' || exportOption === 'monthYear') {
          selectedYear = year;
      }

      // Buat URL dengan parameter bulan dan tahun berdasarkan pilihan pengguna
      let url = 'http://localhost:8000/api/v1/document/export-documents-to-pdf/';
      if (selectedMonth) {
          url += `?month=${selectedMonth}`;
      }
      if (selectedYear) {
          url += selectedMonth ? `&year=${selectedYear}` : `?year=${selectedYear}`;
      }

      // Lakukan permintaan ke backend untuk eksport PDF
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`
          },
      });

      if (response.status === 200) {
          // Jika terdapat data yang sesuai, redirect ke file PDF yang dihasilkan
          window.location.href = response.url;
      } else if (response.status === 404) {
          // Jika tidak ada data yang sesuai, tampilkan peringatan SweetAlert
          Swal.fire({
              title: 'No Data Found',
              text: 'There is no data available for the selected month and year.',
              icon: 'warning',
              confirmButtonText: 'Close'
          });
      } else {
          // Tampilkan pesan kesalahan jika permintaan tidak berhasil
          console.error('Error exporting to PDF:', response.statusText);
      }

  } catch (error) {
      console.error('Error exporting to PDF:', error.message);
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

const filter2 = async () => {
  try {
      const token = authTokens ? authTokens.access : null;
      if (!token) {
          throw new Error('Authentication token is missing');
      }

      const response = await axios.get(`http://localhost:8000/api/v1/document/filter/?month=3`, {
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
  users,
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
  deleteDocument,
  editDocument,
  filterExportpdf,
  filter2
};

return (
  <DocumentContext.Provider value={contextData}>
    {children}
  </DocumentContext.Provider>
);
};
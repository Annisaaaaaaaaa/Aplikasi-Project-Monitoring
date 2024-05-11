import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';

const DocumentContext = createContext();

export const useDocumentContext = () => useContext(DocumentContext);

export const DocumentProvider = ({ children }) => {
  const { authTokens } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfData, setPdfData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  
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
  
      setDocuments(documentResponse.data);
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

      setDocuments(documents.map(document => document.id === documentId ? response.data : document));
      setError(null);
    } catch (error) {
      console.error('Error editing document:', error.message);
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

      setDocuments(documents.filter(document => document.id !== documentId));
      setError(null);
    } catch (error) {
      console.error('Error deleting document:', error.message);
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
    projects,
    users,
    documents,
    error,
    loading,
    fetchData,
    searchValue,
    setSearchValue,
    handleSearch,
    editDocument,
    deleteDocument
  };

  return (
    <DocumentContext.Provider value={contextData}>
      {children}
    </DocumentContext.Provider>
  );
};

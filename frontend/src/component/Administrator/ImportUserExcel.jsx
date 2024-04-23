import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './../../context/AuthContext';

const ImportExcelForm = () => {
    const { authTokens } = useContext(AuthContext);
    const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const token = authTokens ? authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.post('http://localhost:8000/api/user/import/excel/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      // Handle success, reset form, display success message, etc.
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setErrorMessage('Failed to upload file. Please try again.');
    }
  };

  return (
    <div>
      <h2>Import Excel Form</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default ImportExcelForm;

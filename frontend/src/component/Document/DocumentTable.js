import React, { useState } from 'react';
import { useDocumentContext } from './../../context/DocumentContext';
import gambarorg from '../../assets/img/gambarorg.png';

const DocumentTable = () => {
  const { documents, error, loading, editDocument, deleteDocument } = useDocumentContext();
  const [searchTerm, setSearchTerm] = useState('');

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '8px',
  };

  const handleEdit = (documentId) => {
    const newData = {}; 
    editDocument(documentId, newData);
  };

  const confirmDelete = (documentId) => {
    console.log('Menghapus klien dengan ID:', documentId);
  
    if (window.confirm('Apakah Anda yakin ingin menghapus Data Document ini?')) {
      deleteDocument(documentId);
    }
  };

  const filteredDocuments = documents.filter(document =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    document.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    document.uploader.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    document.project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  if (loading) {
    return (
      <div className="gambarorg">
        <img src={gambarorg} alt="logo" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!documents || documents.length === 0) {
    return <p>No Data found.</p>;
  }

  return (
    <div>
      <div className="input-group" style={{ marginTop: '34px'}}>
      <input
        type="search"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Title</th>
            <th style={cellStyle}>Project</th>
            <th style={cellStyle}>Uploader</th>
            <th style={cellStyle}>Category</th>
            <th style={cellStyle}>Upload Date</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((document) => (
            <tr key={document.id}>
              <td style={cellStyle}>{document.id}</td>
              <td style={cellStyle}>{document.name}</td>
              <td style={cellStyle}>{document.project.name}</td>
              <td style={cellStyle}>{document.uploader.email}</td>
              <td style={cellStyle}>{document.category}</td>
              <td style={cellStyle}>{document.upload_date}</td>
              <td style={cellStyle}>
                <button onClick={() => handleEdit(document.id)}>Edit</button>
                <button onClick={() => confirmDelete(document.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;

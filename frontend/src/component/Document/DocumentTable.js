import React from 'react';
import { useDocumentContext } from './../../context/DocumentContext';
import gambarorg from '../../assets/img/gambarorg.png';

const DocumentTable = () => {
  const { documents, error, loading } = useDocumentContext();

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '8px',
  };

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
    return <p>No clients found.</p>;
  }

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={cellStyle}>ID</th>
          <th style={cellStyle}>Title</th>
          <th style={cellStyle}>Project</th>
          <th style={cellStyle}>Uploader</th>
          <th style={cellStyle}>Category</th>
          <th style={cellStyle}>Upload Date</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => (
          <tr key={document.id}>
            <td style={cellStyle}>{document.id}</td>
            <td style={cellStyle}>{document.name}</td>
            <td style={cellStyle}>{document.project.name}</td>
            <td style={cellStyle}>{document.uploader.email}</td>
            <td style={cellStyle}>{document.category}</td>
            <td style={cellStyle}>{document.upload_date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DocumentTable;

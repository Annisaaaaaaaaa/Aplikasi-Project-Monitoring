import React, { useState, useEffect } from 'react';
import { useDocumentContext } from './../../context/DocumentContext';
import gambarorg from '../../assets/img/gambarorg.png';
import { useHistory } from 'react-router-dom';

const DocumentTable = () => {
  const { documents, projects, users, error, loading, editDocument, deleteDocument } = useDocumentContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    id: 'asc',
    name: 'asc',
    project: 'asc',
    uploader: 'asc',
    category: 'asc',
    upload_date: 'asc',
  });
  const history = useHistory();

  useEffect(() => {
    animateRows();
  }, [documents, searchTerm]);

  const animateRows = () => {
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach((row, i) => {
      let tableData = row.innerText.toLowerCase(),
        searchData = searchTerm.toLowerCase();

      row.classList.toggle('hide', tableData.indexOf(searchData) < 0);
      row.style.setProperty('--delay', i / 25 + 's');
    });

    const visibleRows = Array.from(rows).filter((row) => !row.classList.contains('hide'));
    setVisibleRows(visibleRows);

    visibleRows.forEach((visibleRow, i) => {
      visibleRow.style.backgroundColor = i % 2 === 0 ? 'transparent' : '#0000000b';
    });
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '8px',
  };

  const handleSort = (column) => {
    const newOrder = sortOrder[column] === 'asc' ? 'desc' : 'asc';
    setSortOrder({ ...sortOrder, [column]: newOrder });
  };

  const sortedDocuments = documents.sort((a, b) => {
    const column = Object.keys(sortOrder).find((key) => sortOrder[key] !== 'asc');
    const order = sortOrder[column] === 'asc' ? 1 : -1;

    if (a[column] < b[column]) return -1 * order;
    if (a[column] > b[column]) return 1 * order;
    return 0;
  });

  const filteredDocuments = sortedDocuments
    .map((document) => {
      const projectName = projects.find((project) => project.id === document.project)?.name || 'N/A';
      const uploaderName = users.find((user) => user.id === document.uploader)?.email || 'N/A';

      return {
        ...document,
        projectName,
        uploaderName,
      };
    })
    .filter(
      (document) =>
        document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        document.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        document.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        document.uploaderName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleEdit = (documentId) => {
    const newData = {};
    editDocument(documentId, newData);
    history.push(`/edit_doc/${documentId}`);
  };

  const confirmDelete = (documentId) => {
    console.log('Menghapus klien dengan ID:', documentId);

    if (window.confirm('Apakah Anda yakin ingin menghapus Data Document ini?')) {
      deleteDocument(documentId);
    }
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
    return <p>No Data found.</p>;
  }

  return (
    <div>
      <div className="input-group" style={{ marginTop: '34px' }}>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle} onClick={() => handleSort('id')}>
              ID {sortOrder.id === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('name')}>
              Title {sortOrder.name === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('project')}>
              Project {sortOrder.project === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('uploader')}>
              Uploader {sortOrder.uploader === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('category')}>
              Category {sortOrder.category === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('upload_date')}>
              Upload Date {sortOrder.upload_date === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((document, index) => (
            <tr key={document.id} className={visibleRows.includes(index) ? '' : 'hide'}>
              <td style={cellStyle}>{document.id}</td>
              <td style={cellStyle}>{document.name}</td>
              <td style={cellStyle}>{document.projectName}</td>
              <td style={cellStyle}>{document.uploaderName}</td>
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

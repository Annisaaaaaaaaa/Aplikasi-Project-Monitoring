import React, { useState, useEffect } from 'react';
import { useProjectContext } from './../../context/ProjectContext';
import gambarorg from '../../assets/img/gambarorg.png';
import { useHistory } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import 'animate.css';

const ProjectTable = ({ currentPage, itemsPerPage, totalItems }) => {
  const { projects, users, clients, error, loading, editProject, deleteProject } = useProjectContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState([]);
  const history = useHistory();
  const [sortOrder, setSortOrder] = useState({
    id: 'asc',
    name: 'asc',
    year: 'asc',
    customer: 'asc',
    start_date: 'asc',
    end_date: 'asc',
  });

  const handleSort = (column) => {
    const newOrder = sortOrder[column] === 'asc' ? 'desc' : 'asc';
    setSortOrder({ ...sortOrder, [column]: newOrder });
  };

  const handleEdit = (projectId) => {
    const newData = {}; 
    editProject(projectId, newData);
    history.push(`/project-edit/${projectId}/`);
  };

  const confirmDelete = (projectId) => {
    console.log('Menghapus klien dengan ID:', projectId);

    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(projectId);
        Swal.fire(
          'Dihapus!',
          'Proyek telah dihapus.',
          'success'
        )
      }
    });
  };

  useEffect(() => {
    animateRows();
  }, [projects, searchTerm, currentPage, itemsPerPage]);

  const sortedAndSlicedProjects = projects
  .map((project) => {
    const customerName = clients.find((client) => client.id === project.customer)?.name || 'N/A';

    return {
      ...project,
      customerName,
    };
  })
  .filter(
    (project) =>
      (typeof project.name === 'string' && project.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof project.year === 'number' && project.year.toString().includes(searchTerm)) ||
      (typeof project.customerName === 'string' && project.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof project.start_date === 'string' && project.start_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (typeof project.end_date === 'string' && project.end_date.toLowerCase().includes(searchTerm.toLowerCase()))
  )  
  .sort((a, b) => {
    const column = Object.keys(sortOrder).find((key) => sortOrder[key] !== 'asc');
    const order = sortOrder[column] === 'asc' ? 1 : -1;

    if (column === 'id') {
      const idA = isNaN(parseInt(a[column])) ? a[column] : parseInt(a[column]);
      const idB = isNaN(parseInt(b[column])) ? b[column] : parseInt(b[column]);
      return (idA - idB) * order;
    }

    const valueA = (a[column] || '').toString().toLowerCase();
    const valueB = (b[column] || '').toString().toLowerCase();

    if (valueA < valueB) return -1 * order;
    if (valueA > valueB) return 1 * order;
    return 0;
  })
  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const animateRows = () => {
    const rows = document.querySelectorAll('tbody tr');
    
    rows.forEach((row, i) => {
      row.classList.remove('hide');
      row.classList.add('animate__animated', 'animate__slideInLeft'); 
      row.style.setProperty('--delay', i / 25 + 's');
    });
  
    const visibleRows = Array.from(rows);
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

  if (!projects || projects.length === 0) {
    return <p>No projects found.</p>;
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
            <th style={cellStyle}>
              ID 
            </th>
            <th style={cellStyle} onClick={() => handleSort('name')}>
              Project Name {sortOrder.name === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('year')}>
              Year {sortOrder.year === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('customer')}>
              Customer Name {sortOrder.customer === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('start_date')}>
              Start Date {sortOrder.start_date === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle} onClick={() => handleSort('end_date')}>
              End Date {sortOrder.end_date === 'asc' ? '↑' : '↓'}
            </th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedAndSlicedProjects.map((project) => (
            <tr key={project.id}>
              <td style={cellStyle}>{project.id}</td>
              <td style={cellStyle}>{project.name}</td>
              <td style={cellStyle}>{project.year}</td>
              <td style={cellStyle}>{project.customerName}</td>
              <td style={cellStyle}>{project.start_date}</td>
              <td style={cellStyle}>{project.end_date}</td>
              <td style={cellStyle}>
                <button onClick={() => handleEdit(project.id)}>Edit</button>
                <button onClick={() => confirmDelete(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

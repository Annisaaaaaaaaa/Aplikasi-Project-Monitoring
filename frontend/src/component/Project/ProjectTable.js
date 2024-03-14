import React, { useState } from 'react';
import { useProjectContext } from './../../context/ProjectContext';
import gambarorg from '../../assets/img/gambarorg.png';

const ProjectTable = () => {
  const { projects, error, loading, editProject, deleteProject } = useProjectContext();
  const [searchTerm, setSearchTerm] = useState('');

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  const cellStyle = {
    textAlign: 'center',
    padding: '8px',
  };

  const handleEdit = (projectId) => {
    const newData = {}; 
    editProject(projectId, newData);
  };

  const confirmDelete = (projectId) => {
    console.log('Menghapus klien dengan ID:', projectId);
  
    if (window.confirm('Apakah Anda yakin ingin menghapus klien ini?')) {
      deleteProject(projectId);
    }
  };
  
  const filteredProjects = projects.filter(project =>
    project.contract_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.contract_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.am.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.pic.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.pm.toLowerCase().includes(searchTerm.toLowerCase())
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

  if (!projects || projects.length === 0) {
    return <p>No projects found.</p>;
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
            <th style={cellStyle}>Contract No</th>
            <th style={cellStyle}>Contract Date</th>
            <th style={cellStyle}>AM</th>
            <th style={cellStyle}>PIC</th>
            <th style={cellStyle}>PM</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.id}>
              <td style={cellStyle}>{project.id}</td>
              <td style={cellStyle}>{project.contract_no}</td>
              <td style={cellStyle}>{project.contract_date}</td>
              <td style={cellStyle}>{project.am.email}</td>
              <td style={cellStyle}>{project.pic.email}</td>
              <td style={cellStyle}>{project.pm.email}</td>
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

import React, { useState, useEffect } from 'react';
import { useUserContext } from './../../context/UserContext';
import gambarorg from '../../assets/img/gambarorg.png';
import { useHistory } from 'react-router-dom'; 

const UserTable = () => {
  const { users, profiles, error, loading, editInvoice, deleteInvoice } = useUserContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleRows, setVisibleRows] = useState([]);
  const history = useHistory();

  useEffect(() => {
    animateRows();
  }, [users, searchTerm]);

  const animateRows = () => {
    const rows = document.querySelectorAll('tbody tr');
  
    rows.forEach((row, i) => {
      let tableData = row.innerText.toLowerCase(), // Menggunakan innerText daripada textContent
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

//   const handleEdit = (invoiceId) => {
//     const newData = {};
//     editInvoice(invoiceId, newData);
//     history.push(`/invoice-edit/${invoiceId}/`);
//   };

//   const confirmDelete = (invoiceId) => {
//     console.log('Menghapus Data dengan ID:', invoiceId);

//     if (window.confirm('Apakah Anda yakin ingin menghapus Data Invoice ini?')) {
//       deleteInvoice(invoiceId);
//     }
//   };

  const filteredProfiles = profiles.map((profile) => {
    const userName = users.find((user) => user.id === profile.user)?.username || 'N/A';
    const userEmail = users.find((user) => user.id === profile.user)?.email || 'N/A';
    const userGroups = users.find((user) => user.id === profile.user)?.groups || 'N/A';
  
    return {
      ...profile,
      userName,
      userEmail,
      userGroups
    };
  });
  
  
  

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

  if (!profiles || profiles.length === 0) {
    return <p>No Data found.</p>;
  }

  return (
    <div>
      {/* <div className="input-group" style={{ marginTop: '34px' }}>
        <input
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>ID</th>
            <th style={cellStyle}>Full Name</th>
            <th style={cellStyle}>Username</th>
            <th style={cellStyle}>Email</th>
            <th style={cellStyle}>Role</th>
            <th style={cellStyle}>Status</th>
            <th style={cellStyle}>Grup</th>
            {/* <th style={cellStyle}>Actions</th> */}
          </tr>
        </thead>
        <tbody>
        {filteredProfiles.map((profile) => (
            <tr key={profile.id}>
                <td style={cellStyle}>{profile.id}</td>
                <td style={cellStyle}>{profile.full_name}</td>
                <td style={cellStyle}>{profile.userName}</td>
                <td style={cellStyle}>{profile.userEmail}</td>
                <td style={cellStyle}>{profile.role}</td>
                <td style={cellStyle}>{profile.status}</td>
                <td style={cellStyle}>{profile.userGroups}</td>
                {/* 
                <td style={cellStyle}>
                <button onClick={() => handleEdit(invoice.id)}>Edit</button>
                <button onClick={() => confirmDelete(invoice.id)}>Delete</button>
                </td> 
                */}
            </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

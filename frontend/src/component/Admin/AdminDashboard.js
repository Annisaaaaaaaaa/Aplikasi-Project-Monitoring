import React from 'react';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';

const AdminDashboard = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;

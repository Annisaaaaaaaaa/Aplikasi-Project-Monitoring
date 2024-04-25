import React, { useEffect, useState } from 'react';
import { useUserContext } from './../../context/UserContext';
import { useProfileContext } from './../../context/ProfileContext';
import { Link, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; // Import SweetAlert

const UserAndProfileTable = () => {
  const { users, error: userError, deleteUser, searchUsers, filterUsersByGroups } = useUserContext(); 
  const { profiles, error: profileError } = useProfileContext();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');

  const handleDeleteUser = async (userId) => {
    // Tampilkan pesan konfirmasi menggunakan SweetAlert
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmed.isConfirmed) {
      const userToDelete = users.find(user => user.id === userId); // Cari pengguna dengan ID yang cocok
      if (userToDelete) {
        const deleted = await deleteUser(userId);
        if (deleted) {
          toast.success(`${userToDelete.username} berhasil dihapus!!`);
        } else {
          toast.error(`Failed to delete user ${userToDelete.username}.`);
        }
      } else {
        toast.error(`User with ID ${userId} not found.`);
      }

      await deleteUser(userId);
      Swal.fire(
        'Deleted!',
        'User has been deleted.',
        'success'
      );
    }
  };

  const handleSearch = () => {
    searchUsers(searchQuery); // Panggil fungsi pencarian dengan query yang diberikan
  };

  const handleFilter = (selectedGroups) => {
    filterUsersByGroups(selectedGroups); // Panggil fungsi filter dengan grup-grup yang dipilih
  };

  if (userError || profileError) {
    return <div>Error: {userError || profileError}</div>;
  }

  return (
    <div>
      <h2>User and Profile List</h2>
      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <Link to="/administrator/user/add">
        <button>Add User</button>
      </Link>
      <ToastContainer />
      <div>
        <button onClick={() => {
          Swal.fire({
            title: 'Filter by Groups',
            html: `
              <input type="checkbox" id="1" name="1" value="1">
              <label for="1">Group 1</label><br>

              <input type="checkbox" id="2" name="2" value="2">
              <label for="2">Group 2</label><br>

              <input type="checkbox" id="3" name="3" value="3">
              <label for="3">Group 3</label><br>

              <input type="checkbox" id="4" name="4" value="4">
              <label for="4">Group 4</label><br>

              <input type="checkbox" id="5" name="5" value="5">
              <label for="5">Group 5</label><br>
          
            `,
            showCancelButton: true,
            confirmButtonText: 'Apply Filter',
          }).then((result) => {
            if (result.isConfirmed) {
              const selectedGroups = [];
              document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
                selectedGroups.push(checkbox.value);
              });
              handleFilter(selectedGroups);
            }
          });
        }}>Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Name</th>
            <th>Groups</th>
            <th>Titles</th>
            <th>Status</th>
            <th>Action</th> {/* Tambah kolom untuk tombol hapus */}
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.first_name}  {user.last_name}</td>
              <td>{user.groups && user.groups.length > 0 ? user.groups.join(', ') : 'No groups'}</td>
              <td>{user.profile.titles}</td>
              <td>{user.profile.status}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                
                <Link to={`/administrator/user/edit/${user.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default UserAndProfileTable;

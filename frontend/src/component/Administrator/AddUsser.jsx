import React, { useState } from 'react';
import { useUserContext } from '../../context/UserContext';

const AddUserForm = () => {
  const { addUser } = useUserContext();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    is_superuser: false,
    is_staff: false,
    is_active: true,
    groups: [],
    user_permissions: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    // Reset form setelah submit
    setFormData({
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      is_superuser: false,
      is_staff: false,
      is_active: true,
      groups: [],
      user_permissions: []
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
        />
      </label>
      <label>
        Is Superuser:
        <input
          type="checkbox"
          name="is_superuser"
          checked={formData.is_superuser}
          onChange={(e) => setFormData({ ...formData, is_superuser: e.target.checked })}
        />
      </label>
      <label>
        Is Staff:
        <input
          type="checkbox"
          name="is_staff"
          checked={formData.is_staff}
          onChange={(e) => setFormData({ ...formData, is_staff: e.target.checked })}
        />
      </label>
      <label>
        Is Active:
        <input
          type="checkbox"
          name="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
        />
      </label>
      <label>
        Groups:
        <select
          name="groups"
          value={formData.groups}
          onChange={handleChange}
          multiple
          required
        >
          <option value={1}>Group 1</option>
          <option value={2}>Group 2</option>
          <option value={3}>Group 3</option>
          <option value={4}>Group 4</option>
          <option value={5}>Group 5</option>
        </select>
      </label>
      {/* user_permissions field */}
      <button type="submit">Tambah Pengguna</button>
    </form>
  );
};

export default AddUserForm;

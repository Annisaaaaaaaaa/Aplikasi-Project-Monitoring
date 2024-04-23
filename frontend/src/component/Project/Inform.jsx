import React, { useState } from 'react';
import { useFormContext } from './../../context/FormContext';

const ProjectInformForm = ({ onNextStep, onPrevStep, users, priorityOptions, statusOptions }) => {
  const { formData, setFormData } = useFormContext();
  const { projectInitial } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      projectInitial: {
        ...projectInitial,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextStep();
  };
  
  return (
    <div>
      <h2>Project Inform</h2>
      <form onSubmit={handleSubmit}>
        <label>
          PIC (Person In Charge):
          <select name="pic" value={projectInitial.pic} onChange={handleInputChange}>
            <option value="">Select PIC</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </label>
        <label>
          AM (Account Manager):
          <select name="am" value={projectInitial.am} onChange={handleInputChange}>
            <option value="">Select AM</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </label>
        <label>
          PM (Project Manager):
          <select name="pm" value={projectInitial.pm} onChange={handleInputChange}>
            <option value="">Select PM</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </label>
        <label>
          Status:
          <select name="status" value={projectInitial.status} onChange={handleInputChange}>
            <option value="">Select Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priority:
          <select name="priority" value={projectInitial.priority} onChange={handleInputChange}>
            <option value="">Select Priority</option>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label>
          Remarks:
          <input type="text" name="remarks" value={projectInitial.remarks} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={onPrevStep}>Previous</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default ProjectInformForm;
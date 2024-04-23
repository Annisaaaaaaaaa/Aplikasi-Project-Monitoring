// import React, { useState } from 'react';
// import { useFormContext } from './FormContext';

// const ProjectInformForm = ({ onNextStep, onPrevStep, formData, users, priorityOptions, statusOptions }) => {
//   const { projectInform } = formData;
//   const [data, setData] = useState(projectInform);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onNextStep({ projectInform: data });
//   };
  
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         PIC (Person In Charge):
//         <select name="pic" value={data.pic} onChange={handleInputChange}>
//           <option value="">Select PIC</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.email}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         AM (Account Manager):
//         <select name="am" value={data.am} onChange={handleInputChange}>
//           <option value="">Select AM</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.email}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         PM (Project Manager):
//         <select name="pm" value={data.pm} onChange={handleInputChange}>
//           <option value="">Select PM</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.email}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Status:
//         <select name="status" value={data.status} onChange={handleInputChange}>
//           <option value="">Select Status</option>
//           {statusOptions.map((status) => (
//             <option key={status} value={status}>
//               {status}
//             </option>
//           ))}
//         </select>
//       </label>
//       <label>
//         Priority:
//         <select name="priority" value={data.priority} onChange={handleInputChange}>
//           <option value="">Select Priority</option>
//           {priorityOptions.map((priority) => (
//             <option key={priority} value={priority}>
//               {priority}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label>
//         Remarks:
//         <input type="text" name="remarks" value={data.remarks} onChange={handleInputChange} />
//       </label>
//       <button type="button" onClick={onPrevStep}>Previous</button>
//       <button type="submit">Next</button>
//     </form>
//   );
// };

// export default ProjectInformForm;

// import React, { useState } from 'react';
// import { useFormContext } from './FormContext';

// const ProjectInformForm = ({ onNextStep, onPrevStep, users, priorityOptions, statusOptions }) => {
//   const { formData, setFormData } = useFormContext();
//   const { projectInitial } = formData;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       projectInitial: {
//         ...projectInitial,
//         [name]: value,
//       },
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onNextStep();
//   };
  
//   return (
//     <div>
//       <h2>Project Inform</h2>
//       <form onSubmit={handleSubmit}>
        // <label>
        //   PIC (Person In Charge):
        //   <select name="pic" value={projectInitial.pic} onChange={handleInputChange}>
        //     <option value="">Select PIC</option>
        //     {users.map((user) => (
        //       <option key={user.id} value={user.id}>
        //         {user.email}
        //       </option>
        //     ))}
        //   </select>
        // </label>
        // <label>
        //   AM (Account Manager):
        //   <select name="am" value={projectInitial.am} onChange={handleInputChange}>
        //     <option value="">Select AM</option>
        //     {users.map((user) => (
        //       <option key={user.id} value={user.id}>
        //         {user.email}
        //       </option>
        //     ))}
        //   </select>
        // </label>
        // <label>
        //   PM (Project Manager):
        //   <select name="pm" value={projectInitial.pm} onChange={handleInputChange}>
        //     <option value="">Select PM</option>
        //     {users.map((user) => (
        //       <option key={user.id} value={user.id}>
        //         {user.email}
        //       </option>
        //     ))}
        //   </select>
        // </label>
        // <label>
        //   Status:
        //   <select name="status" value={projectInitial.status} onChange={handleInputChange}>
        //     <option value="">Select Status</option>
        //     {statusOptions.map((status) => (
        //       <option key={status} value={status}>
        //         {status}
        //       </option>
        //     ))}
        //   </select>
        // </label>
        // <label>
        //   Priority:
        //   <select name="priority" value={projectInitial.priority} onChange={handleInputChange}>
        //     <option value="">Select Priority</option>
        //     {priorityOptions.map((priority) => (
        //       <option key={priority} value={priority}>
        //         {priority}
        //       </option>
        //     ))}
        //   </select>
        // </label>

        // <label>
        //   Remarks:
        //   <input type="text" name="remarks" value={projectInitial.remarks} onChange={handleInputChange} />
        // </label>
//         <button type="button" onClick={onPrevStep}>Previous</button>
//         <button type="submit">Next</button>
//       </form>
//     </div>
//   );
// };

// export default ProjectInformForm;


import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AuthContext from './../../context/AuthContext'; 

const EditProjectInform = ({ match }) => {
  const history = useHistory();
  const { projectId } = useParams();
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [statusOptions] = useState(['On Going', 'Overdue', 'Waiting', 'Done']);
  const [priorityOptions] = useState(['tinggi', 'sedang', 'rendah']);
  const [formErrors, setFormErrors] = useState({});
  
  const [formData, setFormData] = useState({
    am: '',
    pic: '',
    pm: '',
    status: '',
    priority: '',
    remarks: '',
  });

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const usersResponse = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(usersResponse.data);

        const response = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const projectData = response.data;

        setFormData({
          am: projectData.am,
          pic: projectData.pic,
          pm: projectData.pm,
          status: projectData.status,
          priority: projectData.priority,
          remarks: projectData.remarks,      
        });
      } catch (error) {
        console.error('Error fetching project data:', error);
        toast.error('Failed to fetch project data. Please try again.');
      }
    };

    fetchProjectData();
  },[projectId, authContext.authTokens]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kirim data gabungan ke server untuk pembaruan
      const token = authContext.authTokens ? authContext.authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }
      setLoading(true);

      // Ambil data sebelumnya dari server
      const previousDataResponse = await axios.get(`http://localhost:8000/api/v1/project/edit/${projectId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const previousData = previousDataResponse.data;

      // Gabungkan data sebelumnya dengan data baru (hanya kolom engineer yang diubah)
      const updatedData = {
        ...previousData,
        am: formData.am,
        pic: formData.pic,
        pm: formData.pm,
        status: formData.status,
        priority: formData.priority,
        remarks: formData.remarks,      
      };

      const result = await axios.put(`http://localhost:8000/api/v1/project/edit/${projectId}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setLoading(false);
      console.log('Server response:', result.data); 
      toast.success('Project berhasil diperbarui');
      history.push('/project-admin'); 

    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        console.log('Server error response:', errorData); 
        setFormErrors(errorData);
      } else {
        console.error('Error updating project:', error.message);
        toast.error('Gagal memperbarui proyek. Silakan coba lagi.');
      }
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <div>
      <h2>Edit Project - Project Inform</h2>
      <form onSubmit={handleSubmit}>
      <label>
          PIC (Person In Charge):
          <select name="pic" value={formData.pic} onChange={handleInputChange}>
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
          <select name="am" value={formData.am} onChange={handleInputChange}>
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
          <select name="pm" value={formData.pm} onChange={handleInputChange}>
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
          <select name="status" value={formData.status} onChange={handleInputChange}>
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
          <select name="priority" value={formData.priority} onChange={handleInputChange}>
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
          <input type="text" name="remarks" value={formData.remarks} onChange={handleInputChange} />
        </label>

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default EditProjectInform;

import React, { useEffect, useState } from 'react';
import { useActivityContext } from './../../context/ActivityContext';
import { Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';



const ActivityTable = () => {
  const { activityData, loading, error, userData, projectData, deleteActivity, searchActivity, filterAcitivityByStatus } = useActivityContext();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search');


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleDelete = async (activityId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this activity!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
  
    if (result.isConfirmed) {
      await deleteActivity(activityId);
      Swal.fire(
        'Deleted!',
        'Your activity has been deleted.',
        'success'
      );
    }
  };

  const handleFilter = (selectedStatus) => {
    filterAcitivityByStatus(selectedStatus); 
  };

  const handleSearch = () => {
    searchActivity(searchQuery); 
  };
  

  return (
    <div>
      <h1>Activity Data</h1>
      <br />

      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

      < br/>
      <ToastContainer />
      <div>
        <button onClick={() => {
            Swal.fire({
                title: 'Filter by Status',
                html: `
                    <input type="checkbox" id="Done" name="status" value="Done">
                    <label for="Done">Done</label><br>

                    <input type="checkbox" id="OnGoing" name="status" value="On Going">
                    <label for="OnGoing">On Going</label><br>

                    <input type="checkbox" id="Waiting" name="status" value="Waiting">
                    <label for="Waiting">Waiting</label><br>

                    <input type="checkbox" id="Overdue" name="status" value="Overdue">
                    <label for="Overdue">Overdue</label><br>

                    <input type="checkbox" id="NotStartedYet" name="status" value="Not Started Yet">
                    <label for="NotStartedYet">Not Started Yet</label><br>

                    <input type="checkbox" id="Incompleted" name="status" value="Incompleted">
                    <label for="Incompleted">Incompleted</label><br>

                    <input type="checkbox" id="Chaotic" name="status" value="Chaotic">
                    <label for="Chaotic">Chaotic</label><br>
                `,
                showCancelButton: true,
                confirmButtonText: 'Apply Filter',
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedStatus = [];
                    document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
                        selectedStatus.push(checkbox.value);
                    });
                    handleFilter(selectedStatus);
                }
            });
        }}>Filter</button>
    </div>


      <br />
      <Link to="/pm/aktivitas/tambah">
        <button>Add Project'sAcitivity</button>
      </Link>
      <br />
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>PM</th>
            <th>Name</th>
            <th>Date Start</th>
            <th>Date Finish</th>
            <th>Date Estimated</th>
            <th>Note</th>
            <th>Status</th>
            <th>Tanggung Jawab</th>
            <th>Engineer</th>
            <th>Persentase Beban Kerja</th>
            <th>Engineer Status</th>
            <th>User</th>
            <th>Stakeholder</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activityData.map((activity, index) => (
            <tr key={index}>
              <td>
                {projectData.find(project => project.id === activity.project) ? (
                    <>
                    {projectData.find(project => project.id === activity.project)?.name}{' '}
                    ({projectData.find(project => project.id === activity.project)?.pid})
                    </>
                ) : (
                    '-'
                )}
              </td>
              <td>
                {userData.find(user => user.id === activity.pm) ? (
                  <>
                    {userData.find(user => user.id === activity.pm).first_name}{' '}
                    {userData.find(user => user.id === activity.pm).last_name}
                  </>
                ) : (
                  'No PM'
                )}
              </td>
              <td>{activity.name}</td>
              <td>{activity.date_start}</td>
              <td>{activity.date_finish}</td>
              <td>{activity.date_estimated}</td>
              <td>{activity.note}</td>
              <td>{activity.status}</td>
              <td>{activity.tanggung_jawab}</td>
              <td>
                {activity.engineer_activities.map((engineerActivity, index) => (
                  <div key={index}>
                    {userData.find(user => user.id === engineerActivity.engineer)?.first_name}{' '}
                    {userData.find(user => user.id === engineerActivity.engineer)?.last_name}
                  </div>
                ))}
              </td>
              <td>
                {activity.engineer_activities.map((engineerActivity, index) => (
                  <div key={index}>{engineerActivity.persentase_beban_kerja}</div>
                ))}
              </td>
              <td>
                {activity.engineer_activities.map((engineerActivity, index) => (
                  <div key={index}>{engineerActivity.status}</div>
                ))}
              </td>
              <td>
                {activity.stakeholder_activities.map((stakeholderActivity, index) => (
                  <div key={index}>
                    {userData.find(user => user.id === stakeholderActivity.user)?.first_name}{' '}
                    {userData.find(user => user.id === stakeholderActivity.user)?.last_name}
                  </div>
                ))}
              </td>
              <td>
                {activity.stakeholder_activities.map((stakeholderActivity, index) => (
                  <div key={index}>{stakeholderActivity.stakeholder}</div>
                ))}
              </td>

              <td>
                <button onClick={() => handleDelete(activity.id)}>Delete</button>
                <br />
                <Link to={`/pm/aktivitas/edit/${activity.id}`}>
                  <button>Edit</button>
                </Link>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;

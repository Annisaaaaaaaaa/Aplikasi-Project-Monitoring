import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './../../context/AuthContext';


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const authContext = useContext(AuthContext);
  const { authTokens } = useContext(AuthContext);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const response = await axios.get(`http://127.0.0.1:8000/api/v1/project/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <h2>List of Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <span>{project.name}</span>
            <Link to={`/administrator/project/edit/${project.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;

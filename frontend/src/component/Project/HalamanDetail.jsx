import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const ProjectDetailPage = () => {
  const { authTokens } = useContext(AuthContext);
  const { projectId } = useParams();
  const [projectDetail, setProjectDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const token = authTokens ? authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const response = await axios.get(`http://localhost:8000/api/v1/project/detail/${projectId}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });

        setProjectDetail(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching project detail');
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!projectDetail) {
    return <p>Project detail not found.</p>;
  }

  return (
    <div>
      <h2>Project Detail</h2>
      <p>Year: {projectDetail.year}</p>
      <p>PID: {projectDetail.pid}</p>
      <p>Name: {projectDetail.name}</p>
      <p>Description: {projectDetail.description}</p>
      <p>Customer: {projectDetail.customer}</p>
      <p>Sales: {projectDetail.sales}</p>
      <p>Amount Tax: {projectDetail.amount_tax}</p>
      <p>Amount Exc Tax: {projectDetail.amount_exc_tax}</p>
      <p>Contract No: {projectDetail.contract_no}</p>
      <p>Contract Date: {projectDetail.contract_date}</p>
      <p>AM: {projectDetail.am}</p>
      <p>PIC: {projectDetail.pic}</p>
      <p>PM: {projectDetail.pm}</p>
      <p>Start Date: {projectDetail.start_date}</p>
      <p>End Date: {projectDetail.end_date}</p>
      <p>Status: {projectDetail.status}</p>
      <p>TOP: {projectDetail.top}</p>
      <p>SOW: {projectDetail.sow}</p>
      <p>OOS: {projectDetail.oos}</p>
      <p>Detail: {projectDetail.detail}</p>
      <p>Remarks: {projectDetail.remarks}</p>
      <p>Weight: {projectDetail.weight}</p>
      <p>Priority: {projectDetail.priority}</p>
      <p>Type: {projectDetail.type}</p>
      <p>Market Segment: {projectDetail.market_segment}</p>
      <p>Tech Use: {projectDetail.tech_use}</p>
      <p>Resiko: {projectDetail.resiko}</p>
      <p>Beban Proyek: {projectDetail.beban_proyek}</p>
      <h3>Engineer Projects</h3>
      {projectDetail.engineer_projects.map((engineerProject, index) => (
        <div key={index}>
          <p>Engineer: {engineerProject.engineer}</p>
          <p>Presentase Beban Kerja: {engineerProject.presentase_beban_kerja}</p>
          <p>Status: {engineerProject.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectDetailPage;

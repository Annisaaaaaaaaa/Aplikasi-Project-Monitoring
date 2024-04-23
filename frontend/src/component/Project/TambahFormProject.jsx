import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ProjectInitialForm from './ProjectInitialForm';
import ProjectInformForm from './Inform';
import ProjectDetailForm from './Detail';
import ProjectEngineerForm from './Engineer';
import { FormProvider } from './../../context/FormContext';
import AuthContext from './../../context/AuthContext';

const FormTambahProject = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    // Inisialisasi data formulir
    projectInitial: {
        
      year: '',
      pid: '',
      name: '',
      description: '',
      customer: '',
      sales: '',
      amount_tax: '',
      amount_exc_tax: '',
      contract_no: '',
      contract_date: '',
      am: '',
      pic: '',
      pm: '',
      start_date: '',
      end_date: '',
      status: '',
      top: '',
      sow: '',
      oos: '',
      detail: '',
      remarks: '',
      weight: '',
      priority: '',
      type: '',
      market_segment: '',
      tech_use: '',
      resiko: '',
      beban_proyek: '',
      engineer_projects: [
        {
          engineer: '',
          presentase_beban_kerja: '',
          status: '',
        },
      ],
    },
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [priorityOptions] = useState(['tinggi', 'sedang', 'rendah']);
  const [statusOptions] = useState(['On Going', 'Overdue', 'Waiting', 'Done']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authContext.authTokens ? authContext.authTokens.access : null;
        if (!token) {
          throw new Error('Authentication token is missing');
        }

        const usersResponse = await axios.get('http://127.0.0.1:8000/api/users/tambah', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        const clientsResponse = await axios.get('http://localhost:8000/api/v1/client/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(usersResponse.data);
        setClients(clientsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [authContext.authTokens]);

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    if (step < 4) {
      setStep(step + 1);
    } else {
      submitFormData();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const submitFormData = async () => {
    try {
        console.log('Form data:', formData);

        
      const token = authContext.authTokens ? authContext.authTokens.access : null;
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.post('http://localhost:8000/api/v1/project/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Form submitted successfully:', response.data);

      // Reset form data after submission
      setFormData({
        projectInitial: {
          year: '',
          pid: '',
          name: '',
          description: '',
          customer: '',
          sales: '',
          amount_tax: '',
          amount_exc_tax: '',
          contract_no: '',
          contract_date: '',
          am: '',
          pic: '',
          pm: '',
          start_date: '',
          end_date: '',
          status: '',
          top: '',
          sow: '',
          oos: '',
          detail: '',
          remarks: '',
          weight: '',
          priority: '',
          type: '',
          market_segment: '',
          tech_use: '',
          resiko: '',
          beban_proyek: '',
          engineer_projects: [
            {
              engineer: '',
              presentase_beban_kerja: '',
              status: '',
            },
          ],
        },
      });

      history.push('/project-admin');
    } catch (error) {
      console.error('Error submitting form:', error.message);
      // Handle error as needed
    }
  };

  return (
    <FormProvider>
      <div>
        <nav>
          <ul>
            <li className={step === 1 ? 'active' : ''} onClick={() => setStep(1)}>Step 1</li>
            <li className={step === 2 ? 'active' : ''} onClick={() => setStep(2)}>Step 2</li>
            <li className={step === 3 ? 'active' : ''} onClick={() => setStep(3)}>Step 3</li>
            <li className={step === 4 ? 'active' : ''} onClick={() => setStep(4)}>Step 4</li>
          </ul>
        </nav>
        <h1>Step {step}</h1>
        {step === 1 && (
          <ProjectInitialForm
            onNextStep={handleNextStep}
            users={users}
            clients={clients}
          />
        )}
        {step === 2 && (
          <ProjectInformForm
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            users={users}
            priorityOptions={priorityOptions}
            statusOptions={statusOptions}
          />
        )}
        {step === 3 && (
          <ProjectDetailForm
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
          />
        )}
        {step === 4 && (
          <ProjectEngineerForm
            onSubmit={handleNextStep}
            onPrevStep={handlePrevStep}
            users={users}
            statusOptions={statusOptions}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default FormTambahProject;

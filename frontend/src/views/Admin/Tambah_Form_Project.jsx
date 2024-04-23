// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import ProjectInitialForm from './../../component/Project/ProjectInitialForm';
// import ProjectInformForm from './../../component/Project/ProjectInformForm';
// import ProjectDetailForm from './../../component/Project/ProjectDetailForm';
// import ProjectEngineerForm from './../../component/Project/ProjectEngineerForm';
// import FormContext, { FormProvider } from './../../component/Project/FormContext';
// import AuthContext from '../../context/AuthContext';

// const Form_Tambah_Project = () => {
//   const history = useHistory();
//   const { formData, setFormData } = useContext(FormContext); 
//   const [step, setStep] = useState(1);
//   const authContext = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [projectId, setProjectId] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [priorityOptions] = useState(['tinggi', 'sedang', 'rendah']);
//   const [statusOptions] = useState(['On Going', 'Overdue', 'Waiting', 'Done']);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = authContext.authTokens ? authContext.authTokens.access : null;
//         if (!token) {
//           throw new Error('Authentication token is missing');
//         }

//         const usersResponse = await axios.get('http://localhost:8000/api/user/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const clientsResponse = await axios.get('http://localhost:8000/api/v1/client/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUsers(usersResponse.data);
//         setClients(clientsResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [authContext.authTokens]);

//   const handleNextStep = async (data) => {
//     setFormData(prevData => ({ ...prevData, [`step${step}`]: data }));
//     if (step < 4) {
//       setStep(prevStep => prevStep + 1);
//     } else {
//       try {
//         setLoading(true);
//         const token = authContext.authTokens ? authContext.authTokens.access : null;
//         if (!token) {
//           throw new Error('Authentication token is missing');
//         }

//         const formDataToSend = {
//           ...formData,
//           [`step${step}`]: data,
//         };

//         await axios.post('http://localhost:8000/api/v1/project/', formDataToSend, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         setFormData({
//           year: '',
//           pid: '',
//           name: '',
//           top: '',
//           description: '',
//           sales: '',
//           customer: '',
//           contract_no: '',
//           contract_date: '',
//           amount_tax: '',
//           amount_exc_tax: '',
//           am: '',
//           pic: '',
//           pm: '',
//           status: '',
//           priority: '',
//           remarks: '',
//           start_date: '',
//           end_date: '',
//           sow: '',
//           oos: '',
//           detail: '',
//           type: '',
//           market_segment: '',
//           tech_use: '',
//           resiko: '',
//           beban_proyek: '',
//           engineers: {
//               engineer: '',
//               presentase_beban_kerja: '',
//               status: '',
//           }
//         });

//         setError(null);

//         history.push('/project-admin');
//       } catch (error) {
//         console.error('Error submitting form:', error.message);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handlePrevStep = () => {
//     setStep(prevStep => prevStep - 1);
//   };

//   return (
//     <FormProvider>
//       <div>
//         <nav>
//             <ul>
//                 <li onClick={() => setStep(1)}>Step 1</li>
//                 <li onClick={() => setStep(2)}>Step 2</li>
//                 <li onClick={() => setStep(3)}>Step 3</li>
//                 <li onClick={() => setStep(4)}>Step 4</li>
//             </ul>
//         </nav>
//         <h1>Step {step}</h1>
//         {step === 1 && (
//           <ProjectInitialForm
//             onNextStep={handleNextStep}
//             users={users}
//             clients={clients}
//             setProjectId={setProjectId}
//           />
//         )}
//         {step === 2 && (
//           <ProjectInformForm
//             onNextStep={handleNextStep}
//             onPrevStep={handlePrevStep}
//             users={users}
//             priorityOptions={priorityOptions}
//             statusOptions={statusOptions}
//             projectId={projectId}
//             setError={setError}
//           />
//         )}
//         {step === 3 && (
//           <ProjectDetailForm
//             onNextStep={handleNextStep}
//             onPrevStep={handlePrevStep}
//             setError={setError}
//           />
//         )}
//         {step === 4 && (
//           <ProjectEngineerForm
//             onSubmit={handleNextStep}
//             onPrevStep={handlePrevStep}
//             setError={setError}
//             users={users}
//             statusOptions={statusOptions}
//           />
//         )}
//         {loading && <p>Loading...</p>}
//         {error && <p>Error: {error}</p>}
//       </div>
//     </FormProvider>
//   );
// };

// export default Form_Tambah_Project;

// Form_Tambah_Project.js
// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useHistory } from 'react-router-dom';
// import ProjectInitialForm from './../../component/Project/ProjectInitialForm';
// import ProjectInformForm from './../../component/Project/ProjectInformForm';
// import ProjectDetailForm from './../../component/Project/ProjectDetailForm';
// import ProjectEngineerForm from './../../component/Project/ProjectEngineerForm';
// import FormContext, { FormProvider } from './../../component/Project/FormContext';
// import AuthContext from '../../context/AuthContext';

// const Form_Tambah_Project = () => {
//   const history = useHistory();
//   const { formData, setFormData } = useContext(FormContext); 
//   const [step, setStep] = useState(1);
//   const authContext = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [projectId, setProjectId] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [clients, setClients] = useState([]);
//   const [priorityOptions] = useState(['tinggi', 'sedang', 'rendah']);
//   const [statusOptions] = useState(['On Going', 'Overdue', 'Waiting', 'Done']);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = authContext.authTokens ? authContext.authTokens.access : null;
//         if (!token) {
//           throw new Error('Authentication token is missing');
//         }

//         const usersResponse = await axios.get('http://localhost:8000/api/user/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const clientsResponse = await axios.get('http://localhost:8000/api/v1/client/', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setUsers(usersResponse.data);
//         setClients(clientsResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error.message);
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, [authContext.authTokens]);

//   const handleNextStep = async (data) => {
//     setFormData(prevData => ({ ...prevData, [`project${step}`]: data }));
//     if (step < 4) {
//       setStep(prevStep => prevStep + 1);
//     } else {
//       try {
//         setLoading(true);
//         const token = authContext.authTokens ? authContext.authTokens.access : null;
//         if (!token) {
//           throw new Error('Authentication token is missing');
//         }
  
        // await axios.post('http://localhost:8000/api/v1/project/', formData, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        // });
  
//         setFormData({
//           projectInitial: {
//             year: '',
//             pid: '',
//             name: '',
//             top: '',
//             description: '',
//             sales: '',
//             customer: '',
//             contract_no: '',
//             contract_date: '',
//             amount_tax: '',
//             amount_exc_tax: '',
//           },
//           projectInform: {
//             am: '',
//             pic: '',
//             pm: '',
//             status: '',
//             priority: '',
//             remarks: '',
//           },
//           projectDetail: {
//             start_date: '',
//             end_date: '',
//             sow: '',
//             oos: '',
//             detail: '',
//             type: '',
//             market_segment: '',
//             tech_use: '',
//             resiko: '',
//             beban_proyek: '',
//           },
//           projectEngineer: {
//             engineers: [
//               {
//                 engineer: '',
//                 presentase_beban_kerja: '',
//                 status: '',
//               }
//             ]
//           },
//         });
  
//         setError(null);
  
//         history.push('/project-admin');
//       } catch (error) {
//         console.error('Error submitting form:', error.message);
//         setError(error.message); 
//       } finally {
//         setLoading(false);
//       }
//     }
//   };
  
//   const handlePrevStep = () => {
//     setStep(prevStep => prevStep - 1);
//   };

//   return (
//     <FormProvider>
//       <div>
//         <nav>
//             <ul>
//                 <li onClick={() => setStep(1)}>Step 1</li>
//                 <li onClick={() => setStep(2)}>Step 2</li>
//                 <li onClick={() => setStep(3)}>Step 3</li>
//                 <li onClick={() => setStep(4)}>Step 4</li>
//             </ul>
//         </nav>
//         <h1>Step {step}</h1>
//         {step === 1 && (
//           <ProjectInitialForm
//             onNextStep={handleNextStep}
//             users={users}
//             clients={clients}
//             setProjectId={setProjectId}
//           />
//         )}
//         {step === 2 && (
//           <ProjectInformForm
//             onNextStep={handleNextStep}
//             onPrevStep={handlePrevStep}
//             users={users}
//             priorityOptions={priorityOptions}
//             statusOptions={statusOptions}
//             projectId={projectId}
//             setError={setError}
//           />
//         )}
//         {step === 3 && (
//           <ProjectDetailForm
//             onNextStep={handleNextStep}
//             onPrevStep={handlePrevStep}
//             setError={setError}
//           />
//         )}
//         {step === 4 && (
//           <ProjectEngineerForm
//             onSubmit={handleNextStep}
//             onPrevStep={handlePrevStep}
//             setError={setError}
//             users={users}
//             statusOptions={statusOptions}
//           />
//         )}
//         {loading && <p>Loading...</p>}
//         {error && <p>Error: {error}</p>}
//       </div>
//     </FormProvider>
//   );
// };

// export default Form_Tambah_Project;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ProjectInitialForm from './../../component/Project/ProjectInitialForm';
import ProjectInformForm from './../../component/Project/ProjectInformForm';
import ProjectDetailForm from './../../component/Project/ProjectDetailForm';
import ProjectEngineerForm from './../../component/Project/ProjectEngineerForm';
import { FormProvider } from './../../component/Project/FormContext';
import AuthContext from '../../context/AuthContext';

const Form_Tambah_Project = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
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

        const usersResponse = await axios.get('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
            formData={formData}
          />
        )}
        {step === 2 && (
          <ProjectInformForm
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            users={users}
            priorityOptions={priorityOptions}
            statusOptions={statusOptions}
            formData={formData}
          />
        )}
        {step === 3 && (
          <ProjectDetailForm
            onNextStep={handleNextStep}
            onPrevStep={handlePrevStep}
            formData={formData}
          />
        )}
        {step === 4 && (
          <ProjectEngineerForm
            onSubmit={handleNextStep}
            onPrevStep={handlePrevStep}
            users={users}
            statusOptions={statusOptions}
            formData={formData}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default Form_Tambah_Project;

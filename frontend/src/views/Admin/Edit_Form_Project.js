import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from './../../context/AuthContext'; 
import EditProjectInform from './../../component/Project/ProjectInformForm';
import EditProjectDetail from './../../component/Project/ProjectDetailForm';
import EditProjectForm from './../../component/Project/ProjectEngineerForm';

const EditProjectStepper = ({ match }) => {
  const history = useHistory();
  const { projectId } = useParams();
  const authContext = useContext(AuthContext);
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };


  return (
    <div>
      {step === 1 && <EditProjectInform projectId={projectId} />}
      {step === 2 && <EditProjectDetail projectId={projectId} handleNextStep={handleNextStep} />}
      {step === 3 && <EditProjectForm projectId={projectId} />}
      
      <div>
        {step !== 1 && <button onClick={handlePrevStep}>Previous Step</button>}
        {step !== 3 && <button onClick={handleNextStep}>Next Step</button>}
      </div>
    </div>
  );
};

export default EditProjectStepper;

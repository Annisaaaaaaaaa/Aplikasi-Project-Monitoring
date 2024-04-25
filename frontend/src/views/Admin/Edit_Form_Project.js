import React, { useState, useEffect, useContext } from 'react'; 
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from './../../context/AuthContext'; 
import EditProjectInform from './../../component/Project/ProjectInformForm';
import EditProjectDetail from './../../component/Project/ProjectDetailForm';
import EditProjectForm from './../../component/Project/ProjectEngineerForm';
import EditProjectInitial from '../../component/Project/ProjectInitialEdit';

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
      {step === 1 && <EditProjectInitial projectId={projectId} handleNextStep={handleNextStep}/>}
      {step === 2 && <EditProjectInform projectId={projectId} handleNextStep={handleNextStep}/>}
      {step === 3 && <EditProjectDetail projectId={projectId} handleNextStep={handleNextStep} />}
      {step === 4 && <EditProjectForm projectId={projectId} />}
      
      <div>
        {step !== 1 && <button onClick={handlePrevStep}>Previous</button>}
        <br></br>
        {step !== 4 && <button onClick={handleNextStep}>Next</button>}
      </div>
    </div>
  );
};

export default EditProjectStepper;

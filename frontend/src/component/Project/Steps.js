// Steps.js
import React, { useContext, useState } from 'react';
import ProjectInitialForm from './ProjectInitial';
import ProjectInformForm from './ProjectInformForm';
import ProjectDetailForm from './ProjectDetailForm';
import ProjectEngineerForm from './ProjectEngineerForm';
import AuthContext from './../../context/AuthContext';
import axios from 'axios';

function Steps({ step, setStep, formData, setFormData, handleInputChange, users, clients, engineers, priorityOptions, statusOptions, history }) {
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmitStep = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const token = authContext.authTokens ? authContext.authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            let url = 'http://localhost:8000/api/v1/project/';
            let formDataToSend = {};

            switch (step) {
                case 1:
                    formDataToSend = formData.initial;
                    break;
                case 2:
                    formDataToSend = formData.inform;
                    break;
                case 3:
                    formDataToSend = formData.detail;
                    break;
                case 4:
                    formDataToSend = formData.engineer;
                    break;
                default:
                    break;
            }

            const response = await axios.post(url, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': step === 4 ? 'application/json' : 'multipart/form-data',
                },
            });

            setError(null);

            if (step === 4) {
                history.push('/project-admin');
            } else {
                nextStep();
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <ProjectInitialForm
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        handleInputChange={handleInputChange}
                        users={users}
                        clients={clients}
                    />
                );
            case 2:
                return (
                    <ProjectInformForm
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleInputChange={handleInputChange}
                        users={users}
                        priorityOptions={priorityOptions}
                        statusOptions={statusOptions}
                    />
                );
            case 3:
                return (
                    <ProjectDetailForm
                        formData={formData}
                        setFormData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        handleInputChange={handleInputChange}
                    />
                );
            case 4:
                return (
                    <ProjectEngineerForm
                        formData={formData}
                        setFormData={setFormData}
                        prevStep={prevStep}
                        handleInputChange={handleInputChange}
                        engineers={engineers}
                        statusOptions={statusOptions}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <nav>
                <ul>
                    <li onClick={() => setStep(1)}>Step 1</li>
                    <li onClick={() => setStep(2)}>Step 2</li>
                    <li onClick={() => setStep(3)}>Step 3</li>
                    <li onClick={() => setStep(4)}>Step 4</li>
                </ul>
            </nav>
            <h1>Step {step}</h1>
            <form onSubmit={handleSubmitStep}>
                {renderStep()}
                <button type="submit" disabled={loading}>Submit</button>
                {error && <p>Error: {error}</p>}
            </form>
        </div>
    );
}

export default Steps;

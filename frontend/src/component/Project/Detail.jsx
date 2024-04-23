import React, { useState } from 'react';
import { useFormContext } from './../../context/FormContext';

const ProjectDetailForm = ({ onNextStep, onPrevStep }) => {
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
      <h2>Project Detail</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Project Load:
          <input type="number" name="beban_proyek" value={projectInitial.beban_proyek || ''} onChange={handleInputChange} />
        </label>
        <label>
          Type:
          <input type="text" name="type" value={projectInitial.type || ''} onChange={handleInputChange} />
        </label>
        <label>
          Market Segment:
          <input type="text" name="market_segment" value={projectInitial.market_segment || ''} onChange={handleInputChange} />
        </label>
        <label>
          Risk:
          <input type="text" name="resiko" value={projectInitial.resiko || ''} onChange={handleInputChange} />
        </label>
        <label>
          Tech Use:
          <textarea type="text" name="tech_use" value={projectInitial.tech_use || ''} onChange={handleInputChange} ></textarea>
        </label>

        <label>
          Start Date:
          <input type="date" name="start_date" value={projectInitial.start_date || ''} onChange={handleInputChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="end_date" value={projectInitial.end_date || ''} onChange={handleInputChange} />
        </label>
        <label>
          SOW:
          <input type="text" name="sow" value={projectInitial.sow || ''} onChange={handleInputChange} />
        </label>
        <label>
          OOS:
          <input type="text" name="oos" value={projectInitial.oos || ''} onChange={handleInputChange} />
        </label>
        <label>
          Detail:
          <textarea name="detail" value={projectInitial.detail || ''} onChange={handleInputChange} />
        </label>
      
        <button type="button" onClick={onPrevStep}>Previous</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default ProjectDetailForm;
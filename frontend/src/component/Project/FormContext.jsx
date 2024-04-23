import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
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
      completion_percentage: '',
      engineer_projects: [
        {
          engineer: '',
          presentase_beban_kerja: '',
          status: '',
        },
      ],
    },
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;

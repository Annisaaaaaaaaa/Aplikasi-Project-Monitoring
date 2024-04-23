// import React, { createContext, useContext, useState } from 'react';

// const FormContext = createContext();

// export const useFormContext = () => useContext(FormContext);

// export const FormProvider = ({ children }) => {
//   const [formData, setFormData] = useState({
//     projectInitial: {
//       year: '',
//       pid: '',
//       name: '',
//       top: '',
//       description: '',
//       sales: '',
//       customer: '',
//       contract_no: '',
//       contract_date: '',
//       amount_tax: '',
//       amount_exc_tax: '',
//     },
//     projectInform: {
//       am: '',
//       pic: '',
//       pm: '',
//       status: '',
//       priority: '',
//       remarks: '',
//     },
//     projectDetail: {
//       start_date: '',
//       end_date: '',
//       sow: '',
  //     oos: '',
  //     detail: '',
  //     type: '',
  //     market_segment: '',
  //     tech_use: '',
  //     resiko: '',
  //     beban_proyek: '',
  //   },
  //   projectEngineer: {
  //     engineers: [
  //       {
  //         engineer: '',
  //         presentase_beban_kerja: '',
  //         status: '',
  //       }
  //     ]
  //   },
  // });

//   return (
//     <FormContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// export default FormContext;


// // FormContext.js
// import React, { createContext, useState } from 'react';

// const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [formData, setFormData] = useState({
//     initial: {},
//     inform: {},
//     detail: {},
//     engineer: {},
//   });

//   return <FormContext.Provider value={{ formData, setFormData }}>{children}</FormContext.Provider>;
// };

// export default FormContext;

// import React, { createContext, useState } from 'react';

// const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [formData, setFormData] = useState({
//     year: '',
//     pid: '',
//     name: '',
//     top: '',
//     description: '',
//     sales: '',
//     customer: '',
//     contract_no: '',
//     contract_date: '',
//     amount_tax: '',
//     amount_exc_tax: '',
//     am: '',
//     pic: '',
//     pm: '',
//     status: '',
//     priority: '',
//     remarks: '',
//     start_date: '',
//     end_date: '',
//     sow: '',
//     oos: '',
//     detail: '',
//     type: '',
//     market_segment: '',
//     tech_use: '',
//     resiko: '',
//     beban_proyek: '',
//     engineers: {
//         engineer: '',
//         presentase_beban_kerja: '',
//         status: '',
//     }
//   });

//   return (
//     <FormContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// export default FormContext;






// FormContext.jsx
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

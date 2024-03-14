import React from 'react';
import ExcelFile from 'react-data-export/lib/ExcelFile';
import ExcelSheet from 'react-data-export/lib/ExcelSheet';
import ExcelColumn from 'react-data-export/lib/ExcelColumn';


const ExcelExportButton = ({ data }) => {
  return (
    <ExcelFile filename="Projects" element={<button>Export to Excel</button>}>
      <ExcelSheet data={data} name="Projects">
        <ExcelColumn label="ID" value="id" />
        <ExcelColumn label="Contract No" value="contract_no" />
        <ExcelColumn label="Contract Date" value="contract_date" />
        <ExcelColumn label="AM" value="am" />
        <ExcelColumn label="PIC" value="pic" />
        <ExcelColumn label="PM" value="pm" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExcelExportButton;

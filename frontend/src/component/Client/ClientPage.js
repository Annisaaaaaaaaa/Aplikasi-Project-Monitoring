import React from 'react';
import ExcelFile from 'react-data-export/lib/ExcelFile';
import ExcelSheet from 'react-data-export/lib/ExcelSheet';
import ExcelColumn from 'react-data-export/lib/ExcelColumn';


const ExcelExportButton = ({ data }) => {
  return (
    <ExcelFile filename="Clients" element={<button>Export to Excel</button>}>
      <ExcelSheet data={data} name="Clients">
        <ExcelColumn label="ID" value="id" />
        <ExcelColumn label="Company" value="company" />
        <ExcelColumn label="Name" value="name" />
        <ExcelColumn label="PIC Title" value="pic_title" />
        <ExcelColumn label="Status" value="status" />
        <ExcelColumn label="Logo" value="logo" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExcelExportButton;

import React from 'react';
import ExcelFile from 'react-data-export/lib/ExcelFile';
import ExcelSheet from 'react-data-export/lib/ExcelSheet';
import ExcelColumn from 'react-data-export/lib/ExcelColumn';


const ExcelExportButton = ({ data }) => {
  return (
    <ExcelFile filename="Documents" element={<button>Export to Excel</button>}>
      <ExcelSheet data={data} name="Documents">
        <ExcelColumn label="ID" value="id" />
        <ExcelColumn label="Title" value="name" />
        <ExcelColumn label="Project" value="project" />
        <ExcelColumn label="Uploader" value="uploader" />
        <ExcelColumn label="Category" value="category" />
        <ExcelColumn label="Upload Date" value="upload_date" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExcelExportButton;

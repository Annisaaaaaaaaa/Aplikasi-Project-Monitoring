import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarproject from '../../assets/img/gambarproject.png';
import { Link } from 'react-router-dom';
import '../../Css/project-admin.css';
import { useProjectContext } from './../../context/ProjectContext';

import { ProjectProvider } from './../../context/ProjectContext';
import ProjectTable from './../../component/Project/ProjectTable';

function Project_admin() {
    const [searchValue, setSearchValue] = useState('');
    const [tableRows, setTableRows] = useState([]);
    const [tableHeadings, setTableHeadings] = useState([]);
    const [sortOrder, setSortOrder] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const { fetchData, exportToExcel, exportToCsv, exportToJson, exportToPdf, importFromExcel, importFromJson, importFromCsv, importFromPdf  } = useProjectContext(); 

    useEffect(() => {
        const rows = document.querySelectorAll('tbody tr');
        const headings = document.querySelectorAll('thead th');

        const initializeSortOrder = {};
        headings.forEach((_, index) => {
            initializeSortOrder[index] = true; // Default to ascending order
        });

        setTableRows(Array.from(rows)); // Convert NodeList to array
        setTableHeadings(Array.from(headings)); // Convert NodeList to array
        setSortOrder(initializeSortOrder);

        return () => {
            // Clean up function
        };
    }, []);

    const searchTable = () => {
        tableRows.forEach((row, i) => {
            const rowData = {
                industry: row.querySelectorAll('td')[1].textContent.toLowerCase(),
                name: row.querySelectorAll('td')[2].textContent.toLowerCase(),
            };
    
            const searchData = searchValue.toLowerCase();
    
            const industryMatch = rowData.industry.indexOf(searchData) >= 0;
            const nameMatch = rowData.name.indexOf(searchData) >= 0;
    
            row.classList.toggle('hide', !(industryMatch || nameMatch));
            row.style.setProperty('--delay', i / 25 + 's');
        });
    
        document.querySelectorAll('tbody tr:not(.hide)').forEach((visibleRow, i) => {
            visibleRow.style.backgroundColor = i % 2 === 0 ? 'transparent' : '#0000000b';
        });
    };
    

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        searchTable(); // Call searchTable whenever searchValue changes
    };


    const handleSort = (index) => {
        const newSortOrder = { ...sortOrder };
        newSortOrder[index] = !newSortOrder[index];

        // Sort the table rows based on the clicked column
        const sortedRows = [...tableRows].sort((a, b) => {
            let firstRowData = a.querySelectorAll('td')[index].textContent.toLowerCase(),
                secondRowData = b.querySelectorAll('td')[index].textContent.toLowerCase();

            return newSortOrder[index] ? (firstRowData > secondRowData ? 1 : -1) : (firstRowData < secondRowData ? 1 : -1);
        });

        setSortOrder(newSortOrder);
        setTableRows(sortedRows);
    };

    const handleExportExcel = async () => {
        try {
            await exportToExcel();
        } catch (error) {
            console.error('Error handling export to Excel:', error.message);
        }
    };

    const handleExportCsv = async () => {
        try {
            await exportToCsv();
        } catch (error) {
            console.error('Error handling export to Csv:', error.message);
        }
    };

    const handleExportPdf = async () => {
        try {
            await exportToPdf();
        } catch (error) {
            console.error('Error handling export to Pdf:', error.message);
        }
    };

    const handleExportJson = async () => {
        try {
            await exportToJson();
        } catch (error) {
            console.error('Error handling export to Json:', error.message);
        }
    };

    const handleImport = async (importFunction) => {
        if (!selectedFile) {
            alert('Please select a file to import.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

              // Panggil fungsi import yang sesuai dengan parameter importFunction
            let response;
            switch (importFunction) {
                case 'excel':
                    response = await importFromExcel(formData);
                    break;
                case 'csv':
                    response = await importFromCsv(formData);
                    break;
                case 'json':
                    response = await importFromJson(formData);
                    break;
                case 'pdf':
                    response = await importFromPdf(formData);
                    break;
                default:
                    throw new Error('Unsupported import function');
            }
             // Handle response dari backend jika diperlukan
            console.log('Import successful:', response); // Contoh: Tampilkan respons dari backend

            // Tambahkan logika tambahan di sini jika diperlukan
        } catch (error) {
            console.error('Error importing file:', error.message);
        }
    };
    
    const handleImportExcel = async () => {
        try {
            await importFromExcel();
        } catch (error) {
            console.error('Error handling export to Excel:', error.message);
        }
    };

    const handleImportCsv = async () => {
        try {
            await importFromCsv();
        } catch (error) {
            console.error('Error handling export to Csv:', error.message);
        }
    };

    const handleImportPdf = async () => {
        try {
            await importFromPdf();
        } catch (error) {
            console.error('Error handling export to Csv:', error.message);
        }
    };

    const handleImportJson = async () => {
        try {
            await importFromJson();
        } catch (error) {
            console.error('Error handling export to Csv:', error.message);
        }
    };

    return (
        <ProjectProvider>
        <div>
            <Sidebar />
            <Navbar />

            <div className="container-client">
                <div className="navbar-admin">
                    <div className="parent">
                        <div className="ds-utama-projek"></div>
                        <div className="gambarprojek">
                            <img src={gambarproject} alt="logo" />
                        </div>
                        <div className="duatiga-admin"> 0 </div>
                        <div className="total-admin">Project <br/>Finished </div>
                        <div className="garis-admin"></div>

                        <div className="duatiga-admin2"> 0 </div>
                        <div className="total-admin2">Project <br/>On Going </div>
                        <div className="garis-admin2"></div>

                        <div className="duatiga-admin3"> 0 </div>
                        <div className="total-admin3">Project <br/>Finished </div>
                        <div className="garis-admin3"></div>
                    </div>

                    <div className="bungkus">
                        <div className="group-button">
                            <button className="button-client">
                                <i className="fas fa-plus"></i> Tambah
                            </button>
                            <div className="export__file">
                            <label htmlFor="export-file" className="export__file-btn" title="Export File" style={{ textAlign: 'center', marginTop: '49px', marginLeft: '10px'}}>Export</label>

                                <input type="checkbox" id="export-file" />
                                <div className="export__file-options">
                                    <label>
                                        Export As &nbsp; &#10140;
                                    </label>
                                    <label htmlFor="export-file" id="toPDF" onClick={handleExportPdf}>
                                        PDF 
                                    </label>
                                    <label htmlFor="export-file" id="toJSON" onClick={handleExportJson}>
                                        JSON 
                                    </label>
                                    <label htmlFor="export-file" id="toCSV" onClick={handleExportCsv}>
                                        CSV 
                                    </label>
                                    <label htmlFor="export-file" id="toEXCEL" onClick={handleExportExcel}>
                                        EXCEL 
                                    </label>
                                </div>
                            </div>

                            <div className="export__file">
                                <label htmlFor="import-file" className="export__file-btn" title="Import File" style={{ textAlign: 'center', marginTop: '49px', marginLeft: '10px'}}>Import</label>
                                <input type="checkbox" id="import-file" />
                                <div className="export__file-options">
                                    <label>
                                        Import As &nbsp; &#10140;
                                    </label>
                                    <label htmlFor="import-file" id="fromExcel" onClick={() => handleImport('excel')}>
                                        Excel 
                                    </label>
                                    <label htmlFor="import-file" id="fromCsv" onClick={() => handleImport('csv')}>
                                        CSV 
                                    </label>
                                    <label htmlFor="import-file" id="fromJson" onClick={() => handleImport('json')}>
                                        JSON 
                                    </label>
                                    <label htmlFor="import-file" id="fromPdf" onClick={() => handleImport('pdf')}>
                                        PDF 
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="input-group">
                            <input
                                type="search"
                                placeholder="Cari Berdasarkan Nama atau ID..."
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    <main className="table-project" id="customers_table">
                        <section className="table__header">
                            <h1>Data Project</h1>
                        </section>
                        <section className="table__body">
                                <ProjectTable />
                        </section>
                    </main>
                    <div className="pagination">
                        <ul>
                            <li>
                                <span>
                                    <i className="fas fa-angel-left"></i>Prev
                                </span>
                            </li>
                            <li className="numb">
                                <span>1</span>
                            </li>
                            <li className="numb">
                                <span>2</span>
                            </li>
                            <li className="dots">
                                <span>...</span>
                            </li>
                            <li className="numb">
                                <span>4</span>
                            </li>
                            <li className="numb">
                                <span>5</span>
                            </li>
                            <li className="dots">
                                <span>...</span>
                            </li>
                            <li className="numb">
                                <span>7</span>
                            </li>
                            <li>
                                <span>
                                    Next <i className="fas fa-angel-right"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </ProjectProvider>
    );
}

export default Project_admin;

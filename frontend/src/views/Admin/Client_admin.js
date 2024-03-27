import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarorg from '../../assets/img/gambarorg.png';
import { Link } from 'react-router-dom';
import './../../Css/Dashboard.css';
import { useClientContext } from './../../context/ClientContext';

import { ClientProvider } from './../../context/ClientContext';
import ClientTable from './../../component/Client/ClientTable';

function Client_admin() {
    const { clients, fetchData, exportToExcel, exportToCsv, exportToJson, exportToPdf, importClients  } = useClientContext(); 
    const [searchValue, setSearchValue] = useState('');
    const [tableRows, setTableRows] = useState([]);
    const [tableHeadings, setTableHeadings] = useState([]);
    const [sortOrder, setSortOrder] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const totalItems = clients.length;

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
            let tableData = row.textContent.toLowerCase(),
                searchData = searchValue.toLowerCase();

            row.classList.toggle('hide', tableData.indexOf(searchData) < 0);
            row.style.setProperty('--delay', i / 25 + 's');
        });

        document.querySelectorAll('tbody tr:not(.hide)').forEach((visibleRow, i) => {
            visibleRow.style.backgroundColor = i % 2 === 0 ? 'transparent' : '#0000000b';
        });
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
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
            console.error('Error handling export to Csv:', error.message);
        }
    };

    const handleExportJson = async () => {
        try {
            await exportToJson();
        } catch (error) {
            console.error('Error handling export to Csv:', error.message);
        }
    };

    const handleImport = async () => {
        const fileInput = document.getElementById('import-file');
        const file = fileInput.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                await importClients(formData);
                // Refresh the data after import
                fetchData();
            } catch (error) {
                console.error('Error handling import:', error.message);
            }
        }
    };

    return (
        <ClientProvider>
        <div>
            <Sidebar />
            <Navbar />

            <div className="container-client">
                <div className="navbar-admin">
                    <div className="parent">
                        <div className="ds-utama"></div>
                        <div className="gambarorg">
                            <img src={gambarorg} alt="logo" />
                        </div>
                        <div className="duatiga"> 0 </div>
                        <div className="total">Total Client</div>
                        <div className="garis"></div>
                    </div>

                    <div className="bungkus">
                        <div className="group-button">
                        <Link to="/form_tambah_client" className="button-client" style={{ textAlign: 'center', marginTop: '49px', marginBottom: '10px', marginLeft: '10px', textDecoration: 'none' }}>
                       Tambah
                        </Link>

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
                           
                            {/* <div className="group-button">
                                <button className="button-client" onClick={handleImportExcel}>
                                    <i className="fas fa-file-excel"></i> Import from Excel
                                </button>
                                <button className="button-client" onClick={handleImportCsv}>
                                    <i className="fas fa-file-csv"></i> Import from CSV
                                </button>
                                <button className="button-client" onClick={handleImportJson}>
                                    <i className="fas fa-file"></i> Import from JSON
                                </button>
                                <button className="button-client" onClick={handleImportPdf}>
                                    <i className="fas fa-file-pdf"></i> Import from PDF
                                </button>
                            </div> */}

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
                        <div className="input-group" style={{ marginTop: '34px'}}>
                            <input
                                type="search"
                                placeholder="Cari Berdasarkan Nama atau ID..."
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    <main className="table" id="customers_table">
                        <section className="table__header">
                            <h1>Data Client</h1>
                        </section>
                        <section className="table__body">
                                <ClientTable currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
                        </section>
                    </main>
                    <div className="pagination">
                        <ul>
                            <li>
                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                <i className="fas fa-angel-left"></i>Prev
                            </button>
                            </li>
                            {[...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map((number) => (
                            <li key={number + 1} className="numb">
                                <button onClick={() => setCurrentPage(number + 1)}>{number + 1}</button>
                            </li>
                            ))}
                            <li>
                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}>
                                Next <i className="fas fa-angel-right"></i>
                            </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </ClientProvider>
    );
}

export default Client_admin;
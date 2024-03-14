import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarinvoice from '../../assets/img/gambarinvoice.png';
import { Link } from 'react-router-dom';
import '../../Css/Dashboard.css';
import { useInvoiceContext } from './../../context/InvoiceContext';

import { InvoiceProvider } from './../../context/InvoiceContext';
import InvoiceTable from './../../component/Invoice/InvoiceTable';

function Invoice_admin() {
    const [searchValue, setSearchValue] = useState('');
    const [tableRows, setTableRows] = useState([]);
    const [tableHeadings, setTableHeadings] = useState([]);
    const [sortOrder, setSortOrder] = useState({});
    const { fetchData, exportToExcel, exportToCsv, exportToJson, exportToPdf, importInvoices } = useInvoiceContext(); 

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
                await importInvoices(formData);
                // Refresh the data after import
                fetchData();
            } catch (error) {
                console.error('Error handling import:', error.message);
            }
        }
    };


    return (
        <div>
            <InvoiceProvider>
            <Sidebar />
            <Navbar />

            <div className="container-client">
                <div className="navbar-admin">
                    <div className="parent">
                        <div className="ds-utama"></div>
                        <div className="gambarinvoice">
                            <img src={gambarinvoice} alt="logo" />
                        </div>
                        {/* <div className="duatiga"> 0 </div>
                        <div className="total">Total Client</div>
                        <div className="garis"></div> */}
                    </div>

                    <div className="bungkus">
                        <div className="group-button">
                        <Link to="/form_tambah_invoice" className="button-client" style={{ textAlign: 'center', marginTop: '49px', marginBottom: '10px', marginLeft: '10px', textDecoration: 'none' }}>
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
                            <button className="button-client-doc" style={{ textAlign: 'center', marginTop: '49px', marginBottom: '10px', marginLeft: '10px'}}>
                                <i className="fas fa-upload"></i> Import
                            </button>

                            <div className="import__file">
                        <label htmlFor="import-file" className="import__file-btn" title="Import File" style={{ textAlign: 'center', marginTop: '49px', marginLeft: '10px'}}>Import</label>
                        <input type="file" id="import-file" onChange={handleImport} style={{ display: 'none' }} />
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

                    <main className="table" id="customers_table">
                        <section className="table__header">
                            <h1>Data Invoice</h1>
                            
                        </section>
                        <section className="table__body">
                            
                                    <InvoiceTable/>
                            
                            
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
            </InvoiceProvider>
        </div>
    );
}

export default Invoice_admin;

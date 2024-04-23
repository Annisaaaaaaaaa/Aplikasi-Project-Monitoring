import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarpayment from '../../assets/img/gambarpayment.png';
import { Link } from 'react-router-dom';
import '../../Css/Dashboard.css';
import { PaymentProvider } from '../../context/PaymentContext';
import PaymentTable from '../../component/Payment/PaymentTable';

import { usePaymentContext } from '../../context/PaymentContext';

function Payment_admin() {
    const [searchValue, setSearchValue] = useState('');
    const [tableRows, setTableRows] = useState([]);
    const [tableHeadings, setTableHeadings] = useState([]);
    const [sortOrder, setSortOrder] = useState({});
    const { fetchData, exportToExcel, exportToCsv, exportToJson, exportToPdf, importInvoices } = usePaymentContext(); 


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

    return (
        <div>
            <PaymentProvider>
            <Sidebar />
            <Navbar />

            <div className="container-client">
                <div className="navbar-admin">
                    <div className="parent">
                        <div className="ds-utama"></div>
                        <div className="gambarpayment">
                            <img src={gambarpayment} alt="logo" />
                        </div>
                        <div className="duatiga"> 0 </div>
                        <div className="total">Total Client</div>
                        <div className="garis"></div>
                    </div>

                    <div className="bungkus">
                        <div className="group-button">
                        <Link to="/form_tambah_payment" className="button-client" style={{ textAlign: 'center', marginTop: '49px', marginBottom: '10px', marginLeft: '10px', textDecoration: 'none' }}>
                            <i className="fas fa-plus"></i> Tambah
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
                            <button className="button-client" style={{ textAlign: 'center', marginTop: '49px', marginBottom: '10px', marginLeft: '10px'}}>
                                <i className="fas fa-upload"></i> Import
                            </button>
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
                            <h1>Data Payment</h1>
                        </section>
                        <section className="table__body">
                           <PaymentTable/>
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
            </PaymentProvider>
        </div>
    );
}

export default Payment_admin;

import React, { useEffect, useState} from 'react';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambarinvoice from '../../assets/img/gambarinvoice.png';
import { Link } from 'react-router-dom';
import '../../Css/Dashboard.css';
import { useInvoiceContext } from './../../context/InvoiceContext';
import Export_Invoice from './../../component/Invoice/Export_Invoice';
import { InvoiceProvider } from './../../context/InvoiceContext';
import InvoiceTable from './../../component/Invoice/InvoiceTable';
import AuthContext from '../../context/AuthContext';

function Invoice_admin() {
    const [searchValue, setSearchValue] = useState('');
    const [tableRows, setTableRows] = useState([]);
    const [tableHeadings, setTableHeadings] = useState([]);
    const [sortOrder, setSortOrder] = useState({});
    const { invoices, fetchData, exportToExcel, exportToCsv, exportToJson, exportToPdf, importInvoices } = useInvoiceContext(); 

    // const { authTokens } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = invoices.length;

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

                        <Export_Invoice/>
                            <button className="button-client-doc" style={{ textAlign: 'center', marginTop: '49px', marginBottom: '10px', marginLeft: '10px'}}>
                                <i className="fas fa-upload"></i> Import
                            </button>

                            {/* <div className="import__file">
                        <label htmlFor="import-file" className="import__file-btn" title="Import File" style={{ textAlign: 'center', marginTop: '49px', marginLeft: '10px'}}>Import</label>
                        <input type="file" id="import-file" onChange={handleImport} style={{ display: 'none' }} />
                    </div> */}
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
                            
                                    <InvoiceTable currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
                            
                            
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
            </InvoiceProvider>
        </div>
    );
}

export default Invoice_admin;

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambardoc from '../../assets/img/gambardoc.png';
import '../../Css/document-admin.css';
import { useDocumentContext } from './../../context/DocumentContext';
import { DocumentProvider } from './../../context/DocumentContext';
import DocumentTable from './../../component/Document/DocumentTable';
import Swal from 'sweetalert2';
import AuthContext from '../../context/AuthContext';
import Export_Doc from '../../component/Document/Export_Doc';

function Document_admin() {
    const [searchValue, setSearchValue, handleSearch] = useState('');
    const [tableRows, setTableRows] = useState([]);
    const [tableHeadings, setTableHeadings] = useState([]);
    const [sortOrder, setSortOrder] = useState({});
    const { documents, fetchData, exportToExcel, exportToCsv, exportToJson, exportToPdf } = useDocumentContext(); 
    const [totalDocuments, setTotalDocuments] = useState(); 

    const { authTokens } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = documents.length;


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
                title: row.querySelectorAll('td')[1].textContent.toLowerCase(),
                category: row.querySelectorAll('td')[4].textContent.toLowerCase(),
            };
    
            const searchData = searchValue.toLowerCase();
    
            const titleMatch = rowData.title.indexOf(searchData) >= 0;
            const categoryMatch = rowData.category.indexOf(searchData) >= 0;
    
            row.classList.toggle('hide', !(titleMatch || categoryMatch));
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

    useEffect(() => {
        const fetchDocumentCount = async () => {
            try {
                const token = authTokens ? authTokens.access : null;
                if (!token) {
                    throw new Error('Authentication token is missing');
                }

                const response = await axios.get('http://127.0.0.1:8000/api/v1/document/count/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setTotalDocuments(response.data.count);
            } catch (error) {
                console.error('Error fetching document count:', error.message);
            }
        };

        fetchDocumentCount();
    }, []);

    return (
        <DocumentProvider>
        <div>
            <Sidebar />
            <Navbar />

            <div className="container-client">
                <div className="navbar-admin">
                    <div className="parent">
                        <div className="ds-utama-doc"></div>
                        <div className="gambardoc">
                            <img src={gambardoc} alt="logo" />
                        </div>
                        <div className="duatiga"> {totalDocuments} </div> {/* Tampilkan jumlah dokumen */}
                        <div className="total">Total <br></br>Documents</div>
                        <div className="garis"></div>
                    </div>

                    <div className="bungkus">
                        <div className="group-button">
                        <Link to="/form_tambah_document" className="button-client" style={{ textDecoration: 'none' }}>
                            <i className="fas fa-plus"></i> Tambah
                        </Link>
                            <button className="button-client">
                                <i className="fas fa-download"></i> Export
                            </button>
                            
                            <Export_Doc/>
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

                    <main className="table-doc" id="customers_table">
                        <section className="table__header">
                            <h1>Data Document</h1>
                            
                        </section>
                        <section className="table__body">
                                        <DocumentTable currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} />
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
        </DocumentProvider>
    );
}

export default Document_admin;

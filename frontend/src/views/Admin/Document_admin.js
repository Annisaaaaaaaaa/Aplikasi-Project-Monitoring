import React, { useEffect, useState } from 'react';
import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';
import gambardoc from '../../assets/img/gambardoc.png';
import '../../Css/document-admin.css';
import Chart from "react-apexcharts";

function Document_admin() {
    const [searchValue, setSearchValue] = useState('');
    const [tableRows, setTableRows] = useState([]);
    const [tableHeadings, setTableHeadings] = useState([]);
    const [sortOrder, setSortOrder] = useState({});
    const [pieChartData, setPieChartData] = useState({ labels: [], series: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Ganti dengan jumlah item yang ingin ditampilkan per halaman

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

        // Piechart data initialization
        const Document = ['frontend', 'backend', 'ui/ux', 'hi'];
        const project = [80, 75, 95, 90];
        setPieChartData({ labels: Document, series: project });

    }, []);

    // Filter data yang akan ditampilkan berdasarkan halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableRows.slice(indexOfFirstItem, indexOfLastItem);

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

    // Fungsi untuk memindahkan ke halaman berikutnya dan sebelumnya
    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
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
                        <div className="duatiga"> 0 </div>
                        <div className="total">Total Client</div>
                        <div className="garis"></div>
                    </div>

                    <div className="container-fluid mb-1 pie-chart-container">
                        <Chart
                            type="pie"
                            width={350}
                            height={200}
                            series={pieChartData.series}
                            options={{
                                noData: { text: "Empty Data" },
                                colors: ["#BDC7F6", "#B8A0F2", "#9294F8"],
                                labels: pieChartData.labels
                            }}
                        />
                    </div>

                    <div className="bungkus">
                        <div className="group-button">
                            <button className="button-client">
                                <i className="fas fa-plus"></i> Tambah
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

                    <main className="table-doc" id="customers_table">
                        <section className="table__header">
                            <h1>Data Document</h1>
                            <div className="export__file">
                                <label htmlFor="export-file" className="export__file-btn" title="Export File"></label>
                                <input type="checkbox" id="export-file" />
                                <div className="export__file-options">
                                    <label>
                                        Export As &nbsp; &#10140;
                                    </label>
                                    <label htmlFor="export-file" id="toPDF">
                                        PDF <img src="images/pdf.png" alt="pdf" />
                                    </label>
                                    <label htmlFor="export-file" id="toJSON">
                                        JSON <img src="images/json.png" alt="json" />
                                    </label>
                                    <label htmlFor="export-file" id="toCSV">
                                        CSV <img src="images/csv.png" alt="csv" />
                                    </label>
                                    <label htmlFor="export-file" id="toEXCEL">
                                        EXCEL <img src="images/excel.png" alt="excel" />
                                    </label>
                                </div>
                            </div>
                        </section>
                        <section className="table__body">
                            <table>
                                <thead>
                                    <tr>
                                        <th onClick={() => handleSort(0)}>
                                            Id <span className="icon-arrow"></span>
                                        </th>
                                        <th onClick={() => handleSort(1)}>
                                            Company <span className="icon-arrow"></span>
                                        </th>
                                        <th onClick={() => handleSort(2)}>
                                            Nama <span className="icon-arrow"></span>
                                        </th>
                                        <th onClick={() => handleSort(3)}>
                                            PIC Tittle <span className="icon-arrow"></span>
                                        </th>
                                        <th onClick={() => handleSort(4)}>
                                            Status <span className="icon-arrow"></span>
                                        </th>
                                        <th onClick={() => handleSort(5)}>
                                            Total Project <span className="icon-arrow"></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((row, index) => (
                                        <tr key={index}>
                                            {[...row.cells].map((cell, i) => (
                                                <td key={i}>{cell.textContent}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    </main>

                    <div className="pagination">
                        <ul>
                            <li>
                                <span onClick={prevPage}>
                                    <i className="fas fa-angel-left"></i>Prev
                                </span>
                            </li>
                            {[...Array(Math.ceil(tableRows.length / itemsPerPage)).keys()].map((number, index) => (
                                <li key={index} className="numb">
                                    <span onClick={() => setCurrentPage(number + 1)}>{number + 1}</span>
                                </li>
                            ))}
                            <li>
                                <span onClick={nextPage}>
                                    Next <i className="fas fa-angel-right"></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Document_admin;
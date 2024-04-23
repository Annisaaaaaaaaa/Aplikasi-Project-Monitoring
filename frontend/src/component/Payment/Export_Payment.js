import React, { useEffect, useState, useContext } from 'react';
import '../../Css/document-admin.css';
import Swal from 'sweetalert2';
import AuthContext from '../../context/AuthContext';
import { InvoiceProvider } from './../../context/InvoiceContext';

function Export_Payment() {
    const [exportOption, setExportOption] = useState('all');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [exportOptionJSON, setExportOptionJSON] = useState('allJSON');
    const [monthJSON, setMonthJSON] = useState('');
    const [yearJSON, setYearJSON] = useState('');
    const [exportOptionExcel, setExportOptionExcel] = useState('allExcel');
    const [monthExcel, setMonthExcel] = useState('');
    const [yearExcel, setYearExcel] = useState('');
    const [exportOptionCsv, setExportOptionCsv] = useState('allCsv');
    const [monthCsv, setMonthCsv] = useState('');
    const [yearCsv, setYearCsv] = useState('');
    const { authTokens } = useContext(AuthContext);

    const handleExportpdf = async () => {
        try {
            const token = authTokens ? authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }
    
            // Ambil nilai dari dropdown bulan dan tahun berdasarkan pilihan pengguna
            let selectedMonth = '';
            let selectedYear = '';
            if (exportOption === 'month' || exportOption === 'monthYear') {
                selectedMonth = month;
            }
            if (exportOption === 'year' || exportOption === 'monthYear') {
                selectedYear = year;
            }
    
            // Buat URL dengan parameter bulan dan tahun berdasarkan pilihan pengguna
            let url = 'http://localhost:8000/api/v1/payment/export-payments-to-pdf/';
            if (selectedMonth) {
                url += `?month=${selectedMonth}`;
            }
            if (selectedYear) {
                url += selectedMonth ? `&year=${selectedYear}` : `?year=${selectedYear}`;
            }
    
            // Lakukan permintaan ke backend untuk eksport PDF
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
    
            if (response.status === 200) {
                // Jika terdapat data yang sesuai, redirect ke file PDF yang dihasilkan
                window.location.href = response.url;
            } else if (response.status === 404) {
                // Jika tidak ada data yang sesuai, tampilkan peringatan SweetAlert
                Swal.fire({
                    title: 'No Data Found',
                    text: 'There is no data available for the selected month and year.',
                    icon: 'warning',
                    confirmButtonText: 'Close'
                });
            } else {
                // Tampilkan pesan kesalahan jika permintaan tidak berhasil
                console.error('Error exporting to PDF:', response.statusText);
            }
    
        } catch (error) {
            console.error('Error exporting to PDF:', error.message);
        }
    };

    const handleExportjson = async () => {
        try {
            const token = authTokens ? authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }
    
            // Ambil nilai dari dropdown bulan dan tahun berdasarkan pilihan pengguna
            let selectedMonthJSON = '';
            let selectedYearJSON = '';
            if (exportOptionJSON === 'monthJSON' || exportOptionJSON === 'monthYearJSON') {
                selectedMonthJSON = monthJSON;
            }
            if (exportOptionJSON === 'yearJSON' || exportOptionJSON === 'monthYearJSON') {
                selectedYearJSON = yearJSON;
            }
    
            // Buat URL dengan parameter bulan dan tahun berdasarkan pilihan pengguna
            let url = 'http://localhost:8000/api/v1/payment/export-payments-to-json/';
            if (selectedMonthJSON) {
                url += `?month=${selectedMonthJSON}`;
            }
            if (selectedYearJSON) {
                url += selectedMonthJSON ? `&year=${selectedYearJSON}` : `?year=${selectedYearJSON}`;
            }
    
            // Lakukan permintaan ke backend untuk eksport PDF
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
    
            if (response.status === 200) {
                // Jika terdapat data yang sesuai, redirect ke file PDF yang dihasilkan
                window.location.href = response.url;
            } else if (response.status === 404) {
                // Jika tidak ada data yang sesuai, tampilkan peringatan SweetAlert
                Swal.fire({
                    title: 'No Data Found',
                    text: 'There is no data available for the selected month and year.',
                    icon: 'warning',
                    confirmButtonText: 'Close'
                });
            } else {
                // Tampilkan pesan kesalahan jika permintaan tidak berhasil
                console.error('Error exporting to JSON:', response.statusText);
            }
    
        } catch (error) {
            console.error('Error exporting to JSON:', error.message);
        }
    };

    const handleExportcsv = async () => {
        try {
            const token = authTokens ? authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }
    
            // Ambil nilai dari dropdown bulan dan tahun berdasarkan pilihan pengguna
            let selectedMonthCsv = '';
            let selectedYearCsv = '';
            if (exportOptionCsv === 'monthCsv' || exportOptionCsv === 'monthYearCsv') {
                selectedMonthCsv = monthCsv;
            }
            if (exportOptionCsv === 'yearJSON' || exportOptionCsv === 'monthYearCsv') {
                selectedYearCsv = yearCsv;
            }
    
            // Buat URL dengan parameter bulan dan tahun berdasarkan pilihan pengguna
            let url = 'http://localhost:8000/api/v1/payment/export-payments-to-csv/';
            if (selectedMonthCsv) {
                url += `?month=${selectedMonthCsv}`;
            }
            if (selectedYearCsv) {
                url += selectedMonthCsv ? `&year=${selectedYearCsv}` : `?year=${selectedYearCsv}`;
            }
    
            // Lakukan permintaan ke backend untuk eksport PDF
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
    
            if (response.status === 200) {
                // Jika terdapat data yang sesuai, redirect ke file PDF yang dihasilkan
                window.location.href = response.url;
            } else if (response.status === 404) {
                // Jika tidak ada data yang sesuai, tampilkan peringatan SweetAlert
                Swal.fire({
                    title: 'No Data Found',
                    text: 'There is no data available for the selected month and year.',
                    icon: 'warning',
                    confirmButtonText: 'Close'
                });
            } else {
                // Tampilkan pesan kesalahan jika permintaan tidak berhasil
                console.error('Error exporting to JSON:', response.statusText);
            }
    
        } catch (error) {
            console.error('Error exporting to JSON:', error.message);
        }
    };

    const handleExportexcel = async () => {
        try {
            const token = authTokens ? authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }
    
            // Ambil nilai dari dropdown bulan dan tahun berdasarkan pilihan pengguna
            let selectedMonthExcel = '';
            let selectedYearExcel = '';
            if (exportOptionExcel === 'monthExcel' || exportOptionExcel === 'monthYearExcel') {
                selectedMonthExcel = monthExcel;
            }
            if (exportOptionExcel === 'yearExcel' || exportOptionExcel === 'monthYearExcel') {
                selectedYearExcel = yearExcel;
            }
    
            // Buat URL dengan parameter bulan dan tahun berdasarkan pilihan pengguna
            let url = 'http://localhost:8000/api/v1/payment/export-payments-to-excel/';
            if (selectedMonthExcel) {
                url += `?month=${selectedMonthExcel}`;
            }
            if (selectedYearExcel) {
                url += selectedMonthExcel ? `&year=${selectedYearExcel}` : `?year=${selectedYearExcel}`;
            }
    
            // Lakukan permintaan ke backend untuk eksport PDF
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
    
            if (response.status === 200) {
                // Jika terdapat data yang sesuai, redirect ke file PDF yang dihasilkan
                window.location.href = response.url;
            } else if (response.status === 404) {
                // Jika tidak ada data yang sesuai, tampilkan peringatan SweetAlert
                Swal.fire({
                    title: 'No Data Found',
                    text: 'There is no data available for the selected month and year.',
                    icon: 'warning',
                    confirmButtonText: 'Close'
                });
            } else {
                // Tampilkan pesan kesalahan jika permintaan tidak berhasil
                console.error('Error exporting to JSON:', response.statusText);
            }
    
        } catch (error) {
            console.error('Error exporting to JSON:', error.message);
        }
    };

    return (
        <PaymentProvider>
            <div className="export__file">
                            <label htmlFor="export-file" className="export__file-btn" title="Export File" style={{ textAlign: 'center', marginTop: '49px', marginLeft: '10px'}}>Export</label>

                                <input type="checkbox" id="export-file" />
                                <div className="export__file-options">
                                    <label>
                                        Export As &nbsp; &#10140;
                                    </label>
                                    {/* <label htmlFor="export-file" id="toPDF" onClick={handleExportPdf}>
                                        PDF 
                                    </label>
                                    <label htmlFor="export-file" id="toJSON" onClick={handleExportJson}>
                                        JSON 
                                    </label> */}
                                    {/* <label htmlFor="export-file" id="toCSV" onClick={handleExportCsv}>
                                        CSV 
                                    </label>
                                    <label htmlFor="export-file" id="toEXCEL" onClick={handleExportExcel}>
                                        EXCEL 
                                    </label> */}
                                    <select onChange={(e) => setExportOption(e.target.value)}>
                                    <option value="all">All PDF</option>
                                    <option value="month">Month</option>
                                    <option value="year">Year</option>
                                    <option value="monthYear">Month & Year</option>
                                    </select>
                                    {(exportOption === 'month' || exportOption === 'monthYear') && (
                                    <select id="month" value={month} onChange={(e) => setMonth(e.target.value)}>
                                        <option value="">Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                    </select>
                                    )}
                                    {(exportOption === 'year' || exportOption === 'monthYear') && (
                                    <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                                        <option value="">Select Year</option>
                                        <option value="2022">2022</option>
                                        <option value="2024">2024</option>
                                        <option value="2030">2030</option>
                                    </select>
                                    )}
                                    <label htmlFor="export-file" id="pdf" onClick={handleExportpdf}>
                                        EXPORT PDF 
                                    </label>

                                    <select onChange={(e) => setExportOptionJSON(e.target.value)}>
                                    <option value="allJSON">All JSON</option>
                                    <option value="monthJSON">Month</option>
                                    <option value="yearJSON">Year</option>
                                    <option value="monthYearJSON">Month & Year</option>
                                    </select>
                                    {(exportOptionJSON === 'monthJSON' || exportOptionJSON === 'monthYearJSON') && (
                                    <select id="monthJSON" value={monthJSON} onChange={(e) => setMonthJSON(e.target.value)}>
                                        <option value="">Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                    </select>
                                    )}
                                    {(exportOptionJSON === 'yearJSON' || exportOptionJSON === 'monthYearJSON') && (
                                    <select id="yearJSON" value={yearJSON} onChange={(e) => setYearJSON(e.target.value)}>
                                        <option value="">Select Year</option>
                                        <option value="2022">2022</option>
                                        <option value="2024">2024</option>
                                        <option value="2030">2030</option>
                                    </select>
                                    )}
                                    <label htmlFor="export-file" id="pdf" onClick={handleExportjson}>
                                        EXPORT JSON 
                                    </label>

                                    <select onChange={(e) => setExportOptionExcel(e.target.value)}>
                                    <option value="allExcel">All Excel</option>
                                    <option value="monthExcel">Month</option>
                                    <option value="yearExcel">Year</option>
                                    <option value="monthYearExcel">Month & Year</option>
                                    </select>
                                    {(exportOptionExcel === 'monthExcel' || exportOptionExcel === 'monthYearExcel') && (
                                    <select id="monthExcel" value={monthExcel} onChange={(e) => setMonthExcel(e.target.value)}>
                                        <option value="">Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                    </select>
                                    )}
                                    {(exportOptionExcel === 'yearExcel' || exportOptionExcel === 'monthYearExcel') && (
                                    <select id="yearExcel" value={yearExcel} onChange={(e) => setYearExcel(e.target.value)}>
                                        <option value="">Select Year</option>
                                        <option value="2022">2022</option>
                                        <option value="2024">2024</option>
                                        <option value="2030">2030</option>
                                    </select>
                                    )}
                                    <label htmlFor="export-file" id="excel" onClick={handleExportexcel}>
                                        EXPORT EXCEL 
                                    </label>

                                    <select onChange={(e) => setExportOptionCsv(e.target.value)}>
                                    <option value="allCsv">All Csv</option>
                                    <option value="monthCsv">Month</option>
                                    <option value="yearCsv">Year</option>
                                    <option value="monthYearCsv">Month & Year</option>
                                    </select>
                                    {(exportOptionCsv === 'monthCsv' || exportOptionCsv === 'monthYearCsv') && (
                                    <select id="monthCsv" value={monthCsv} onChange={(e) => setMonthCsv(e.target.value)}>
                                        <option value="">Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                    </select>
                                    )}
                                    {(exportOptionCsv === 'yearCsv' || exportOptionCsv === 'monthYearCsv') && (
                                    <select id="yearCsv" value={yearCsv} onChange={(e) => setYearCsv(e.target.value)}>
                                        <option value="">Select Year</option>
                                        <option value="2022">2022</option>
                                        <option value="2024">2024</option>
                                        <option value="2030">2030</option>
                                    </select>
                                    )}
                                    <label htmlFor="export-file" id="csv" onClick={handleExportcsv}>
                                        EXPORT CSV 
                                    </label>

                                </div>
                            </div>
        </PaymentProvider>
    );
}

export default Export_Payment;

import React, { useState, useEffect } from 'react';
import '../../Css/add_doc.css';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios untuk mengirim permintaan ke server
import gambarpop from '../../assets/img/popular.png';

const DetailDocument = ({ document }) => {
    const [fileContent, setFileContent] = useState(null); // State untuk menyimpan konten file

    useEffect(() => {
        // Mendapatkan konten file menggunakan axios saat komponen dimuat
        const fetchFileContent = async () => {
            try {
                const response = await axios.get(`${document.document_file}`, { responseType: 'blob' });
                setFileContent(response.data);
            } catch (error) {
                console.error('Error fetching file:', error);
                // Handle error
            }
        };

        fetchFileContent(); // Panggil fungsi fetchFileContent
    }, [document.document_file]); // Menambahkan document.document_file ke dalam dependencies array untuk memastikan fetch saat nilai berubah

    // Fungsi untuk menampilkan preview file
    const renderFilePreview = () => {
        if (!fileContent) return <p>Loading...</p>;

        // Menyiapkan URL object untuk konten file
        const fileUrl = URL.createObjectURL(fileContent);

        // Tampilkan preview sesuai dengan tipe file
        switch (document.document_file.split('.').pop().toLowerCase()) {
            case 'pdf':
                return <embed src={fileUrl} type="application/pdf" width="100%" height="500px" />;
            case 'xlsx':
              return <embed src={fileUrl} type="application/xlsx" width="100%" height="500px" />;
            case 'csv':
              return <embed src={fileUrl} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" width="100%" height="500px" />;
            case 'json':
                return <iframe src={fileUrl} width="100%" height="500px" />;
            case 'png':
            case 'jpg':
            case 'jpeg':
                return <img src={fileUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '500px' }} />;
            default:
                return <p>File type not supported</p>;
        }
    };

    // Implementasi tampilan detail sesuai kebutuhan
    return (
        <div>
            {/* Tambahkan informasi detail lainnya sesuai kebutuhan */}
            <div className="form-add-user">
                <div className="tiitle-add-user">
                    <div className="add-user-kanan">
                        <div className="icon-add-client">
                            <img src={gambarpop} alt="logo" />
                        </div>
                        <div className="kiri-icon-user">
                            CREATE DOCUMENT
                        </div>
                    </div>
                </div>
                <p>Masukkan Informasi Umum. Bagian Document</p>

                <div className="miau-container">
                    <form>
                        <div className="miau5">
                            <div className="tittle-form-email">
                                Name
                            </div>
                            <div className="input-form-email">
                                <h2>{document.name}</h2>
                            </div>
                        </div>

                        <div className="miau4">
                            <div className="kiri-user">
                                <div className="tittle-form" style={{ marginBottom: '10%' }}>
                                    Project
                                </div>
                                <div className="select-container">
                                    <p>Project: {document.projectName}</p>
                                </div>
                            </div>
                            <div className="kanan-user">
                                <div className="tittle-form">
                                    Uploader
                                </div>
                                <div className="input-form">
                                    <div className="select-container">
                                        <p>Uploader: {document.uploaderName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="miau5">
                            <div className="tittle-form-email">
                                Category
                            </div>
                            <div className="input-form-email">
                                <div className="select-container">
                                    <p>Category: {document.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="miau5">
                            <div className="tittle-form-email">
                                Uploader date
                            </div>
                            <div className="input-form-email">
                                <p>Upload Date: {document.upload_date}</p>
                                <p>Description: {document.description}</p>
                                {renderFilePreview()} {/* Panggil fungsi untuk menampilkan preview file */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetailDocument;

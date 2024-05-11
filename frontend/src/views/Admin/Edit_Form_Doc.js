import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../../Css/form_edit_doc.css';
import { useDocumentContext } from './../../context/DocumentContext';
import { DocumentProvider } from './../../context/DocumentContext';

import tbhfile from '../../assets/img/tbhfile.png'
import docu from '../../assets/img/Docu.png'

import Sidebar from '../../component/sidebar';
import Navbar from '../../component/header';

function Edit_doc() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Lakukan apa pun yang perlu dilakukan dengan file di sini
            // Contoh: menyimpan file, memprosesnya, dll.
            // Misalnya:
            setSelectedFile({
                name: file.name,
                content: `File ${file.name} selected.`
            });
        } else {
            setSelectedFile(null);
        }
    };

    return (
        <div>
             <Sidebar />
            <Navbar />
        <div className="upload-doc" id="upload-doc">
            <label htmlFor="file-input">
            <img src={tbhfile} alt="logo" />
                <p id="file-text">Add file <span>or drop files here</span></p>
            </label>
            <input id="file-input" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
        {selectedFile && (
            <div id="file-preview">
                <p>File Preview:</p>
                <div id="preview-container" dangerouslySetInnerHTML={{ __html: selectedFile.content }}></div>
            </div>
        )}

        <div className="exel-form">
            <div className="tiitle-doc">
                <div className="add-doc-kanan">
                    <div className="icon-docu">
                    <img src={docu} alt="logo" /> 
                    </div>
                    <div className="kiri-title-doc">
                        DOCUMENT NAME:
                    </div>
                </div>
            </div>
            <div className="p-judul-doc">
                <p>Di Unggah pada </p>
            </div>

            <div className="miau-container">
                <div className="miau4">
                    <div className="kiri-user">
                        <div className="tittle-form">
                            <p> Pengunggah </p>
                        </div>
                        <div className="input-form">
                            <input type="text" value="" placeholder="Yahahaha" />
                        </div>
                    </div>
                    <div className="kanan-user">
                        <div className="tittle-form">
                            <p>Kategori </p>
                        </div>
                        <div className="input-form">
                            <input type="text" value="" placeholder="Yahahaha" />
                        </div>
                    </div>
                </div>

                <div className="miau5">
                    <div className="tittle-form-email-doc">
                        <p>Projek</p>
                    </div>
                    <div className="input-form-email">
                        <input type="email" value="" placeholder="Yahahhaha" />
                    </div>

                    <div className="tittle-form-email-doc">
                        <p>Deskrripsi</p>
                    </div>
                    <div className="input-form-email">
                        <textarea name="note" rows="4"></textarea>
                    </div>

                    <div className="btn-edit-doc">
                        <button>EDIT</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Edit_doc;

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import '../../Css/init.css';
import Sidebar from '../sidebar';
import Navbar from '../header';
import step from '../../assets/img/step.png';
import lingkaran from '../../assets/img/lingkaran.png';
import arrow from '../../assets/img/arrow.png';

const ProjectInitialForm = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const { authTokens } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        year: "",
        pid: "",
        name: "",
        description: "",
        customer: "",
        sales: "",
        am: null,
        pic: null,
        pm: null,
        start_date: null,
        end_date: null,
        status: "",
        priority: null,
        contract_no: "",
        contract_date: "",
        sow: null,
        oos: null,
        detail: null,
        remarks: null,
        type: null,
        market_segment: null,
        tech_use: null,
        resiko: null,
        beban_proyek: null,
        completion_percentage: null,
        amount_exc_tax: "",
        amount_tax: "",
        engineer_projects: []
    });
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = authContext.authTokens ? authContext.authTokens.access : null;
                if (!token) {
                    throw new Error('Authentication token is missing');
                }

                const usersResponse = await axios.get('http://127.0.0.1:8000/api/users/tambah', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(usersResponse.data);

                const clientsResponse = await axios.get('http://127.0.0.1:8000/api/v1/client/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClients(clientsResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [authTokens]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = authTokens ? authTokens.access : null;
            if (!token) {
                throw new Error('Authentication token is missing');
            }
            setLoading(true);

            const errors = validateFormData(formData);
            if (Object.keys(errors).length > 0) {
                setFormErrors(errors);
                return;
            }

            const response = await axios.post('http://127.0.0.1:8000/api/v1/project/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFormErrors({});
            alert('Project added successfully');
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response) {
                console.error('Server responded with status code:', error.response.status);
                console.error('Error message from server:', error.response.data.message);
            } else {
                console.error('Error message:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const validateFormData = (formData) => {
        const errors = {};
        if (!formData.name) {
            errors.name = 'Name is required';
        }
        if (!formData.year) {
            errors.year = 'Year is required';
        }
        if (!formData.pid) {
            errors.pid = 'pid is required';
        }
        if (!formData.description) {
            errors.description = 'description is required';
        }
        if (!formData.customer) {
            errors.customer = 'customer is required';
        }
        if (!formData.sales) {
            errors.sales = 'sales is required';
        }
        if (!formData.status) {
            errors.status = 'status is required';
        }
        if (!formData.contract_no) {
            errors.contract_no = 'contract_no is required';
        }
        if (!formData.contract_date) {
            errors.contract_date = 'contract_date is required';
        }
        if (!formData.amount_exc_tax) {
            errors.amount_exc_tax = 'amount_exc_tax is required';
        }
        if (!formData.amount_tax) {
            errors.amount_tax = 'amount_tax is required';
        }

        return errors;
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        // Logic for next step, if any
        history.push('/project-planning');
    };

    return (
        <div>
            <Sidebar />
            <Navbar />
            <div className="panjang">
                <img src={step} width={10} alt='step'/>
            </div>

            <div className="form-initiation-container">
                <div className="form-initiation">
                    <h2>ADD PROJECT.</h2>
                    <h1>Data dibawah dapat diisi oleh Sales.</h1>

                    <div className="back">
                        <button>
                            <img src={arrow} alt="Arrow" />
                            Back
                        </button>
                    </div>
                    <form onSubmit={handleSave}>
                        <div className="miau-container">
                            <div className="miau5-initial">
                                <div className="tittle-form-email-initial">
                                    <p>Nama Project</p>
                                </div>
                                <div className="input-form-email-initial">
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="miau4-initial">
                                <div className="kiri-user-initial">
                                    <div className="tittle-form">
                                        <p>PID </p>
                                    </div>
                                    <div className="input-form-initial">
                                        <input type="text" name="pid" value={formData.pid} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="kanan-user-initial">
                                    <div className="tittle-form-initial">
                                        <p>Tahun </p>
                                    </div>
                                    <div className="input-form-initial">
                                        <input type="number" name="year" value={formData.year} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="miau4-initial">
                                <div className="kiri-user-initial">
                                    <div className="tittle-form-initial">
                                        <p>Term Of Payment </p>
                                    </div>
                                    <div className="input-form-initial">
                                        <input type="text" name="top" value={formData.top} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="kanan-user-initial">
                                    <div className="tittle-form-initial">
                                        <p> Sales </p>
                                        <select name="sales" value={formData.sales} onChange={handleInputChange}>
                                            <option value="">Select Sales</option>
                                            {users.map(user => (
                                                <option key={user.id} value={user.id}>{user.email}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="miau8-initial">
                                <div className="tittle-form-email-initial-des">
                                    <p>Deskripsi</p>
                                </div>
                                <div className="input-form-email-initial">
                                    <textarea name="description" value={formData.description} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-initiation-kanan">
                            <div className="lingkaran">
                                <img src={lingkaran}  alt="Lingkaran" />
                            </div>
                        </div>
                        <div className="form-initiation-kanan2">
                            <div className="miau-container-initial">
                                <div className="miau5-initial">
                                    <div className="tittle-form-email-kanan-initial">
                                        <p>Customer</p>
                                    </div>
                                    <select name="customer" value={formData.customer} onChange={handleInputChange}>
                                        <option value="">Select Customer</option>
                                        {clients.map(client => (
                                            <option key={client.id} value={client.id}>{client.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="miau4-initial">
                                    <div className="kiri-miau4-initial">
                                        <div className="tittle-form-kanan-initial">
                                            <p>No. Contract </p>
                                        </div>
                                        <div className="input-form-kanan-initial">
                                            <input type="text" name="contract_no" value={formData.contract_no} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="kanan-user-initial">
                                        <div className="tittle-form-kanan-initial">
                                            <p>Contract Date </p>
                                        </div>
                                        <div className="input-form-kanan-initial">
                                            <input type="date" name="contract_date" value={formData.contract_date} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="miau8-initial">
                                    <div className="tittle-form-email-kanan-initial">
                                        <p>Amount (Exc. Tax)</p>
                                    </div>
                                    <div className="input-form-email-kanan-initial">
                                        <input type="number" name="amount_exc_tax" value={formData.amount_exc_tax} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="miau9-initial">
                                    <div className="tittle-form-email-kanan-initial">
                                        <p>Amount (Inc. Tax)</p>
                                    </div>
                                    <div className="input-form-email-kanan2-initial">
                                        <input type="number" name="amount_tax" value={formData.amount_tax} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            {formErrors.name && <span>{formErrors.name}</span>}
                            {formErrors.year && <span>{formErrors.year}</span>}
                            {formErrors.pid && <span>{formErrors.pid}</span>}
                            {formErrors.description && <span>{formErrors.description}</span>}
                            {formErrors.customer && <span>{formErrors.customer}</span>}
                            {formErrors.sales && <span>{formErrors.sales}</span>}
                            {formErrors.status && <span>{formErrors.status}</span>}
                            {formErrors.contract_no && <span>{formErrors.contract_no}</span>}
                            {formErrors.contract_date && <span>{formErrors.contract_date}</span>}
                            {formErrors.amount_exc_tax && <span>{formErrors.amount_exc_tax}</span>}
                            {formErrors.amount_tax && <span>{formErrors.amount_tax}</span>}

                            <div className="tambah-initiation">
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                                <br />
                                <button type="button" onClick={handleNextStep}>Next Step</button>
                            </div>
                        </div>
                    </form>
                    {formErrors.general && <p>{formErrors.general}</p>}
                </div>
                <div className="bg-form-atas-kanan">
                    <p>CUSTOMER INFO.</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectInitialForm;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode'
import '../Css/SideBar.css';
import Projek from '../component/Com_project';
import dashboardImg from '../images/dashboard.png';
import projectImg from '../images/projek.png';
import clientImg from '../images/client.png';
import invoiceImg from '../images/invoice.png';
import paymentImg from '../images/payment.png';
import noteImg from '../images/note.png';
import docImg from '../images/doc.png';
import logImg from '../images/log.png';


function Sidebar() {
    useEffect(() => {
        const menuClickHandler = (e) => {
            e.currentTarget.siblings().removeClass("active");
            e.currentTarget.toggleClass("active");
            e.currentTarget.find("ul").slideToggle();
            e.currentTarget.siblings().find("ul").slideUp();
            e.currentTarget.siblings().find("ul").find("li").removeClass("active");
        };

        $(".menu > ul > li").click(menuClickHandler);

        const menuBtnClickHandler = () => {
            $(".sidebar").toggleClass("active");
        };

        $(".menu-btn").click(menuBtnClickHandler);

        return () => {
            $(".menu > ul > li").off("click", menuClickHandler);
            $(".menu-btn").off("click", menuBtnClickHandler);
        };
    }, []);

    return (
        <div className="sidebar active">
            <div className="menu-btn">
                <i className="ph-bold ph-caret-left"></i>
            </div>
            <div className="head">
                <div className="user-img">
                    <img src={logoImg} alt="logo" />
                </div>
                <div className="user-details">
                    <p className="title"><span>Median</span>Skill</p>
                </div>
            </div>
            <div className="nav">
                <div className="menu">
                    <p className="title">Main</p>
                    <ul>
                        <li>
                            <Link to="/admin">
                                <img src={dashboardImg} width="30" alt="dashboard" />
                                <span className="text">Dashboard</span>
                            </Link>
                        </li>
                        <li className="active">
                            <Link to="/project">
                                <img src={projectImg} width="30" alt="project" />
                                <span className="text">Project</span>
                                <i className="arrow ph-bold ph-caret-down"></i>
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <Link to="/Projek">
                                        <span className="text">Project</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/project-activity">
                                        <span className="text">Project Activity</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/project-statistic">
                                        <span className="text">Statistic</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/client">
                                <img src={clientImg} width="30" alt="client" />
                                <span className="text">Client</span>
                                <i className="arrow ph-bold ph-caret-down"></i>
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <Link to="/client">
                                        <span className="text">Client</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/client-statistic">
                                        <span className="text">Statistic</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/invoice">
                                <img src={invoiceImg} width="30" alt="invoice" />
                                <span className="text">Invoice</span>
                                <i className="arrow ph-bold ph-caret-down"></i>
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <Link to="/invoice">
                                        <span className="text">Invoice</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/invoice-statistic">
                                        <span className="text">Statistic</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/payment">
                                <img src={paymentImg} width="30" alt="payment" />
                                <span className="text">Payment</span>
                                <i className="arrow ph-bold ph-caret-down"></i>
                            </Link>
                            <ul className="sub-menu">
                                <li>
                                    <Link to="/payment">
                                        <span className="text">Payment</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/payment-statistic">
                                        <span className="text">Statistic</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/note">
                                <img src={noteImg} width="30" alt="note" />
                                <span className="text">Note</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/document">
                                <img src={docImg} width="30" alt="document" />
                                <span className="text">Document</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="menu">
                <ul>
                    <li>
                        <Link to="/logout">
                            <img src={logImg} alt="logo" />
                            <span className="text">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
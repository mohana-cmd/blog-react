import React from "react";
import logo from '../../assets/img/logo.png';

const Footer = () => {
    return(
        <div className="footer">
    <div className="container">
        <div className="in-con">
            <div className="row mb-5">
                <div className="col-md-6">
                    <div className="footer-logo">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-20">
                    <h5>About</h5>
                    <ul>
                        <li><a className="footer-content">About Company</a></li>
                        <li><a className="footer-content">Careers</a></li>
                        <li><a className="footer-content">Contact Us</a></li>
                    </ul>
                    <h5>Quick Links</h5>
                    <ul>
                        <li><a className="footer-content">Industries</a></li>
                        <li><a className="footer-content">Cybersecurity</a></li>
                        <li><a className="footer-content">Hire Resource</a></li>
                        <li><a className="footer-content">Blog</a></li>
                        <li><a className="footer-content">Careers</a></li>
                        <li><a className="footer-content">Contact Us</a></li>
                        <li><a className="footer-content">Cookies Policy</a></li>
                    </ul>
                </div>
                <div className="col-20">
                    <h5>Product</h5>
                    <ul>
                        <li><a className="footer-content">Amber Connect</a></li>
                        <li><a className="footer-content">Amber Pay</a></li>
                        <li><a className="footer-content">Road Toll Management</a></li>
                        <li><a className="footer-content">Dispatch Management</a></li>
                    </ul>
                    <h5>Solutions</h5>
                    <ul>
                        <li><a className="footer-content">Software Development Solutions</a></li>
                        <li><a className="footer-content">Enterprise Solutions</a></li>
                        <li><a className="footer-content">Cloud Solutions</a></li>
                    </ul>
                </div>
                <div className="col-20">
                    <h5>What we do?</h5>
                    <ul>
                        <li><a className="footer-content">Mobile Applications </a></li>
                        <li><a className="footer-content">Cloud Computing </a></li>
                        <li><a className="footer-content">Analytics & Big Data </a></li>
                        <li><a className="footer-content">DevOps</a></li>
                        <li><a className="footer-content">SAP</a></li>
                        <li><a className="footer-content">Internet Marketing</a></li>
                        <li><a className="footer-content">Web Applications </a></li>
                        <li><a className="footer-content">Digital Marketing </a></li>
                        <li><a className="footer-content">AI & ML </a></li>
                        <li><a className="footer-content">Internet of Things </a></li>
                        <li><a className="footer-content">QA & Testing </a></li>
                        <li><a className="footer-content">UI / UX Design</a></li>
                    </ul>
                </div>
                <div className="col-20">
                    <h5>Our Businesses</h5>
                    <ul>
                        <li><a className="footer-content">Amber Connect </a></li>
                        <li><a className="footer-content">Amber Fuels </a></li>
                        <li><a className="footer-content">Amber Pay </a></li>
                        <li><a className="footer-content">Amber Rewards </a></li>
                        <li><a className="footer-content">Amber Aviation </a></li>
                        <li><a className="footer-content">Amber Academy </a></li>
                        <li><a className="footer-content">Amber CyberEye </a></li>
                        <li><a className="footer-content">Amber IOT </a></li>
                        <li><a className="footer-content">Amber FundMe</a></li>
                    </ul>
                </div>
                <div className="col-20">
                    <h5>Industries</h5>
                    <ul>
                        <li><a className="footer-content">Banking & Finance </a></li>
                        <li><a className="footer-content">E-commerce & Retail </a></li>
                        <li><a className="footer-content">Manufacturing </a></li>
                        <li><a className="footer-content">Health Care </a></li>
                        <li><a className="footer-content">IT & Consulting </a></li>
                        <li><a className="footer-content">Education & E-Learning </a></li>
                        <li><a className="footer-content">Media & Entertainment </a></li>
                        <li><a className="footer-content">News & Publication </a></li>
                        <li><a className="footer-content">Telecoms </a></li>
                        <li><a className="footer-content">Non-profits </a></li>
                        <li><a className="footer-content">Agriculture</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default Footer
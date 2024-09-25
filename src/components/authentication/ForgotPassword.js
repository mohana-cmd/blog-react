import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import logo from '../../assets/img/logo.png';

const ForgotPassword = () => {
    const [email,setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const load = () =>{

    }
        return (
            <div className="top blog-list header-banner">
                <div className="top-bar">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav className="navbar navbar-expand-lg">
                                    <div className="container-fluid">
                                        <a className="navbar-brand">
                                            <img src={logo} alt="logo" />
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div className="all">
                            <div className="login-screen">
                                <div className="logo"></div>
                                <div className="card">
                                    <div className="card-body">
                                        <h3>Forgot Password</h3>
                                        <form className="m-4">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <InputText className="loginInput" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Email" />
                                                <div className="text-danger text-start">Email is Required</div>
                                            </div>
                                            <Button className="btn btn-primary w-100 mb-2 mt-3 justify-content-center" label="Submit" icon="pi pi-check" loading={loading} onClick={load} />
                                            {/* <button pButton type="button" className="btn btn-primary w-100 mb-2 mt-3 justify-content-center"> 
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span>Login</span></button> */}
                                            <Link to="/login">Login?</Link>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default ForgotPassword
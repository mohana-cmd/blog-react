import React, { useState } from "react";
import logo from '../../assets/img/logo.png';
import { Link } from "react-router-dom";

const Header = () => {
    const [activeItem, setActiveItem] = useState('category');
    const handleClick = (item) => {
        setActiveItem(item);
    };

    return(
        <div className="top-bar">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <a className="navbar-brand">
                                <img src={logo} alt="logo" />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item cursor-pointer active-menu">
                                        <Link to="/category-list" className={`nav-link ${activeItem === 'category' ? 'active' : '' }`} onClick={() => handleClick('category')}>Category</Link>
                                    </li>
                                    <li className="nav-item cursor-pointer">
                                        <Link to="/blog" className={`nav-link ${activeItem === 'blog' ? 'active' : '' }`} onClick={() => handleClick('blog')}>Blog</Link>
                                    </li>
                                    <li className="nav-item cursor-pointer">
                                        <Link to="/job" className={`nav-link ${activeItem === 'job' ? 'active' : '' }`} onClick={() => handleClick('job')}>Job</Link>
                                    </li>
                                    <li className="nav-item cursor-pointer">
                                        <a className="nav-link">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
</div>
    )
}

export default Header
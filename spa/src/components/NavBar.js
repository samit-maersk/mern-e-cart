import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/authSlice';
import { useNavigate } from "react-router-dom";
const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">eCART</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                <i className="bi bi-house h4"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/category">
                                category
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/product">
                                product
                            </Link>
                        </li>
                    </ul>
                    
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                    
                    <ul className="navbar-nav">
                        {user && user.name ? (
                            <li className="nav-item">
                                <a href='#' className="nav-link" onClick={handleLogout}>
                                    logout
                                </a>
                            </li>
                            
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    login
                                </Link>
                            </li>
                        )}
                        
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorite">
                                <i className="bi bi-heart h4"></i>
                            </Link>
                        </li> */}

                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">
                                <i className="bi bi-cart h4"></i>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                <i className="bi bi-person-fill h4"></i>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import loadingContext from "../../context/loading/LoadingContext";

export default function Header() {
    const {setProgress}= useContext(loadingContext);
    const currentLocation=useLocation().pathname;
    const navigate=useNavigate();
  return (
    <>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">NotesAnywhere</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className={`nav-link ${(currentLocation==="/"?"active":"")} ${(currentLocation.includes("/login")||currentLocation.includes("/register")?"visually-hidden":"" )}`} to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className={`nav-link ${(currentLocation==="/about"?"active":"")}`} to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                    
                    </li>
                </ul>
                <form className="d-flex">
                    <NavLink className={`btn btn-sm btn-primary mx-1 ${(currentLocation.includes("/login") || localStorage.getItem('token')?"visually-hidden":"")}`} role="button" to="/session/login">Login</NavLink>
                    <NavLink className={`btn btn-sm btn-primary mx-1 ${(currentLocation.includes("/register") || localStorage.getItem('token')?"visually-hidden":"")}`} role="button" to="session/register">Register</NavLink>
                    <NavLink className={`btn btn-sm btn-primary mx-1 ${(localStorage.getItem('token') && !currentLocation.includes("/profile")?"":"visually-hidden")}`} role="button" to="profile">Profile</NavLink>
                    <button className={`btn btn-sm btn-primary mx-1 ${(localStorage.getItem('token')?"":"visually-hidden")}`} onClick={(e)=>{e.preventDefault();setProgress(30);localStorage.removeItem('token');setProgress(100);navigate('/session/login');}}>Logout</button>
                </form>
                {/* <form className={`d-flex ${currentLocation ==="/"?"":"visually-hidden"}`} role="search" onSubmit={event=>{event.preventDefault()}}>
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}
                </div>
            </div>
            </nav>
    </>);
}

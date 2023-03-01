import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar navbar-dark navbar-expand-sm">
            <Link  className="navbar-brand" to="/">Movies Search App</Link>
            <ul className="navbar-nav ml-auto">                
                <li className="nav-item">
                    <Link to="/" className="nav-link">About</Link>
                </li>
            </ul>
        </nav>
    );
}
 
export default Navbar;

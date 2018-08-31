import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
    return (
       <nav className="navbar navbar-expend-sm navbar-dark bg-danger mb-3 py-0">
           <div className="container">
               <a href="#" className="navbar-brand">{props.branding}</a>
               <div>
                   <ul className="nav navbar-nav flex-md-row justify-content-between">
                       <li className="nav-item">
                           <Link to="/" className="nav-link pl-2 pr-2">
                               <i className="fas fa-home" /> Home
                           </Link>
                       </li>
                       <li className="nav-item">
                           <Link to="/contact/add" className="nav-link pl-2 pr-2">
                               <i className="fas fa-plus" /> Add
                           </Link>
                       </li>
                       <li className="nav-item">
                           <Link to="/about" className="nav-link pl-2 pr-2">
                               <i className="fas fa-question" /> About
                           </Link>
                       </li>
                   </ul>
               </div>
           </div>
       </nav>
    )
}

Header.defaultProps = {
    branding: 'My App'
};

Header.propTypes = {
    branding: PropTypes.string.isRequired,
}


export default Header;
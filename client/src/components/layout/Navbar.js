import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
        <h1>
          <a href="index.html"><i className="fas fa-code"></i> EveA</a>
        </h1>
        <ul>
        <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-info mr-2">Login</Link>
        </ul>
      </nav>

    )

}

export default Navbar;
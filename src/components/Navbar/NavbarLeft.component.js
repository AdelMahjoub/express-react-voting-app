import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLeft = function(props) {
  return (
    <ul className="nav navbar-nav">
      <li>
        <Link to="/">Gallery</Link>
      </li>
    </ul>
  )
}

export default NavbarLeft;
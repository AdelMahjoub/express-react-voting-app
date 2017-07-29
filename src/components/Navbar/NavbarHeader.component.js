import React from 'react';

const NavbarHeader = function(props) {
  return (
    <div className="navbar-header">
      <button 
      onClick={props.collapseToggle}
      type="button" 
      className="navbar-toggle">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/">{props.brand}</a>
    </div>
  )
}

export default NavbarHeader;
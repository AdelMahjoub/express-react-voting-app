import React from 'react';
import { Link } from 'react-router-dom';


const NavbarRight = function(props) {
  return (
    <ul className="nav navbar-nav navbar-right">
      {
        props.isAuth &&
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      }
      <li
      id="navbar-dropdown-menu"
      className="dropdown"
      onClick={props.dropdownToggle}>
        <a 
        className="dropdown-toggle" 
        style={{cursor: 'pointer'}}>
          <i className="fa fa-user-circle fa-2x"></i> 
          <b className="caret"></b>
        </a>
        <ul className="dropdown-menu">
          {
            props.dropdownItems.map(item => {
              return (
                <li key={item.label}>
                  {
                    item.url ? 
                    <Link 
                      to={item.url}>
                      <i className={"fa fa-" + item.icon}></i>
                      <span style={{marginLeft: '5px'}}>{item.label}</span>
                    </Link>
                    :
                    <a onClick={props.onLogout} style={{ cursor: 'pointer' }}>
                      <i className={"fa fa-" + item.icon}></i>
                      <span style={{marginLeft: '5px'}}>{item.label}</span>
                    </a>
                  }
                 
                </li>
              )
            })
          }
        </ul>
      </li>
    </ul>
  )
}

export default NavbarRight;
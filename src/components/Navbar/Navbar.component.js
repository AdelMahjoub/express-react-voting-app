import React, { Component } from 'react';
import NavbarHeader from './NavbarHeader.component';
import NavbarLeft from './NavbarLeft.component';
import NavbarRight from './NavbarRight.component';
import NavbarForm from './NavbarForm.component';
import { Redirect } from 'react-router-dom';
import { closeDropdown, collapseToggle, dropdownToggle } from './Navbar.utils';
import user from '../../User';
import { isAuth, logout } from '../../api';


// Navbar dropdown menu items when the user is authenticated
const authLinks = [
  { url: '', label: 'Logout', icon: 'power-off' }
]

// Navbar dropdown menu items when the user is not authenticated
const guestLinks = [
  { url: '/signup', label: 'Signup', icon: 'user-plus' },
  { url: '/login', label: 'Login', icon: 'sign-in' }
]

class Navbar extends Component{ 

  constructor(props) {
    super(props);
    this.state = {
      triggerRedirect: false
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    isAuth(isAuthenticated => {
      if(isAuthenticated) {
        user.userLogin();
        this.forceUpdate();
      } else {
        user.userLogout();
        this.forceUpdate();
      }
    })
    window.addEventListener('click', closeDropdown, {passive: true, capture: false});
  }

  componentWillUnmount() {
    window.removeEventListener('click', closeDropdown);
  }

  handleLogout(e) {
    logout(() => {
      user.userLogout();
      this.forceUpdate();
      this.setState({ triggerRedirect: true });
    })
  }

  render() {
    let dropdownItems = [];
    if(user.isAuthenticated()) {
      dropdownItems = [...authLinks];
    } else {
      dropdownItems = [...guestLinks];
    }
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <NavbarHeader 
            collapseToggle={collapseToggle}
            brand={this.props.brand}/>
          <div
            id="navbar-collapse-menu" 
            className="collapse navbar-collapse">
            <NavbarLeft />
            {
              this.props.onSort &&
              <NavbarForm 
                onSearch={this.props.onSearch}
                searchTerm={this.props.searchTerm}
                onSort={this.props.onSort}
                sortFilter={this.props.sortFilter}/>
            }
            <NavbarRight 
              dropdownToggle={dropdownToggle}
              isAuth={user.isAuthenticated()}
              dropdownItems={dropdownItems}
              onLogout={this.handleLogout}/>
            {
              this.state.triggerRedirect &&
              <Redirect to="/" />
            }
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import InputField from '../components/Input.component';
import Navbar from '../components/Navbar/Navbar.component';
import CenteredSection from '../components/CenteredSection.component';
import Notification from '../components/Notification.component';
import { isEmail, hasMinLength, compare } from '../helper-functions';
import { signup } from '../api';
import user from '../User';

export default class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        valid: false,
        value: '',
        blurred: false
      },
      password: {
        valid: false,
        value: '',
        blurred: false
      },
      confirmPassword: {
        valid: false,
        value: '',
        blurred: false
      },
      validationErrors: [],
      triggerRedirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
    this.handleConfirmPasswordBlur = this.handleConfirmPasswordBlur.bind(this);
  }

  handleEmailBlur(e) {
    this.setState({
      email: {
        ...email, 
        valid: isEmail(e.target.value), 
        blurred: true}
    });
  }

  handlePasswordBlur(e) {
    this.setState({
      password: {
        ...password, 
        valid: hasMinLength(e.target.value, 6), 
        blurred: true}
    });
  }

  handleConfirmPasswordBlur(e) {
    this.setState({
      confirmPassword: {
        ...confirmPassword, 
        valid: compare(e.target.value, this.state.password.value) && e.target.value !== '', 
        blurred: true
      }
    });
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: {
        ...[name],
        value: e.target.value
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ validationErrors: [] });
    signup(this.state.email.value, this.state.password.value, (res) => {
      if(res['errors'] && res['errors'].length > 0) {
        user.userLogout();
        this.setState({validationErrors: res['errors']});
      } else {
        user.userLogin();
        this.forceUpdate();
        this.setState({triggerRedirect: true});
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar 
          brand="Polls Arena" 
          isAuth={user.isAuthenticated()} />
        <div className="container main">
          <CenteredSection>
            {
              this.state.validationErrors.length > 0 &&
              this.state.validationErrors.map(message => {
                return (
                  <Notification 
                    key={message}
                    color="alert-danger"
                    message={message}/>
                )
              })
            }
            <form onSubmit={this.onSubmit}>
              <InputField 
                label="Email"
                name="email"
                icon="envelope"
                onBlur={this.handleEmailBlur}
                onChange={this.handleChange}
                value={this.state.email.value}
                valid={this.state.email.valid}
                blurred={this.state.email.blurred}
                helpMessage={this.state.email.valid ? '' : 'Not a valid email'}
                type="email"
                placeholder="email"/>
              <InputField 
                label="Password"
                name="password"
                icon="key"
                onBlur={this.handlePasswordBlur}
                onChange={this.handleChange}
                value={this.state.password.value}
                valid={this.state.password.valid}
                blurred={this.state.password.blurred}
                helpMessage={this.state.password.valid ? '' : 'Password minimum length 6 characters'}
                type="password"
                placeholder="password"/>
              <InputField 
                label="Confirm Password"
                name="confirmPassword"
                icon="key"
                onBlur={this.handleConfirmPasswordBlur}
                onChange={this.handleChange}
                value={this.state.confirmPassword.value}
                valid={this.state.confirmPassword.valid}
                blurred={this.state.confirmPassword.blurred}
                helpMessage={this.state.confirmPassword.valid ? '' : 'Passwords mismatches'}
                type="password"
                placeholder="Confirm Password"/>
                <div className="form-group">
                  <button
                    disabled={!this.state.email.valid && !this.state.password.valid && !this.state.confirmPassword.valid} 
                    type="submit" 
                    className="btn btn-primary">
                    Register
                  </button>
                   {
                      this.state.triggerRedirect &&
                      <Redirect to="/" />
                    }
                </div>
            </form>
          </CenteredSection>
        </div>
      </div>
    )
  }
}
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import InputField from '../components/Input.component';
import Navbar from '../components/Navbar/Navbar.component';
import CenteredSection from '../components/CenteredSection.component';
import Notification from '../components/Notification.component';
import { isEmail, hasMinLength } from '../helper-functions';
import { login } from '../api';
import user from '../User';

export default class LoginPage extends Component {

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
      validationErrors: [],
      triggerRedirect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handlePasswordBlur = this.handlePasswordBlur.bind(this);
  }

  handleEmailBlur(e) {
    this.setState({
      email: {...email, valid: isEmail(e.target.value), blurred: true}
    })
  }

  handlePasswordBlur(e) {
    this.setState({
      password: {...password, valid: hasMinLength(e.target.value, 6), blurred: true}
    })
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
    this.setState({ validationErrors: [] })
    login(this.state.email.value, this.state.password.value, (res) => {
      if(!res) {
        user.userLogout();
        this.setState({ validationErrors: ['Invalid username or password'] });
      } else {
        user.userLogin();
        this.forceUpdate();
        this.setState({triggerRedirect: true});
      }
    });
  }

  componentWillUnmount() {
    this.setState({ validationErrors: [] });
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
                <div className="form-group">
                  <button
                    disabled={!this.state.email.valid && !this.state.password.valid} 
                    type="submit" 
                    className="btn btn-primary">
                    LogIn
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
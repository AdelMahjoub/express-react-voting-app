import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar.component';
import PollsList from '../components/PollsList.component';
import Notification from '../components/Notification.component';
import user from '../User';
import { isAuth, dashboardPolls, deletePoll } from '../api';
import { Redirect, Link } from 'react-router-dom';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      triggerRedirect: false,
      successNotification: '',
      errorNotification: [],
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    isAuth(isAuthenticated => {
      if(!isAuthenticated) {
        this.setState({ triggerRedirect: true });
        user.userLogout();
      } else {
        dashboardPolls(polls => {
          this.setState({polls: [...polls]});
        });
      }
    });
  }

  handleDelete(e) {
    let id = e.target.id;
    this.setState({errorNotification: [], successNotification: ''});
    deletePoll(id, res => {
      if(res['errors'] && res['errors'].length > 0) {
        this.setState({errorNotification: res['errors']});
        window.scrollTo(0, 0);
      } else {
        this.setState({successNotification: 'Poll deleted !'});
        dashboardPolls(polls => {
          this.setState({polls: [...polls]});
          window.scrollTo(0, 0);
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar 
          brand="Polls Arena" 
          isAuth={user.isAuthenticated()} 
        />
        <div className="container">
          <div className="row">
            <div className="col-xs-6 col-md-6">
              <Link to="/polls/edit/new" className="btn btn-success">
                <i className="fa fa-plus"></i>
                {' '}
                <span>New Poll</span>
              </Link>
            </div>
            <div className="col-xs-6 col-md-6">
              {
                this.state.successNotification.length > 0 &&
                <Notification 
                  color="alert-success"
                  message={this.state.successNotification}/>
              }
              {
                this.state.errorNotification.length > 0 &&
                this.state.errorNotification.map(message => {
                  return (
                    <Notification 
                      key={message}
                      color="alert-danger"
                      message={message}/>
                  )
                })
              }
              
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <hr/>
            </div>
          </div>
        </div>
        <PollsList 
        handleDelete={this.handleDelete}
        polls={this.state.polls}
        inDashboard={true}/>
        {
          this.state.triggerRedirect &&
          <Redirect to="/login" />
        }
      </div>
    )
  }
}
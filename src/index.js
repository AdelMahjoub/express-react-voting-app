import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage';
import UserPolls from './pages/UserPolls';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/DashboardPage';
import PollDetailsPage from './pages/PollDetailsPage';
import PollEditPage from './pages/PollEditPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { isAuth } from './api';

const App = function(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/polls/details/:id" component={PollDetailsPage}/>
        <Route exact path="/polls/users/:id" component={UserPolls}/>
        <Route exact path="/polls/edit/:id" component={PollEditPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/signup" component={SignupPage}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
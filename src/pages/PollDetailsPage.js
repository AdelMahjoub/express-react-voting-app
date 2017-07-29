import React, { Component } from 'react';
import { isAuth, getPollById, vote } from '../api';
import CenteredSection from '../components/CenteredSection.component';
import Notification from '../components/Notification.component';
import PollVoteForm from '../components/PollVoteForm.component';
import PollChart from '../components/PollChart.component';
import Navbar from '../components/Navbar/Navbar.component';
import user from '../User';

export default class PollDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
      options: [],
      selectedOption: '',
      validationErrors: [],
      successMessage: ''
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    let pollId = this.props.match.params.id;
    getPollById(pollId, poll => {
      this.setState({ poll, options: poll.options});
    });
  }

  handleVote(e) {
    e.preventDefault();
    this.setState({ validationErrors: [] });
    this.setState({successMessage: ''});
    if(this.state.selectedOption.length > 0) {
      vote(this.state.poll._id, this.state.selectedOption, res => {
        if(res['errors'].length > 0) {
          this.setState({validationErrors: res['errors']});
        } else {
          this.setState({successMessage: 'Votes updated !'});
          getPollById(this.state.poll._id, poll => {
            this.setState({poll, options: poll.options});
          });
        }
      });
    }
  }

  handleSelect(e) {
    this.setState({selectedOption: e.target.value});
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
                message={message} 
                color="alert-danger"/>
              )
            })
          }
          {
            this.state.successMessage.length > 0 &&
            <Notification message={this.state.successMessage} color="alert-success"/>
          }
        </CenteredSection>
        <PollVoteForm 
          title={this.state.poll.title}
          options={this.state.poll.options || []}
          onVote={this.handleVote}
          onSelect={this.handleSelect}
          selectedOption={this.state.selectedOption}/>
        <PollChart options={this.state.options}/>
        </div>
      </div>
    )
  }
}
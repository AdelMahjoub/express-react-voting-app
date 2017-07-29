import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar.component';
import CenteredSection from '../components/CenteredSection.component';
import Notification from '../components/Notification.component';
import user from '../User';
import { isAuth, getPollById, updatePoll, addPoll } from '../api';
import { Redirect, Link } from 'react-router-dom';

class Poll {
  title = '';
  options = [];
  constructor() {
    for(let i = 0; i < 2; i++) {
      this.options.push(new Option());
    }
  }
}

class Option {
  label = '';
}

export default class PollEditComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
      triggerRedirect: false,
      mounted: false,
      editMode: 'edit',
      successNotification: '',
      validationErrors: []
    }
    this.pollTouched = false;
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDiscardOption = this.onDiscardOption.bind(this);
    this.onAddOption = this.onAddOption.bind(this);
  }

  componentDidMount() {
    isAuth(isAuthenticated => {
      if(!isAuthenticated) {
        this.setState({triggerRedirect: true});
        return user.userLogout();
      } else {
        let id = this.props.match.params['id'];
        if(id !== 'new') {
          getPollById(id, poll => {
            this.setState({poll, mounted: true});
          });
        } else {
          this.setState({poll: new Poll(), mounted: true, editMode: 'add'})
        }
      }
    });
  }

  handleChange(e) {
    let target = e.target.name;
    let value = e.target.value;
    if(target === 'title') {
      return this.setState({poll: {... this.state.poll, title: value}}, () => {
        this.pollTouched = true;
      });
    }
    let index = parseInt(target.split('-')[1], 10);
    let options = [... this.state.poll.options];
    options[index]['label'] = value;
    return this.setState({poll: {... this.state.poll, options}}, () => {
      this.pollTouched = true;
    });
  }

  onAddOption(e) {
    let options = [... this.state.poll.options];
    options.push(new Option());
    this.setState({poll: {... this.state.poll, options: []}}, () => {
      this.setState({poll: {... this.state.poll, options}});
      this.pollTouched = true;
    })
  }

  onDiscardOption(e) {
    let index = parseInt(e.target.getAttribute("data-target"), 10)
    let options = [... this.state.poll.options];
    if(options.length > 2) {
      let unwanted = this.state.poll.options[index];
      options = options.filter(option => option !== unwanted);
      this.setState({poll: {... this.state.poll, options: []}}, () => {
        this.setState({poll: {... this.state.poll, options}});
        this.pollTouched = true;
      })
    } 
  }

  onSave(e) {
    this.setState({validationErrors: []});
    this.setState({successNotification: ''});
    e.preventDefault();
    if(this.pollTouched) {
      this.pollTouched = false;
      if(this.state.editMode === 'edit') {
        let data = {
          pollId: this.state.poll._id,
          title: this.state.poll.title,
          options: this.state.poll.options.map(option => {return {label: option.label}})
        }
        updatePoll(data, response => {
          if(response['errors'] && response['errors'].length > 0) {
            this.setState({validationErrors: response['errors']});
          } else {
            this.setState({successNotification: 'Poll updated !'});
          }
        });
      } else {
         let data = {
          title: this.state.poll.title,
          options: this.state.poll.options.map(option => {return {label: option.label}})
        }
        addPoll(data, response => {
           if(response['errors'] && response['errors'].length > 0) {
            this.setState({validationErrors: response['errors']});
          } else {
            this.setState({successNotification: 'Poll added !'});
          }
        });
      }
    }
  }
 
  render() {
    return (
      <div>
        <Navbar 
        brand="Polls Arena"
        isAuth={user.isAuthenticated()}/>
        <div className="container main">
          <CenteredSection>
            {
              this.state.successNotification.length > 0 &&
              <Notification
              message={this.state.successNotification} 
              color="alert-success"/>
            }
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
          </CenteredSection>
        {
          this.state.mounted &&
           <CenteredSection>
            <form onSubmit={this.onSave}>
              <div className="form-group">
                <div className="row">
                  <div className="col-xs-10">
                    <input
                      name="title"
                      onChange={this.handleChange}
                      defaultValue={this.state.poll.title}
                      type="text" 
                      className="form-control" 
                      placeholder="Poll's title" />
                  </div>
                </div>
              </div>
              {
                this.state.poll.options.map((option, index) => {
                  return (
                    <div
                      key={`option-${index}`} 
                      className="form-group">
                      <div className="row">
                        <div className="col-xs-10">
                          <input
                            name={`option-${index}`}
                            onChange={this.handleChange}
                            defaultValue={option['label'] || ''}
                            type="text" 
                            className="form-control" 
                            placeholder="option" />
                        </div>
                        <div className="col-xs-2">
                          <button 
                            data-target={index}
                            type="button"
                            title="discard option"
                            onClick={this.onDiscardOption}
                            disabled={this.state.poll.options.length === 2}
                            className="btn btn-danger fa fa-remove">
                          </button>
                        </div>
                      </div>
                      {' '}
                    </div>
                  )
                })
              }
              <div className="form-group">
                <button 
                  onClick={this.onSave}
                  title="save poll"
                  className="btn btn-primary fa fa-floppy-o" 
                  type="submit">
                </button>
                {' '}
                <Link
                  to="/dashboard" 
                  title="cancel"
                  className="btn btn-default fa fa-ban">
                </Link>
                {' '}
                <button
                  onClick={this.onAddOption}
                  type="button" 
                  title="add option"
                  className="btn btn-success fa fa-plus">
                </button>
              </div>
            </form>
          </CenteredSection>
        }
       </div>
        {
          this.state.triggerRedirect &&
          <Redirect to="/login" />
        }
      </div>
    )
  }
}
import React, { Component } from 'react';
import Gallery from '../components/Gallery.component';
import { getUserPolls } from '../api';

export default class UserPolls extends Component{

  constructor(props) {
    super(props);
    this.state = {
      polls: []
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id
    getUserPolls(id, polls => {
      console.log(polls);
      this.setState({ polls: [... polls] });
    });
  }

  render() {
    return (
      <div>
        <Gallery polls={[... this.state.polls]}/>
      </div>
    )
  }
}
import React, { Component } from 'react';
import Gallery from '../components/Gallery.component';
import { getAllPolls } from '../api';

export default class HomePage extends Component{

  constructor(props) {
    super(props);
    this.state = {
      polls: []
    }
  }

  componentDidMount() {
    getAllPolls(polls => {
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
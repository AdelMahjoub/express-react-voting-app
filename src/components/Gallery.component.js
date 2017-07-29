import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { getAllPolls } from '../api';
import { search, sort } from '../helper-functions.js';

import Navbar from '../components/Navbar/Navbar.component';
import PollsList from '../components/PollsList.component';
import user from '../User';


class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortFilter: 'most recent',
      searchTerm: '',
      initilaPolls:[],
      filteredPolls: []
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    this.setState({ initilaPolls: nextProps.polls }, () => {

      search(this.state.searchTerm, this.state.initilaPolls, filtered => {

        this.setState({ filteredPolls: filtered }, () => {

          sort(this.state.sortFilter, this.state.filteredPolls, sorted => {

            this.setState({ filteredPolls: sorted });

          });
        });
      });
    });
  }

  componentDidMount() {
    this.setState({ initilaPolls: this.props.polls }, () => {

      search(this.state.searchTerm, this.state.initilaPolls, filtered => {

        this.setState({ filteredPolls: filtered }, () => {

          sort(this.state.sortFilter, this.state.filteredPolls, sorted => {

            this.setState({ filteredPolls: sorted });

          });
        });
      });
    });
  }


  handleSearch(e) {
    this.setState({ searchTerm: e.target.value }, () => {
      search(this.state.searchTerm, this.state.initilaPolls, filtered => {
        this.setState({ filteredPolls: filtered });
      });
    });
  }

  handleSort(e) {
    this.setState({ sortFilter: e.target.value }, () => {
      sort(this.state.sortFilter, this.state.filteredPolls, sorted => {
        this.setState({ filteredPolls: sorted });
      });
    });
  }

  render() {
    return (
      <div>
        <Navbar 
          brand="Polls Arena" 
          isAuth={user.isAuthenticated()} 
          searchTerm={this.state.searchTerm}
          onSearch={this.handleSearch}
          sortFilter={this.state.sortFilter}
          onSort={this.handleSort}/>
        <PollsList polls={this.state.filteredPolls}/>
      </div>
    )
  }
}

export default Gallery;
import React, { Component } from 'react';
import './index.css';
import axios from 'axios';
import Search from '../Search/index';
import Table from  '../Table/index';
import Button from '../Button/index';

import {
	DEFAULT_QUERY,
	DEFAULT_HPP,
	PATH_BASE,
	PATH_SEARCH,
	PARAM_SEARCH,
	PARAM_PAGE,
	PARAM_HPP,
} from '../../constants/index.js';


class App extends Component {

  _isMounted = false;

  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
    }
  }

  componentDidMount(){
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }
  setSearchTopStories = (result) => {
    this.setState({ result });
  }
  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value })
    //console.log(this.state.searchTerm);
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if(this.needsToSearchTopStories(searchTerm)){
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    //console.log(this.state.searchTerm);
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render() {
    const { searchTerm, results, searchKey, error } = this.state;
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    if(error){
      return <p>Something went wrong</p>;
    }

    return (
      <div className="page">
          <h2>Hacker News</h2>
          <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            >Search
          </Search>
          <hr />
        </div>

        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </Button>
        </div>
        { error ?
          <div className="interations">
            <p>Something went wrong</p>
          </div> :
          <Table
            list={list}
            onDismiss={this.onDismiss}
          />
         }
      </div>
    );
  }
}

export default App;

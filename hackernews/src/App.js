import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Table from  './components/Table';
import Button from './components/Button';

const DEFAULT_QUERY = 'nodejs';
const DEFAULT_HPP = '100';

const PATH_BASE = 'http://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    }
  }

  componentDidMount(){
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    //console.log(searchTerm);
  }
  setSearchTopStories = (result) => {
    this.setState({ result });
  }
  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value })
    //console.log(this.state.searchTerm);
  }

  onSearchSubmit = (event) => {
    console.log('OnsearchSubmit ' + this.state.searchTerm);

    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    //console.log(this.state.searchTerm);
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const oldHits = page !== 0 ?
      this.state.result.hits : [];

    const updateHits = [
      ...oldHits,
      ...hits
    ];
  }

  render() {
    const { searchTerm, result} = this.state;
    const page = (result && result.page) || 0;
    if(!result) {return null;}

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
        { result &&
          <Table
            list={result.hits}
            onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            More
          </Button>
        </div>

      </div>
    );
  }
}

export default App;

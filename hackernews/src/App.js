import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Table from  './components/Table';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'http://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


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

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
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
  }


  render() {
    const { searchTerm, result} = this.state;

    if(!result) {return null;}

    return (
      <div className="page">
          <h2>Hacker News</h2>
          <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >Search</Search>
          <hr />
        </div>
        { result &&
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        }


      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Table from  './components/Table';


const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  }, {
      title: 'Redux',
      url: 'https://github.com/reactjs/redux',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
  },
];


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm: ''
    }
  }
  onDismiss = (id) => {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({list: updatedList});
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }


  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
          <h2>Hacker News</h2>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >Search</Search>
          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />

          <p>Total Articles: {this.state.list.length}</p>
      </div>
    );
  }
}

export default App;

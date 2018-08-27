import React, { Component } from 'react';
import './App.css';

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

  isSearched = (searchTerm) => {
    return item => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }
  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
          <h2>Hacker News</h2>
          <form>
            <input
              type="text"
              value={searchTerm}
              onChange={this.onSearchChange}
            />
          </form>
          {list.filter(this.isSearched(this.state.searchTerm)).map(item => {
            const onHandleDismiss = () =>
              this.onDismiss(item.objectID);

            return <div key={item.objectID}>
              <span><a href={item.url}>{item.title}</a></span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <button
                  onClick={onHandleDismiss}
                  type="button"
                  >Dismiss
                </button>
              </span>
              </div>;
          })}
          <p>Total Articles: {this.state.list.length}</p>
      </div>
    );
  }
}

export default App;

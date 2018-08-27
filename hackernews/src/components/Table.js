import React, { Component } from 'react';


class Table extends Component{

  isSearched = (searchTerm) => {
    return item => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }
  render(){
    const { list, pattern, onDismiss } = this.props;
    return(
      <div>
        {list.filter(this.isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_commments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss(item.objectID)}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        )}
    </div>
    );
  }
}

export default Table;

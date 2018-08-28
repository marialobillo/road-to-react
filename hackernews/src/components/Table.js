import React, { Component } from 'react';
import Button from './Button';

class Table extends Component{

  isSearched = (searchTerm) => {
    return item => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }
  render(){
    const { list, onDismiss } = this.props;
    return(
      <div className="table">
        {list.map(item =>
          <div key={item.objectID} className="table-row">
            <span style={{ width: '40%' }}>
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{ width: '30%' }}>{item.author}</span>
            <span style={{ width: '10%' }}>{item.num_commments}</span>
            <span style={{ width: '10%' }}>{item.points}</span>
            <span>
              <Button onClick={() => onDismiss(item.objectID)}
                  className="button-inline"
                >
                Dismiss
              </Button>
            </span>
          </div>
        )}
    </div>
    );
  }
}

export default Table;

import React, { Component } from 'react';
import Button from '../Button';
import { sortBy } from 'lodash';

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

class Table extends Component{

  isSearched = (searchTerm) => {
    return item => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }
  render(){
    const { list,
            onDismiss,
            onSort,
            sortKey,
            isSortReverse,
          } = this.props;
    return(
      <div className="table">
        <div className="table-header">
      <span style={{ width: '40%' }}>
        <Sort
          sortKey={'TITLE'}
          onSort={onSort}
          > Title
        </Sort>
      </span>
      <span style={{ width: '30%' }}>
        <Sort
          sortKey={'AUTHOR'}
          onSort={onSort}
        >
          Author
        </Sort>
      </span>
      <span style={{ width: '10%' }}>
        <Sort
          sortKey={'COMMENTS'}
          onSort={onSort}
          > Comments
        </Sort>
      </span>
      <span style={{ width: '10%' }}>
        <Sort
          sortKey={'POINTS'}
          onSort={onSort}
        >
          Points
        </Sort>
      </span>
      <span style={{ width: '10%' }}>
        Archive
      </span>
    </div>
        {SORTS[sortKey](list).map(item =>
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

const Sort = ({ sortKey, onSort, children }) =>
  <Button onClick={() => onSort(sortKey)}>
    {children}
  </Button>

export default Table;

import React, { Component } from 'react';
import TodoListContainer from './containers/TodoListContainer';
import AddTodoContainer from './containers/AddTodoContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col-md-6 full-height-block py-3">
            <TodoListContainer />
          </div>
          <div className="col-md-6 py-3">
            <AddTodoContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

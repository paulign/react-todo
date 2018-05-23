import React, { Component } from 'react';
import TodoListContainer from './containers/TodoListContainer';
import AddTodoContainer from './containers/AddTodoContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="container py-3">
        <div className="row">
        <div className="col-md-6">
            <TodoListContainer />
          </div>
          <div className="col-md-6">
            <AddTodoContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

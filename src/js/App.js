import React, { Component } from 'react';
import TodoListContainer from './containers/TodoListContainer';
import AddTodoContainer from './containers/AddTodoContainer';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom';
import { getAllTodosRequest, hideAlert } from './actions';
import Loading from './components/Loading';
import AlertMessage from './components/AlertMessage';
import Header from './components/Header';


const ConnectedSwitch = connect(state => ({
  ...state
}))(Switch);

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllTodos();
  }


  render() {
    let { todos, alert, hideAlert } = this.props;

    return (
      <div>
        <Header />
        <div className="container">
          <AlertMessage {...alert} hideAlert={hideAlert} />
          <Loading isLoading={todos.isFetching} />
          <ConnectedSwitch>
            <Route exact path="/" component={TodoListContainer} />
            <Route path="/add" component={AddTodoContainer} />
          </ConnectedSwitch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    location: state.location,
    todos: state.todos,
    alert: state.alert
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTodos: () => dispatch(getAllTodosRequest()),
    hideAlert: () => dispatch(hideAlert())
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));

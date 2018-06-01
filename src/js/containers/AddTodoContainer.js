import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTodoForm from '../components/AddTodoForm';
import { addTodoRequest } from '../actions';
import { push } from 'react-router-redux';

class AddTodoContainer extends Component {

    componentDidMount = () => {
        document.title = 'Add todo';
    }

    render() {
        return (
            <AddTodoForm {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (todo) => dispatch(addTodoRequest(todo)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodoContainer);
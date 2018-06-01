import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTodoForm from '../components/AddTodoForm';
import { addTodoRequest } from '../actions';

class AddTodoContainer extends Component {

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
        addTodo: (todo) => dispatch(addTodoRequest(todo))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodoContainer);
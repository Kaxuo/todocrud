import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodo, editTodo } from '../../actions/todos';
import TodoForm from './TodoForm';


// Info on connect : todolist

class TodoEdit extends Component {
    componentDidMount() {
        this.props.getTodo(this.props.match.params.id)
    }

    onSubmit = formValues => {
        this.props.editTodo(this.props.match.params.id, formValues)
    }
    // THE TODO PROPERY COME FROM TODOLIST !! 

    render() {
        return (
            <div className='ui container'>
                <h2 style={{ marginTop: '2rem' }}>Edit Todo</h2>
                <TodoForm
                    // Creates an object composed of the picked object properties.
                    // var object = { 'a': 1, 'b': '2', 'c': 3 };
                    // _.pick(object, ['a', 'c']);
                    // // => { 'a': 1, 'c': 3 }
                    initialValues={_.pick(this.props.todo, 'task')}
                    // set enableReinitialize to true so that we can also get the value when the page is reloaded. Pass these optional properties to the TodoForm.
                    enableReinitialize={true}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    todo: state.todos[ownProps.match.params.id]
  });
// The connect() function connects a React component to a Redux store.
// It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.
// It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.
  export default connect(
    mapStateToProps,
    { getTodo, editTodo }
  )(TodoEdit);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../actions/todos'
import TodoForm from './TodoForm'

// The connect() function connects a React component to a Redux store.

// It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

// It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.

class TodoCreate extends Component{
    onSubmit = formValues => {
        this.props.addTodo(formValues);
    }


    render(){
        return (
            <div style={{marginTop:'2rem'}}>
                 {/*By setting destroyOnUnmount to false, we can disable that the Redux Form automatically destroys a form state in the Redux store when the component is unmounted. It is for displaying the form state in an editing form. */}
                <TodoForm destroyOnUnmount={false} onSubmit ={this.onSubmit} />
            </div>
        )
    }
}

export default connect(
    // IF YOU NEED MORE INFO ABOUT CONNECT AND MAP STATE PROPS THEN CHECK TODOLIST
    // If we don’t need to specify a mapStateToProps function, set null into connect().
    null,
    { addTodo }
  )(TodoCreate);
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../layout/Modal';
import history from '../../history';
import { getTodo, deleteTodo } from '../../actions/todos';
// The connect() function connects a React component to a Redux store.
// It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.
// It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.

class TodoDelete extends Component {
    componentDidMount(){
        // IN THE FOLDER SRC ACTIONS TODO.JS
        this.props.getTodo(this.props.match.params.id)
    }

    renderContent(){
        if (!this.props.todo){
        return 'Are you sure you want to delete this task ?'
    }
        return `Are you sure you want to delete the task : ${this.props.todo.task}`
    }
    

//     The code is a bit long, but it is not so difficult. Define the helper functions that display the content and the action buttons on the modal window. Then, pass them as Props to the Modal component. onDismiss is set to return to the index page when the dim part of the modal window is clicked.
// We can retrieve the data from its own props by specifying ownProps as the second argument to mapStateToProps.

    renderActions(){
        const {id} = this.props.match.params;
        return (
            <Fragment>
                <button onClick={() => this.props.deleteTodo(id)} className="ui negative button">Delete</button>
                <Link to ='/' className="ui button"> Cancel </Link>
            </Fragment>
            )
    }
    
    render(){
        return (
            <Modal 
            title = 'Delete Todo'
            content ={this.renderContent()}
            actions = {this.renderActions()}
            onDismiss = {() => history.push ('/')}/>
        )
    }
}


//   As the first argument passed in to connect, mapStateToProps is used for selecting the part of the data from the store that the connected component needs. It’s frequently referred to as just mapState for short.

// It is called every time the store state changes.
// // It receives the entire store state, and should return an object of data this component needs.

// If you understood the previous example, you see how easy it is to access data from a store. The problem is: your store might be huge, and your component does not need to be aware of all the changes in it. You want to choose which variables are accessed by which component. This is where mapStateToProps comes into action !
// Basically, this function tells your component what props will be added. You need state.username ? Then add it! The email ? Same. The “map” itself is just an object returned by your function

// If our state looks like this:
// {
//     username: ‘initial name’
// }

// function mapStateToProps(state){
//   return {
//       nameAsProps: state.username,
//   }
// }

// export default connect(mapStateToProps)(DisplayQuestion)

const mapStateToProps = (state, ownProps) => ({
    todo: state.todos[ownProps.match.params.id]
  });
  
  export default connect(
    mapStateToProps,
    { getTodo, deleteTodo }
  )(TodoDelete);

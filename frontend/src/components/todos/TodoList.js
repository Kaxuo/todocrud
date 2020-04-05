import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo } from '../../actions/todos';

class TodoList extends Component {
  componentDidMount() {
    this.props.getTodos();
    console.log(this.props.todo)
  }

  render() {
    return (
      <div className='ui relaxed divided list' style={{ marginTop: '2rem' }}>
        {/* the todos property come from todo mapstatetoprops, below !! */}
        {this.props.todos.map(todo => (
          <div className='item' key={todo.id}>
            {/* added */}
            <div className='right floated content'>
            <Link
                to={`/edit/${todo.id}`}
                className='small ui negative basic button'
              >
                Edit
              </Link>
              <Link
                to={`/delete/${todo.id}`}
                className='small ui negative basic button'
              >
                Delete
              </Link>
            </div>
            {/* added */}
            <i className='large calendar outline middle aligned icon' />
            <div className='content'>
              {/* by just addind the link below , we get to the pages, but its white , nothing on it ( with the item id ) so we need to add something  */}
              <Link to={`/edit/${todo.id}`} className='header'>
                {todo.task}
              </Link>
              <div className='description'>{todo.created_at}</div>
            </div>
          </div>
        ))}
      </div>
    );
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

const mapStateToProps = state => ({
  // state.todos come from reducer , you can have a third argument which is the data itself such as 'lead : []'
  todos: Object.values(state.todos)
});

export default connect(

  mapStateToProps,
  { getTodos }
)(TodoList);

// The connect() function connects this component to the store. It accepts mapStateToProps as the first argument, Action Creators as the second argument. We will be able to use the store state as Props by specifying mapStateToProps.

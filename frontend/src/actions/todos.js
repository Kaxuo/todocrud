import axios from 'axios';
import { GET_TODOS, ADD_TODO, GET_TODO, DELETE_TODO, EDIT_TODO} from './types';
import history from '../history'; // added
import {reset} from 'redux-form' // !!!!!!!!!!!!!
import { tokenConfig } from './auth'; // added


// We also need to pass token to the todo actions. Open the actions/todos.js file and update each action creator: !!!

// GET TODOS (all items)
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const getTodos = () => async (dispatch, getState) => {
  const res = await axios.get('/api/todos/' , tokenConfig(getState))
  dispatch({
    type: GET_TODOS,
    // payload= data received has objet {id : "", task :""}
    payload: res.data
  });
};

// Add TODO

// YOU NEED THOSE LINES FOR AXIOS POST !!!!
// https://www.techiediaries.com/django-react-forms-csrf-axios/



export const addTodo = formValues => async (dispatch, getState) => {
  const res = await axios.post('/api/todos/', {...formValues}, tokenConfig(getState))
  dispatch({
    type:ADD_TODO,
    payload:res.data
  })
  dispatch(reset('todoForm'));
 // Dispatching reset('formName') clears our form after we submission succeeds. We will specify the form name later in the Form component.
}


//get todo( one item), used to isolate one item and dispolay the "are you sure ? modal" BUT ALSO TO EDIT

export const getTodo = id => async (dispatch, getState) => {
  const res = await axios.get(`/api/todos/${id}/`, tokenConfig(getState))
  dispatch({
    type:GET_TODO,
    payload:res.data
  })
}

// delete todo

export const deleteTodo = id  => async (dispatch,getState) => {
  await axios.delete(`/api/todos/${id}`, tokenConfig(getState))
  dispatch({
    type:DELETE_TODO,
    payload: id
  })
  // The history.push('/') method automatically takes us from the modal window to the index page after removing an object.
  history.push('/');
}


// EDIT TODO

export const editTodo = (id , formValues) => async (dispatch,getState) => {
  const res = await axios.patch(`/api/todos/${id}/`, formValues, tokenConfig(getState))
  dispatch({
    type: EDIT_TODO,
    payload:res.data
  })
  // The history.push('/') method automatically takes us from the modal window to the index page after removing an object.
  history.push('/')
}
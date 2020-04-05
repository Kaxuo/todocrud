import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import todos from './todos';
import auth from './auth'; // added
import { LOGOUT_SUCCESS } from '../actions/types'; // added

// export default combineReducers({
//   form: formReducer,
//   todos,
//   auth //added 
// });

// Now we can log out, but there is one problem. For example, if you log in and out with Account 1 and then log in with Account 2, the todo objects for Account 1 will also appear in the todo list for Account 2. This is because the todo reducer is not initialized.
// To solve this problem, customize the root reducer as follows:

const appReducer = combineReducers({
  form: formReducer,
  todos,
  auth
});

const rootReducer = (state,action) => {
  if (action.type === LOGOUT_SUCCESS) {
    state = undefined
  }
  return appReducer(state,action)
}

export default rootReducer

// Now all reducers will be initialized whenever each user logs out.
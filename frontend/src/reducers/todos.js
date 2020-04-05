import _ from 'lodash';
import { GET_TODOS, ADD_TODO, GET_TODO, DELETE_TODO, EDIT_TODO } from '../actions/types';


// lodash utlility :
//  _.map([1, 2, 3], (i) => i + 1) == // [1, 2, 3].map((i) => i + 1)
// _.reduce([1, 2, 3], (sum, i) => sum + i, 0) == // [1, 2, 3].reduce((sum, i) => sum + i, 0)
// _.filter([1, 2, 3], (i) => i > 1)   // [1, 2, 3].filter((i) => i > 1)
// _.forEach([1, 2, 3], (i) => { console.log(i) }) // [1, 2, 3].forEach((i) => { console.log(i) })



export default (state = {}, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        // _.mapKeys(object, [iteratee=_.identity])  this method creates an object with the same values as object and keys generated by running each own enumerable string keyed property of object thru iteratee. The iteratee is invoked with three arguments: (value, key, object).
        // _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) { return key + value
        // ===> => { 'a1': 1, 'b2': 2 }

        ..._.mapKeys(action.payload, 'id')
      }
    // The GET_TODO action is the same as the ADD_TODO action, so we only need to set the case
    case EDIT_TODO: // added
    case GET_TODO:
    case ADD_TODO:
      return {
        ...state,
        // what we have already and + what we just added
        // leads : [...state.leads,action.payload ] for example 
        [action.payload.id]: action.payload
  }
    case DELETE_TODO:
  // For the DELETE_TODO action, use Lodash again as a shortcut. ,A simple Lodash.js example of the omit() function, we omit the specified key value pair and we create a new object without them.
  return _.omit(state, action.payload)
    default:
  return state;
}
};

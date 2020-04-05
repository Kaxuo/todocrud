
import axios from 'axios';
import { stopSubmit } from 'redux-form';
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS, // added
  REGISTER_FAIL, // added
} from './types';

// load user (and its content) ( we load the loading and then the user, as seen below)

export const loadUser = () => async (dispatch, getState) => {
    dispatch({type: USER_LOADING})
    try {
        const res = await axios.get('/api/auth/user', tokenConfig(getState))
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}

//login user (sending info to get user to log in)

export const login = ({ username,password }) => async dispatch => {
    // request Headers
    const config = {
        // YOU FORGOT THE S IN HEADERS !!!!!!!!!!
        headers: {
          'Content-Type': 'application/json'
        }
      };
    // request body
    const body = JSON.stringify({ username, password });

    try {
    const res = await axios.post('/api/auth/login', body,config)
    dispatch({
        type:LOGIN_SUCCESS,
        payload: res.data
    })
    } catch (err) {
        dispatch({
            type:LOGIN_FAIL
        })
        dispatch(stopSubmit('loginForm', err.response.data))
    }
}

// helper function

// Create a function named tokenConfig as a helper function that gets and sets tokens. This function is also used for todo’s action creators.
// We can use stopSubmit() to pass server-side errors to our Redux Form fields. The loginForm is going to be created later. Don’t worry about it for now.

export const tokenConfig = getState => {
    // Get token
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
  
    return config;
  };

export const logout = () => async (dispatch, getState) => {
    await axios.post('/api/auth/logout', null , tokenConfig(getState))
    dispatch({
        type:LOGOUT_SUCCESS
    })
} 


// register user

export const register = ({ username,email,password }) => async dispatch => {
    // Headers

    const config = {
        headers : {
            'Content-Type':'application/json'
        }
    }

    // request body
    const body = JSON.stringify ({username,email,password})


    try {
        const res = await axios.post('api/auth/register', body, config)

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
    } catch(err){
        dispatch ({
            type:REGISTER_FAIL
        })
        dispatch(stopSubmit('registerForm',err.response.data))
        // We use stopSubmit() again here to prevent double registration of users.
    }
}
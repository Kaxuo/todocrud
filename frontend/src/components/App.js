import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './todos/Dashboard'
import Header from './layout/Header'
import { Provider } from 'react-redux'
import store from '../store'
import history from '../history'; // added
import { Router, Route, Switch } from 'react-router-dom'; // added
import TodoDelete from './todos/TodoDelete'; // added
import TodoEdit from './todos/TodoEdit'; // added
import LoginForm from './auth/LoginForm'; // added
import PrivateRoute from './common/PrivateRoute'; // added
import RegisterForm from './auth/RegisterForm'; // added
import { loadUser } from '../actions/auth'; // added

class App extends Component {
  // added
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            {/* if you're using django, you need to go and update it in frontend/urls !!, or else you can't refresh   */}
            <PrivateRoute exact path='/' component={Dashboard} /> 
            <Route exact path='/delete/:id' component={TodoDelete} />
            <Route exact path='/edit/:id' component={TodoEdit} />
            <Route exact path='/login' component={LoginForm} /> 
            <Route exact path='/register' component={RegisterForm} /> 
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
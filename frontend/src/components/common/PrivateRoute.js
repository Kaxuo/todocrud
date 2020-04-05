// It is a good idea to redirect users who are not logged in to the login page when they visit the home page. Create a new folder named common in the components directory, and add a new file named PrivateRoute.js into it. And then write the code as follows: 
// mainly, this will show if the user is authneticated ( it willl show the dashboar,d wheere you can create and stuff)

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


// const myObj = {
//     name: 'John Doe',
//     age: 35,
//     sex: 'M',
//     dob: new Date(1990, 1, 1)
//   };
  
// const { name: Username, ...rest } = myObj

// console.log(Username);
// // => John Doe

// console.log(rest);
// // => { age: 35, sex: 'M', dob: Mon Jan 01 1990 00:00:00 GMT-0800 (PST) }

const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    <Route {...rest}
    render = {props => {
        if (auth.isLoading) {
            return <div> Loading ...</div>
        } else if (!auth.isAuthenticated) {
            return <Redirect to='/login' />
        } else {
            return <Component {...props} />
        }
    }}
    />
)

const mapStateToProps = state => ({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateRoute)
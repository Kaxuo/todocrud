import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { register } from '../../actions/auth';


class RegisterForm extends Component {
    renderField = ({input,label,type, meta:{touched, error}}) => {
        return (
            <div className={`field ${touched && error ? 'error' : ''}`}>
              <label>{label}</label>
              <input {...input} type={type} />
              {touched && error && (
                <span className='ui pointing red basic label'>{error}</span>
              )}
            </div>
          );
        };

    onSubmit = formValues => {
        this.props.register(formValues)
    }


render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />;
    }
    return (
      <div className='ui container'>
        <div className='ui segment'>
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className='ui form'
          >
            <Field
              name='username'
              type='text'
              component={this.renderField}
              label='Username'
              validate={[required, minLength3, maxLength15]}
            />
            <Field
              name='email'
              type='email'
              component={this.renderField}
              label='Email'
              validate={required}
            />
            <Field
              name='password'
              type='password'
              component={this.renderField}
              label='Password'
              validate={required}
            />
            <Field
              name='password2'
              type='password'
              component={this.renderField}
              label='Confirm Password'
              validate={[required, passwordsMatch]}
            />
            <button className='ui primary button'>Register</button>
          </form>
          <p style={{ marginTop: '1rem' }}>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

const required = value => (value ? undefined : "REQUIRED")

// const add = (x, y) => x + y
// add(2, 3) //=> 5

// const add = x => y => x + y
// const add = function (x) {
//     return function (y) {
//       return x + y
//     }
//   }
// const add = x => (y => x + y)
// add(2) // returns (y => 2 + y)
// add(2)(3)  // returns 5
// const add2 = add(2) // returns function(y) { return 2 + y }
// add2(3)             // returns 5
// => Currying functions

// HERE VALUE WOULD BE OF COURSE THE NUMBER OF LETTERS
const minLength = min => value => 
value && value.length < min && `Must be at least ${min} characters` 

const minLength3 = minLength(3)

const maxLength = max => value => value && value.length > max && `Must be ${max} characters or less` 

const maxLength15 = maxLength(15)
// Password matching can be defined as above using the allValues parameter.
const passwordsMatch = (value, allValues) => value !== allValues.password && 'Password do not match'

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

RegisterForm = connect(
  // WRITE BETTER 
    mapStateToProps, {register})(RegisterForm)

// form name is the same as in actions/auth/register
export default reduxForm({
    form :'registerForm'
})(RegisterForm)
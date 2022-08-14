import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { NavLink } from 'react-router-dom';
import picstagramLogo from "../../images/picstagram-logo.png";
import './SignUpForm.css';
import Footer from '../Footer';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(email, fullName, username, password, confirmPassword));
    if (data) {
      setErrors(data)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
    <div className="sign-up-page">
      <div className='signup-form-container'>
          <img id="logo-signup" src={picstagramLogo}></img>
          <div id="signup-message">Sign up to see photos from your friends.</div>
          <div className="signup-errors">
            {errors.map((error, ind) => (
              <li key={ind}>{error}</li>
            ))}
          </div>
          <form className='signup-form' onSubmit={onSignUp}>
              <div>
                <input
                  className="sign-up-input-field"
                  id='signup-inputs'
                  required
                  placeholder='Email'
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div>
                <input
                  className="sign-up-input-field"
                  id='signup-inputs'
                  required
                  placeholder='Full Name'
                  type='text'
                  name='fullName'
                  onChange={updateFullName}
                  value={fullName}
                ></input>
              </div>
              <div>
                <input
                  className="sign-up-input-field"
                  id='signup-inputs'
                  required
                  placeholder='Username'
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div>
                <input
                  className="sign-up-input-field"
                  id='signup-inputs'
                  required
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div>
                <input
                  className="sign-up-input-field"
                  id='signup-inputs'
                  placeholder='Confirm Password'
                  type='password'
                  name='confirm_password'
                  onChange={updateConfirmPassword}
                  value={confirmPassword}
                  required
                ></input>
              </div>
              <button id="signup-button" type='submit'>Sign Up</button>
          </form>
      </div>
      <div className="already-have-account">
        <span>Have an account?</span>
        <NavLink id="navlink-to-login"to='/log-in'>Log In</NavLink>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default SignUpForm;

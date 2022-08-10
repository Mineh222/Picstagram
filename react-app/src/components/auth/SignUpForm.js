import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { NavLink } from 'react-router-dom';

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
    // if (password === repeatPassword) {
    const data = await dispatch(signUp(email, fullName, username, password, confirmPassword));
    if (data) {
      setErrors(data)
    }
    // }
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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
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
          placeholder='Confirm Password'
          type='password'
          name='confirm_password'
          onChange={updateConfirmPassword}
          value={confirmPassword}
          required
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
      <NavLink to='/log-in'>
        <button>Log in</button>
      </NavLink>
    </form>
  );
};

export default SignUpForm;

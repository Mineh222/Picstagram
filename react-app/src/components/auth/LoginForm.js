import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoSubmit = (e) => {
    e.preventDefault();
    return dispatch(login('demo@aa.io', 'password'))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
          />
        </div>
        <div>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required
          />
          <button type='submit'>Log in</button>
        </div>
      </form>
      <NavLink to={'/sign-up'}>Sign Up</NavLink>
      <NavLink to='/' className='demo-link' onClick={demoSubmit}>Demo</NavLink>
    </>
  );
};

export default LoginForm;

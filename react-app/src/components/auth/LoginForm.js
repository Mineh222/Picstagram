import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import splashImage from '../../images/pictagram-spash.png';
import picstagramLogo from "../../images/picstagram-logo.png";
import './LoginForm.css';

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
    <div className='splash'>
      <div className='splash-left'>
          <img id="splash-image" src={splashImage} alt="splash-pic"></img>
      </div>
      <div className='splash-right'>
        <img id="logo-splash"src={picstagramLogo}></img>
        <form className={errors.length > 0 ? "login-form-errors" : "login-form"} onSubmit={onLogin}>
          <div className='login-errors'>
            {errors.map((error, ind) => (
              <li key={ind}>{error}</li>
            ))}
          </div>
            <input
              id={errors.length > 0 ? "login-input-email-errors" : "login-input-email"}
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              required
            />
            <input
              id={errors.length > 0 ? "login-input-password-errors" : "login-input-password"}
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              required
            />
            <button id={errors.length > 0 ? "login-button-errors" : "login-button"} type='submit'>Log in</button>
        </form>
        <div className={errors.length > 0 ? "splash-or-lines-errors" : "splash-or-lines"}>
                <div className={errors.length > 0 ? 'splash-or-indv-lines-errors' : 'splash-or-indv-line'}></div>
                <div className={errors.length > 0 ? 'splash-or-errors' : 'splash-or'}>OR</div>
                <div className={errors.length > 0 ? 'splash-or-indv-lines-errors' : 'splash-or-indv-line'}></div>
        </div>
        <NavLink to='/' className={errors.length > 0 ? 'demo-link-errors' : 'demo-link'} onClick={demoSubmit}>
          <div>Log in as a Demo User</div>
        </NavLink>
      </div>
    </div>
    <div className='already-have-account'>
      <span>Don't have an account?</span>
      <NavLink id="sign-up-link" to={'/sign-up'}>Sign Up</NavLink>
    </div>
    </>
  );
};

export default LoginForm;

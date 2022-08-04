import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      <ul>
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
        {sessionUser && (
          <NavLink to={`${sessionUser.username}`} exact={true}>
            Profile
          </NavLink>
        )}
        <LogoutButton />
      </ul>
    </nav>
  );
}

export default NavBar;

import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      <ul>
        {sessionUser && (
          <>
            <NavLink to={`/`} exact={true}>
              Home
            </NavLink>
            <NavLink to={`/explore/posts`} exact={true}>
              Explore
            </NavLink>
            <NavLink to='/post/new' exact={true}>
              New Post
            </NavLink>
            <NavLink to={`/${sessionUser.username}`} exact={true}>
              Profile
            </NavLink>
            <LogoutButton />
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

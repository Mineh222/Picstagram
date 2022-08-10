import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import SearchBar from './SearchBar';
import './NavBar.css'

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      {sessionUser && (
      <ul className='navbar'>
          <>
            <NavLink to={`/`} exact={true}>
              Home
            </NavLink>
            <div className='search-bar'>
              <SearchBar />
            </div>
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
      </ul>
      )}
    </nav>
  );
}

export default NavBar;

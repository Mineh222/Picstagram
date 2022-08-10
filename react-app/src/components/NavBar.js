import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import SearchBar from './SearchBar';
import HomeIcon from "@material-ui/icons/Home";
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import './NavBar.css'


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      {sessionUser && (
      <ul className='navbar'>
          <>
            <div className='search-bar'>
              <SearchBar />
            </div>
            <NavLink to={`/`} exact={true}>
              <HomeIcon />
            </NavLink>
            <NavLink to={`/explore/posts`} exact={true}>
              <ExploreOutlinedIcon />
            </NavLink>
            <NavLink to='/post/new' exact={true}>
              <AddBoxOutlinedIcon />
            </NavLink>
            <NavLink to={`/${sessionUser.username}`} exact={true}>
              <img id="nav_bar_profile_pic"src={sessionUser.profile_pic}></img>
            </NavLink>
            <LogoutButton />
          </>
      </ul>
      )}
    </nav>
  );
}

export default NavBar;

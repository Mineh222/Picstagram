import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import SearchBar from './SearchBar';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import './NavBar.css'
import ProfileButton from './ProfileButton';
import picstagramLogo from "../images/picstagram-logo.png";


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      {sessionUser && (
      <ul className='navbar'>
          <>
            <div>
              <NavLink to={`/`} exact={true}>
                <img className="picstagram-logo" src={picstagramLogo} alt='picstagram-logo'></img>
              </NavLink>
            </div>
            <div className='search-bar'>
              <SearchBar />
            </div>
            <div className='nav-bar-right'>
              <NavLink id="right-side-icon" to={`/`} exact={true}>
                <HomeOutlinedIcon />
              </NavLink>
              <NavLink id="right-side-icon" to='/post/new' exact={true}>
                <AddBoxOutlinedIcon />
              </NavLink>
              <NavLink id="right-side-icon" to={`/explore/posts`} exact={true}>
                <ExploreOutlinedIcon />
              </NavLink>
              <ProfileButton user={sessionUser}/>
            </div>
          </>
      </ul>
      )}
    </nav>
  );
}

export default NavBar;

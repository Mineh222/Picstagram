import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HomeIcon from '@material-ui/icons/Home';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import ExploreIcon from '@material-ui/icons/Explore';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import './NavBar.css'
import ProfileButton from './ProfileButton';
import picstagramLogo from "../images/picstagram-logo.png";
import Modal from 'react-modal';
import CreatePostForm from './CreatePostForm';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const [homeActive, setHomeActive] = useState(false);
  const [exploreActive, setExploreActive] = useState(false);
  const [createPostActive, setCreatePostActive] = useState(false);

  const currentLocation = useLocation();

  Modal.setAppElement('body');

  useEffect(() => {

    if (showCreatePostForm === false && currentLocation.pathname === "/") {
      setHomeActive(true);
      setExploreActive(false);
      setCreatePostActive(false)
    } else if (showCreatePostForm === false && currentLocation.pathname === "/explore/posts") {
      setHomeActive(false);
      setExploreActive(true);
      setCreatePostActive(false)
    } else if (showCreatePostForm === true) {
      setHomeActive(false);
      setExploreActive(false);
      setCreatePostActive(true);
    } else {
      setHomeActive(false);
      setExploreActive(false);
      setCreatePostActive(false);
    }
  })

  function openCreateFormModal() {
    setShowCreatePostForm(true)
  }

  function closeCreateFormModal() {
    setShowCreatePostForm(false)
  }

  const formStyles = {
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      minHeight: '100%',
      padding: '12px',
      zIndex: 6,
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '700px',
      height: '500px',
      width: 'auto',
      top: '50px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '10px',
      outline: 'none',
      paddingTop: '0px',
      paddingLeft: '0px',
      paddingBottom: '0px',
      paddingRight: '0px',
      overflow: 'visibile',
      zIndex: 4
    }
  };

  return (
    <nav className='nav-bar-container'>
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
                {homeActive ?
                  <HomeIcon />
                  :
                  <HomeOutlinedIcon />
                }
              </NavLink>
              <button className="create-post-btn" onClick={openCreateFormModal}>
                {createPostActive ?
                  <AddBoxIcon />
                  :
                  <AddBoxOutlinedIcon />
                }
              </button>
              <Modal isOpen={showCreatePostForm} style={formStyles}>
                  <button className="close_create_post_btn" onClick={closeCreateFormModal}>X</button>
                  <CreatePostForm closeCreateFormModal={closeCreateFormModal}/>
              </Modal>
              {/* <NavLink to='/post/new' exact={true}>
                <AddBoxOutlinedIcon />
              </NavLink> */}
              <NavLink id="right-side-icon" to={`/explore/posts`} exact={true}>
                {exploreActive ?
                  <ExploreIcon />
                  :
                  <ExploreOutlinedIcon />
                }
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

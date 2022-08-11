import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import './NavBar.css'
import ProfileButton from './ProfileButton';
import picstagramLogo from "../images/picstagram-logo.png";
import Modal from 'react-modal';
import CreatePostForm from './CreatePostForm';


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  Modal.setAppElement('body');

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
      padding: '30px 12px',
      zIndex: 6,
      backgroundColor: 'rgba(34, 34, 34, 0.65)'
    },
    content: {
      position: 'relative',
      margin: 'auto',
      maxWidth: '500px',
      width: '100%',
      top: '80px',
      left: '40px',
      right: '40px',
      bottom: '40px',
      border: '1px solid #ccc',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '10px',
      outline: 'none',
      padding: '18px',
      paddingTop: '5px',
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
                <HomeOutlinedIcon />
              </NavLink>
              <button className="create-post-btn" onClick={openCreateFormModal}>
                <AddBoxOutlinedIcon />
              </button>
              <Modal isOpen={showCreatePostForm} style={formStyles}>
                  <button className="close_create_post_btn" onClick={closeCreateFormModal}>X</button>
                  <CreatePostForm closeCreateFormModal={closeCreateFormModal}/>
              </Modal>
              {/* <NavLink to='/post/new' exact={true}>
                <AddBoxOutlinedIcon />
              </NavLink> */}
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

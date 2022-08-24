import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { thunkGetUserPosts } from '../../store/posts';
import { thunkGetUser } from '../../store/users';
import Follows from '../Follows';
import Modal from 'react-modal';
import FollowersModal from '../FollowersModal';
import FollowingModal from '../FollowingModal';
import './UserProfile.css';
import GridOnOutlinedIcon from '@material-ui/icons/GridOnOutlined';

export default function UserProfile() {
    const dispatch = useDispatch();
    const { username } = useParams();

    const posts = useSelector((state) => Object.values(state.posts));
    const sessionUser = useSelector((state) => state.session.user);
    const user = useSelector((state) => state.user[username]);

    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    useEffect(() => {
      dispatch(thunkGetUser(username))
      dispatch(thunkGetUserPosts(username))
  }, [dispatch, username])

    if (!user) {
      return null;
    }

    if (!posts) {
        return null;
    }

    function openFollowersModal() {
      setShowFollowers(true)
    }

    function openFollowingModal() {
      setShowFollowing(true)
    }

    const formStyles = {
      overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          minHeight: '100%',
          padding: '12px',
          backgroundColor: 'rgba(34, 34, 34, 0.65)'
      },
      content: {
          position: 'relative',
          margin: 'auto',
          maxWidth: '300px',
          height: '200px',
          width: '300px',
          top: '200px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          borderRadius: '5px',
          outline: 'none',
          padding: '0px',
          paddingTop: '5px',
          overflow: 'auto',
          overflowX: 'hidden',
      }
  };

  if (!user.followers) return null;

  if (!user.following) return null;

    return (
        <div className="user-profile-container">
          <div className="user_profile_info_container">
            <div className="user_profile_info_container2">
              <div>
                <img id="profile-page-propic"src={user.profile_pic}></img>
              </div>
              <div className='user-info-no-propic'>
                <div className="user-name-edit-follow-buttons">
                    <div id="profile-page-username">{user.username}</div>
                    <div id="edit-profile-button-container">
                      {sessionUser && sessionUser.username === username && (
                        <NavLink id="edit-profile-button" to={`/${sessionUser.username}/edit`}>Edit Profile</NavLink>
                      )}
                    </div>
                    <div>
                      {sessionUser && sessionUser.username != username && (
                        <Follows profileUsername={username}/>
                      )}
                    </div>
                </div>
                <div className="posts-followers-count">
                  {posts.length === 0 && (
                    <div className="post-count-profile-page">0 Posts</div>
                  )}
                  {posts.length === 1 && (
                    <div className="post-count-profile-page">1 Post</div>
                  )}
                  {posts.length > 1 && (
                    <div className="post-count-profile-page">{posts.length} Posts</div>
                  )}
                  {user.followers.length === 0 && (
                    <button id="follows-button"onClick={openFollowersModal}>0 Followers</button>
                  )}
                  {user.followers.length === 1 && (
                    <button id="follows-button"onClick={openFollowersModal}>1 Follower</button>
                  )}
                  {user.followers.length > 1 && (
                    <button id="follows-button" onClick={openFollowersModal}>{user.followers.length} Followers</button>
                  )}
                  <Modal isOpen={showFollowers} style={formStyles}>
                    <button id="close-follow-modal" onClick={() => setShowFollowers(false)}>X</button>
                    <FollowersModal user={user} setTrigger={setShowFollowers}/>
                  </Modal>
                  {user.following.length === 0 && (
                    <button id="follows-button" onClick={openFollowingModal}>0 Following</button>
                    )}
                  {user.following.length > 0 && (
                    <button id="follows-button" onClick={openFollowingModal}>{user.following.length} Following</button>
                    )}
                  <Modal isOpen={showFollowing} style={formStyles}>
                    <button id="close-follow-modal" onClick={() => setShowFollowing(false)}>X</button>
                    <FollowingModal user={user} setTrigger={setShowFollowing}/>
                  </Modal>
                </div>
                <div className="name-bio">
                  <div id="profile-page-fullname">{user.full_name}</div>
                  {user.bio && (
                    <div id="profile-page-bio">{user.bio}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div id="posts-header">
            <GridOnOutlinedIcon id="grid-icon"/>
            <h3 id="posts-h3">POSTS</h3>
          </div>
          <div id="no-posts-message">
            {posts.length === 0 && (
              <h3>No posts yet.</h3>
            )}
          </div>
          <div className="user-profile-posts">
            {posts.reverse().map(post => {
                return (
                    <div key={post.id}>
                        <NavLink to={`/post/${post.id}`}>
                          <img id="post-images-profile-page"src={post.picture}></img>
                        </NavLink>
                    </div>
                )
            })}
          </div>
        </div>
    )
}

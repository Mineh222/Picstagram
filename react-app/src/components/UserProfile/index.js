import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { thunkGetUserPosts } from '../../store/posts';
import { thunkGetUser } from '../../store/users';
import Follows from '../Follows';
import Modal from 'react-modal';
import FollowersModal from '../FollowersModal';
import FollowingModal from '../FollowingModal';

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
          maxWidth: '384px',
          width: '100%',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '24px',
          outline: 'none',
          padding: '18px',
          overflow: 'visibile'
      }
  };

  if (!user.followers) return null;

  if (!user.following) return null;

    return (
        <div>
          <div className="user_profile_info_container">
              <div>{user.username}</div>
              <img src={user.profile_pic}></img>
              {posts.length === 0 && (
                <div>0 Posts</div>
              )}
              {posts.length === 1 && (
                <div>1 Post</div>
              )}
              {posts.length > 1 && (
                <div>{posts.length} Posts</div>
              )}
              {user.followers.length === 0 && (
                 <button onClick={openFollowersModal}>0 Followers</button>
              )}
              {user.followers.length === 1 && (
                 <button onClick={openFollowersModal}>1 Follower</button>
              )}
              {user.followers.length > 1 && (
                <button onClick={openFollowersModal}>{user.followers.length} Followers</button>
              )}
              <Modal isOpen={showFollowers} style={formStyles}>
                <button onClick={() => setShowFollowers(false)}>X</button>
                <FollowersModal user={user} setTrigger={setShowFollowers}/>
              </Modal>
              {sessionUser && sessionUser.username === username && (
                <NavLink to={`/${sessionUser.username}/edit`}>Edit Profile</NavLink>
              )}
              {user.following.length === 0 && (
                <button onClick={openFollowingModal}>0 Following</button>
              )}
              {user.following.length > 0 && (
                <button onClick={openFollowingModal}>{user.following.length} Following</button>
              )}
              <Modal isOpen={showFollowing} style={formStyles}>
                <button onClick={() => setShowFollowing(false)}>X</button>
                <FollowingModal user={user} setTrigger={setShowFollowing}/>
              </Modal>
              <div>{user.full_name}</div>
              <div>{user.bio}</div>
              {sessionUser && sessionUser.username != username && (
                <Follows profileUsername={username}/>
              )}
          </div>
            {posts.reverse().map(post => {
                return (
                    <div key={post.id}>
                        <NavLink to={`/post/${post.id}`}>
                          <img src={post.picture}></img>
                          <div>{post.caption}</div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

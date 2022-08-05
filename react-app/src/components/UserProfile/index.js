import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { thunkGetUserPosts } from '../../store/posts';

export default function UserProfile() {
    const dispatch = useDispatch();
    const { username } = useParams();

    const posts = useSelector((state) => Object.values(state.posts));

    const [user, setUser] = useState({});

    useEffect(() => {
        dispatch(thunkGetUserPosts(username))
    }, [dispatch, username])

    useEffect(() => {
      if (!username) {
        return;
      }
      (async () => {
        const response = await fetch(`/api/users/profile/${username}`);
        const user = await response.json();
        setUser(user);
      })();
    }, [username]);

    if (!user) {
      return null;
    }

    if (!posts) {
        return null;
    }

    return (
        <div>
            <div>{user.username}</div>
            <div>{user.full_name}</div>
            <img src={user.profile_photo}></img>
            <div>{user.bio}</div>
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

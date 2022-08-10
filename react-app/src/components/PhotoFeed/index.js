import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkGetDemoPosts, thunkGetFeedPosts } from '../../store/posts';
import { thunkGetAllUsers } from '../../store/users';

export default function PhotoFeedPage() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => Object.values(state.posts));
    const user = useSelector((state) => state.session.user);
    const users = useSelector((state) => Object.values(state.user));
    console.log(users);

    useEffect(() => {
        if (user.following.length === 0) {
            dispatch(thunkGetDemoPosts())
        }
        if (user.following.length > 0) {
            dispatch(thunkGetFeedPosts(user.id))
        }
    }, [dispatch, user])


    useEffect(() => {
        dispatch(thunkGetAllUsers())
    }, [dispatch])

    return (
        <div>
            <div>
                <h3>Suggested Users:</h3>
                {users.slice(0,5).map(user => {
                    return (
                        <div key={user.id}>
                            <NavLink to={`/${user.username}`}>
                                <img src={user.profile_pic}></img>
                                <div>{user.username}</div>
                            </NavLink>
                        </div>
                    )
                })}
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

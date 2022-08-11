import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkGetDemoPosts, thunkGetFeedPosts } from '../../store/posts';
import { thunkGetAllUsers } from '../../store/users';
import './PhotoFeed.css';

export default function PhotoFeedPage() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => Object.values(state.posts));
    const user = useSelector((state) => state.session.user);
    const users = useSelector((state) => Object.values(state.user));

    const shuffledUsers = users.sort(() => Math.random() - 0.5)

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
        <div className='home-page-container'>
            <div>
                {posts.reverse().map(post => {
                    return (
                        <NavLink className="home-page-posts" key={post.id} to={`/post/${post.id}`}>
                            <div className="home-page-posts">
                                <img id="home-page-post-pic"src={post.picture}></img>
                                <div className="home-page-user-caption">
                                    <div id="home-page-username">{post.user.username}</div>
                                    <div id="home-page-caption">{post.caption}</div>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
            <div className="suggested-users">
                <h3 id="suggest-message">Suggestions For You</h3>
                {shuffledUsers.slice(0,5).map(user => {
                    return (
                        <div className="suggested-users-info"key={user.id}>
                            <NavLink className="suggested-users-info" to={`/${user.username}`}>
                                <img id="suggested-user-image"src={user.profile_pic}></img>
                                <div>{user.username}</div>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

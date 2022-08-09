import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { thunkGetDemoPosts, thunkGetFeedPosts } from '../../store/posts';

export default function PhotoFeedPage() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => Object.values(state.posts));
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        if (user.following.length === 0) {
            dispatch(thunkGetDemoPosts())
        }
        if (user.following.length > 0) {
            dispatch(thunkGetFeedPosts(user.id))
        }
    }, [dispatch, user])

    return (
        <div>
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

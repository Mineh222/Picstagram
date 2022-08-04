import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunkGetSinglePost } from '../../store/posts';
import { NavLink, useParams } from 'react-router-dom';

export default function SinglePost() {
    const dispatch = useDispatch();
    const { postId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const post = useSelector((state) => state.posts[postId]);
    console.log(post);

    useEffect(() => {
        dispatch(thunkGetSinglePost(postId))
    }, [dispatch, postId])

    if (!post) return null

    return (
        <div>
            <img src={post.user.profile_photo}></img>
            <div>{post.user.username}</div>
            <img src={post.picture}></img>
            <div>{post.caption}</div>
            {sessionUser.id == post.user_id && (
                <NavLink to={`/post/${postId}/edit`}>Edit</NavLink>
            )}
        </div>
    )
}

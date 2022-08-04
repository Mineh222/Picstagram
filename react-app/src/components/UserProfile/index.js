import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkGetUserPosts } from '../../store/posts';

export default function UserProfile() {
    const dispatch = useDispatch();
    const { username } = useParams();

    const posts = useSelector((state) => Object.values(state.posts));
    console.log(posts)

    useEffect(() => {
        dispatch(thunkGetUserPosts(username))
    }, [dispatch, username])

    return (
        <div>
            {posts.map(post => {
                return (
                    <div key={post.id}>
                        <img src={post.picture}></img>
                        <div>{post.caption}</div>
                    </div>
                )
            })}
        </div>
    )
}

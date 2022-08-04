import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { thunkGetExplorePosts } from '../../store/posts';

export default function ExplorePage() {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const posts = useSelector((state) => Object.values(state.posts));
    console.log(posts);

    const shuffledPosts = posts.sort(() => Math.random() - 0.5)

    useEffect(() => {
        dispatch(thunkGetExplorePosts(userId))
    }, [dispatch, userId])

    if (!posts) return null;

    return (
        <div>
            {shuffledPosts.map(post => {
                return (
                    <div key={post.id}>
                        <NavLink to={`/post/${post.id}`}>
                            <img src={post.picture}></img>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

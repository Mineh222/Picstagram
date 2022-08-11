import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom'
import { thunkGetExplorePosts } from '../../store/posts';
import './ExplorePage.css';

export default function ExplorePage() {
    const dispatch = useDispatch();

    const posts = useSelector((state) => Object.values(state.posts));
    const userId = useSelector((state) => state.session.user.id);

    const shuffledPosts = posts.sort(() => Math.random() - 0.5)

    useEffect(() => {
        dispatch(thunkGetExplorePosts(userId))
    }, [dispatch, userId])

    if (!posts) return null;

    return (
        <div className="explore-page-pics" >
            {shuffledPosts.map(post => {
                return (
                    <div className="explore-page-pics" key={post.id}>
                        <NavLink className="explore-page-pics" to={`/post/${post.id}`}>
                            <img id="explore-page-picture" src={post.picture} alt={post.caption}></img>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

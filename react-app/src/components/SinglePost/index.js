import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunkGetSinglePost, thunkDeletePost } from '../../store/posts';
import { thunkGetAllPostComments } from '../../store/comments';
import { NavLink, useParams, useHistory } from 'react-router-dom';

import Comments from '../Comments';
import CommentForm from '../CommentForm';

export default function SinglePost() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const post = useSelector((state) => state.posts[postId]);
    const comments = useSelector((state) => Object.values(state.comments));

    useEffect(() => {
        dispatch(thunkGetSinglePost(postId))
    }, [dispatch, postId])

    const onDelete = () => {
        dispatch(thunkDeletePost(postId))
        history.push(`/${sessionUser.username}`)
    }

    useEffect(() => {
        dispatch(thunkGetAllPostComments(postId))
    }, [dispatch, postId])

    if (!post) return null

    return (
        <div>
            <img src={post.user.profile_photo}></img>
            <div>{post.user.username}</div>
            <img src={post.picture}></img>
            <div>{post.caption}</div>
            {sessionUser.id == post.user_id && (
                <>
                    <NavLink to={`/post/${postId}/edit`}>Edit</NavLink>
                    <button onClick={onDelete}>Delete</button>
                </>
            )}
            <div >
              {comments.map((comment) => (
                <div key={comment.id}>
                  <Comments comment={comment}/>
                </div>
              ))}
            </div>
            <CommentForm />
        </div>
    )
}

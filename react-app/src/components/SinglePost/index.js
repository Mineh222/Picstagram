import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunkGetSinglePost, thunkDeletePost } from '../../store/posts';
import { thunkGetAllPostComments } from '../../store/comments';
import { NavLink, useParams, useHistory } from 'react-router-dom';

import Comments from '../Comments';
import CommentForm from '../CommentForm';
import Likes from '../Likes';

import './SinglePost.css';

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
            <img id="user_avator_single_post" src={post.user.profile_pic} alt="user_profile_pic"></img>
            <span>{post.user.username}</span>
            <div>
                <img src={post.picture}></img>
                <div>{post.caption}</div>
            </div>
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
            <div>
                {post.likes.length === 0 && (
                    <div></div>
                )}
                {post.likes.length === 1 && (
                    <span>{post.likes.length} like</span>
                )}
                {post.likes.length > 1 && (
                    <span>{post.likes.length} likes</span>
                )}
            </div>
            <div>
                <Likes sessionUser={sessionUser} post={post}/>
            </div>
            <div>
                <CommentForm />
            </div>
        </div>
    )
}

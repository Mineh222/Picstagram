import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { thunkGetSinglePost, thunkDeletePost } from '../../store/posts';
import { thunkGetAllPostComments } from '../../store/comments';
import { useParams, useHistory } from 'react-router-dom';

import Comments from '../Comments';
import CommentForm from '../CommentForm';
import Likes from '../Likes';

import './SinglePost.css';
import UpdatePostForm from '../UpdatePostForm';

export default function SinglePost() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams();

    const sessionUser = useSelector((state) => state.session.user);
    const post = useSelector((state) => state.posts[postId]);
    const comments = useSelector((state) => Object.values(state.comments));

    const [showUpdatePostForm, setShowUpdatePostForm ] = useState(false);

    useEffect(() => {
        dispatch(thunkGetSinglePost(postId))
    }, [dispatch, postId])

    const onDelete = async (e) => {
        await dispatch(thunkDeletePost(postId))
        history.push(`/${sessionUser.username}`)
    }

    useEffect(() => {
        dispatch(thunkGetAllPostComments(postId))
    }, [dispatch, postId])

    if (!post) return null

    return (
        <div className="single-post-container-main">
            <div className="post-page-left">
                    <img id="single-post-pic"src={post.picture}></img>
            </div>
            <div className="post-page-right">
                    <div className="main-post-user-info">
                        <img id="post-owner-user-pic" src={post.user.profile_pic}></img>
                        <span id="post-owner-username">{post.user.username}</span>
                        {!showUpdatePostForm ?
                            <>
                                {sessionUser.id == post.user_id && (
                                    <div id="post-buttons">
                                        <button id="edit-post-btn" onClick={() => setShowUpdatePostForm(true)}>Edit Post</button>
                                        <button id="delete-post-btn" onClick={onDelete}>Delete Post</button>
                                    </div>
                                )}
                            </>
                            :
                            < UpdatePostForm post={post} setTrigger={() => setShowUpdatePostForm(false)}/>
                        }
                    </div>
                    <div className="user-caption-container">
                        <img id="post-owner-user-pic2" src={post.user.profile_pic} alt="user_profile_pic"></img>
                        <span id="post-owner-username2">{post.user.username}</span>
                        <div id={post.caption.includes(" ") ? "caption-container" : "caption-container-long-string"}>
                            {!showUpdatePostForm && (
                                <div id="single-post-caption">{post.caption}</div>
                                )}
                        </div>
                    </div>
                    <div className="comments">
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <Comments comment={comment}/>
                            </div>
                        ))}
                    </div>
                    <div className="likes-container">
                        <div>
                            <Likes sessionUser={sessionUser} post={post}/>
                        </div>
                        <span>
                            {post.likes.length === 0 && (
                                <div></div>
                            )}
                            {post.likes.length === 1 && (
                                <span>{post.likes.length} like</span>
                            )}
                            {post.likes.length > 1 && (
                                <span>{post.likes.length} likes</span>
                            )}
                        </span>
                    </div>
                    <div className="comment-form">
                        <CommentForm />
                    </div>
            </div>
        </div>
    )
}

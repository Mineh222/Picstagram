import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import UpdateCommentForm from '../UpdateCommentForm';
import { thunkDeleteComment } from '../../store/comments';

export default function Comments({comment}) {
    const dispatch = useDispatch();

    const [showUpdateCommentForm, setShowUpdateCommentForm ] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const comments = useSelector((state) => Object.values(state.comments));

    if (!comments) return null;

    return (
        <div className="comment-details">
                {!showUpdateCommentForm ?
                    <>
                        <div className="comment-details">
                            <img id="comment-user-pic" src={comment.user.profile_pic}></img>
                            <div className='comment-username-text'>
                                <div id={comment.comment.includes(" ") ? 'comment-text-container' : 'user-comment-long-string'}>
                                    <div id="comment-username">{comment.user.username}</div>
                                    <div id="user-comment">{comment.comment}</div>
                                </div>
                            </div>
                        </div>
                        <div className="comment-details">
                            {(comment.user_id === sessionUser.id) && (
                                <div className="comment-btns">
                                    <button  id="post-edit-comment" onClick={() => setShowUpdateCommentForm(true)}>Edit</button>
                                    <button id="post-edit-comment" onClick={() => dispatch(thunkDeleteComment(comment.id))}>Delete</button>
                                </div>
                            )}
                        </div>
                    </>
                    :
                    <UpdateCommentForm comment={comment} setTrigger={() => setShowUpdateCommentForm(false)}/>
                }
        </div>
    )
}

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
        <div>
                {!showUpdateCommentForm ?
                    <>
                        <div>
                            <div id="comment-username">{comment.user.username}</div>
                            <span>{comment.comment}</span>
                        </div>
                        {(comment.user_id === sessionUser.id) && (
                            <>
                                <button  id="post-edit-comment" onClick={() => setShowUpdateCommentForm(true)}>Edit</button>
                                <button id="post-edit-comment" onClick={() => dispatch(thunkDeleteComment(comment.id))}>Delete</button>
                            </>
                        )}
                    </>
                    :
                    <UpdateCommentForm comment={comment} setTrigger={() => setShowUpdateCommentForm(false)}/>
                }
        </div>
    )
}

import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import EditCommentForm from '../UpdateCommentForm';
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
                        <div>{comment.user.username} {comment.comment}</div>
                        {(comment.user_id === sessionUser.id) && (
                            <>
                                <button onClick={() => setShowUpdateCommentForm(true)}>Edit</button>
                                <button onClick={() => dispatch(thunkDeleteComment(comment.id))}>Delete</button>
                            </>
                        )}
                    </>
                    :
                    <EditCommentForm comment={comment} setTrigger={() => setShowUpdateCommentForm(false)}/>
                }
        </div>
    )
}

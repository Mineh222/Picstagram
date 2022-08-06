import { useState } from 'react';
import { useSelector} from 'react-redux';
import EditCommentForm from '../UpdateCommentForm';

export default function Comments({comment}) {

    const [showUpdateCommentForm, setShowUpdateCommentForm ] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const comments = useSelector((state) => Object.values(state.comments));

    if (!comments) return null;

    return (
        <div>
            <div>{comment.user.username} {comment.comment}</div>
                {!showUpdateCommentForm ?
                    <>
                        {(comment.user_id === sessionUser.id) && (
                            <button onClick={() => setShowUpdateCommentForm(true)}>Edit</button>
                        )}
                    </>
                    :
                    <EditCommentForm comment={comment} setTrigger={() => setShowUpdateCommentForm(false)}/>
                }
        </div>
    )
}

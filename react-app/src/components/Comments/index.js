import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import UpdateCommentForm from '../UpdateCommentForm';
import { thunkDeleteComment } from '../../store/comments';
import Modal from 'react-modal';
import './Comments.css';

export default function Comments({comment}) {
    const dispatch = useDispatch();

    const [showUpdateCommentForm, setShowUpdateCommentForm ] = useState(false);

    const sessionUser = useSelector((state) => state.session.user);
    const comments = useSelector((state) => Object.values(state.comments));

    if (!comments) return null;

    function openEditCommentModal() {
        setShowUpdateCommentForm(true)
    }

    function closeEditCommentModal() {
        setShowUpdateCommentForm(false)
    }


    const formStyles3 = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            minHeight: '100%',
            padding: '12px',
            backgroundColor: 'rgba(34, 34, 34, 0.65)'
        },
        content: {
            position: 'relative',
            margin: 'auto',
            maxWidth: '300px',
            height: '220px',
            width: '100%',
            top: '200px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '12px',
            paddingLeft: '10px',
            paddingRight: '10px',
            padding: '0px',
            outline: 'none',
            overflow: 'visibile'
        }
    }

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
                                    <button  id="post-edit-comment" onClick={openEditCommentModal}>Edit</button>
                                    <button id="post-edit-comment" onClick={() => dispatch(thunkDeleteComment(comment.id))}>Delete</button>
                                </div>
                            )}
                        </div>
                    </>
                    :
                    <Modal isOpen={showUpdateCommentForm} style={formStyles3}>
                        {/* <button id="close-edit-comment" onClick={closeEditCommentModal}>X</button> */}
                        <UpdateCommentForm comment={comment} setTrigger={setShowUpdateCommentForm}/>
                    </Modal>
                }
        </div>
    )
}

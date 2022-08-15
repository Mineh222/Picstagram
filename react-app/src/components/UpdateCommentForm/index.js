import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateComment } from "../../store/comments";
import './UpdateCommentForm.css';

export default function UpdateCommentForm({comment, setTrigger}) {
    const dispatch = useDispatch();

    const commentId = comment.id

    const [updatedComment, setUpdatedComment] = useState(`${comment.comment}`);
    const [validationErrors, setValidationerrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        const whiteSpace = updatedComment.replace(/^>s+/, '').replace(/\s+$/, '')
        if( whiteSpace === '') errors.push('Please enter a valid comment.')
        if (updatedComment.length > 150) errors.push("Comment length cannot exceed 150 characters");
        setValidationerrors(errors);
    }, [updatedComment])

    const handleSubmit = (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length) return alert("Cannot edit comment. Please correct error(s).");

        const thunkComment = dispatch(thunkUpdateComment(commentId, updatedComment))

        if(thunkComment) {
            reset()
        }
    }

    const reset = () => {
        setUpdatedComment('');
        setHasSubmitted(false);
        setValidationerrors([]);
        setTrigger(false);
    }

    const closeModal = () => {
      setTrigger(false)
    }

    return (
      <div className="edit-comment-container">
        <div className="edit-comment-header-container">
          <button id="cancel-edit-comment" onClick={closeModal}>Cancel</button>
          <h3 id="edit-comment-header">Edit Comment</h3>
          <button id="post-edit-comment" type='submit' form="edit-comment-form">Done</button>
        </div>
        <div className="edit-comment-user-info">
          <img id="comment-user-pic" src={comment.user.profile_pic}></img>
          <div id="comment-username">{comment.user.username}</div>
        </div>
        <form id="edit-comment-form" onSubmit={handleSubmit}>
            {hasSubmitted && validationErrors.length > 0 && (
              <div className="errorHandling">
                <ul className="errors-comments">
                  {validationErrors.map((error) => (
                    <li key={error} id="error">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <textarea
                rows='3'
                id="edit-comment-box"
                required
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
            ></textarea>
        </form>
      </div>
    )
}

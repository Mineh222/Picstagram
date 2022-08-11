import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkUpdateComment } from "../../store/comments";

export default function UpdateCommentForm({comment, setTrigger}) {
    const dispatch = useDispatch();

    const commentId = comment.id

    const [updatedComment, setUpdatedComment] = useState(`${comment.comment}`);
    const [validationErrors, setValidationerrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        if (updatedComment.length > 150) errors.push("Comment length cannot exceed 150 characters");
        setValidationerrors(errors);
    }, [updatedComment])

    const handleSubmit = (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length) return alert("Cannot edit comment. Please correct error.");

        const thunkComment = dispatch(thunkUpdateComment(commentId, updatedComment))

        if(thunkComment) {
            reset()
        }
    }

    const reset = () => {
        setUpdatedComment('');
        setHasSubmitted(false);
        setValidationerrors([]);
        setTrigger();
    }

    return (
        <form className="edit-comment-container" onSubmit={handleSubmit}>
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
                className={validationErrors.length > 0 ? "update-comment-box-errors" : "update-comment-box"}
                required
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
            ></textarea>
            <button id="post-edit-comment" type='submit'>Edit</button>
            <button id="cancel-edit-comment" onClick={setTrigger}>Cancel</button>
        </form>
    )
}

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkUpdateComment } from "../../store/comments";

export default function UpdateCommentForm({comment, setTrigger}) {
    const dispatch = useDispatch();
    const { postId } = useParams();

    const sessionUser = useSelector((state) => state.session.user)
    const commentId = comment.id

    const [updatedComment, setUpdatedComment] = useState(`${comment.comment}`);
    const [validationErrors, setValidationerrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        if (updatedComment.length < 1) errors.push("Comment must be at least 1 character.");
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
        setTrigger();
    }

    return (
        <form onSubmit={handleSubmit}>
            {hasSubmitted && validationErrors.length > 0 && (
              <div className="errorHandling">
                <div className="errorTitle">
                  Please fix the following error(s) before posting:
                </div>
                <ul className="errors">
                  {validationErrors.map((error) => (
                    <li key={error} id="error">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <textarea
                required
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
            ></textarea>
            <button type='submit'>Post</button>
            <button onClick={setTrigger}>Cancel</button>
        </form>
    )
}

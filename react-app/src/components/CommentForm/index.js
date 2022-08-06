import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkPostComment } from "../../store/comments";

export default function CommentForm() {
    const dispatch = useDispatch();
    const { postId } = useParams();

    const sessionUser = useSelector((state) => state.session.user)

    const [comment, setComment] = useState('');
    const [validationErrors, setValidationerrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        if (comment.length < 1) errors.push("Comment must be at least 1 character.");
        if (comment.length > 150) errors.push("Comment length cannot exceed 150 characters");
        setValidationerrors(errors);
    }, [comment])

    const handleSubmit = (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        // if (validationErrors.length) return alert("Cannot submit comment")

        const payload = {
            user_id: sessionUser.id,
            post_id: postId,
            comment
        }

        const newComment = dispatch(thunkPostComment(postId, payload))

        if(newComment) {
            reset()
        }
    }

    const reset = () => {
        setComment('');
        setHasSubmitted(false);
        setValidationerrors([]);
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
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button type='submit'>Post</button>
        </form>
    )
}

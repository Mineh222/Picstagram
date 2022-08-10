import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkPostComment } from "../../store/comments";
import './CommentForm.css'

export default function CommentForm() {
    const dispatch = useDispatch();
    const { postId } = useParams();

    const sessionUser = useSelector((state) => state.session.user)

    const [comment, setComment] = useState('');
    const [validationErrors, setValidationerrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        if (comment.length < 5) errors.push("Comment must be at least 5 characters.");
        if (comment.length > 150) errors.push("Comment length cannot exceed 150 characters");
        setValidationerrors(errors);
    }, [comment])

    const handleSubmit = (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length) return alert("Cannot submit comment. Please correct error.")

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
                <ul className="errors">
                  {validationErrors.map((error) => (
                    <div key={error} id="error">
                      {error}
                    </div>
                  ))}
                </ul>
              </div>
            )}
              <textarea
                  required
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength='150'
              ></textarea>
            <button type='submit'>Post</button>
        </form>
    )
}

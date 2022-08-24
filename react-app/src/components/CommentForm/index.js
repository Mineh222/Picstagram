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
        const whiteSpace = comment.replace(/^>s+/, '').replace(/\s+$/, '')
        if( whiteSpace === '') errors.push('Please enter a valid comment.')
        if (comment.length > 150) errors.push("Comment length cannot exceed 150 characters");
        setValidationerrors(errors);
    }, [comment])

    const handleSubmit = (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length) return alert("Cannot submit comment. Please correct error(s).")

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

    const commentBoxStyle = {
      height: '35px',
    }

    return (
      <div className="comment-form-with-errors">
        {hasSubmitted && validationErrors.length > 0 && (
          <div className="errorHandling-comments">
            <ul className="errors-comments">
              {validationErrors.map((error) => (
                <li key={error} id="error">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        <form className="comment-form"onSubmit={handleSubmit}>
              <textarea
                  style={commentBoxStyle}
                  id="comment-box"
                  required
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
              ></textarea>
            <button id="post-comment-btn" type='submit'>Post</button>
        </form>

      </div>
    )
}

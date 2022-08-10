import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { thunkUpdatePost, thunkGetSinglePost } from '../../store/posts';

export default function UpdatePostForm({post, setTrigger}) {
    const history = useHistory()
    const dispatch = useDispatch()

    const [caption, setCaption] = useState(`${post.caption}`);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        if (caption.length > 150) {
            errors.push("Caption length cannot exceed 150 characters.")
        }
        setValidationErrors(errors)
    }, [caption])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        // if (validationErrors.length) return alert("Cannot edit post. Please correct error.");

        const updatedPost = await dispatch(thunkUpdatePost(post.id, caption))

        if (updatedPost) {
            reset();
        }
    }

    const reset = () => {
        setCaption('');
        setHasSubmitted(false);
        setValidationErrors([]);
        setTrigger();
    }

    if (!post) return null

    return (
        <div>
          <img src={post.picture}></img>
          <form onSubmit={handleSubmit}>
              {hasSubmitted && validationErrors.length > 0 && (
                <div className="errorHandling">
                  <ul className='errors'>
                    {validationErrors.map((error) => (
                      <div key={error} id="error">
                      {error}
                      </div>
                    ))}
                  </ul>
                </div>
              )}
              <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
              ></textarea>
              <button type="submit">Edit</button>
              <button onClick={setTrigger}>Cancel</button>
          </form>

        </div>
    )
}

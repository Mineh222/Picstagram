import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { thunkUpdatePost, thunkGetSinglePost } from '../../store/posts';
import './UpdatePostForm.css';

export default function UpdatePostForm({post, setTriggerUpdatePost, setTriggerEditDeleteModal}) {
    const history = useHistory()
    const dispatch = useDispatch()

    const [caption, setCaption] = useState(`${post.caption}`);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        const whiteSpace = caption.replace(/^>s+/, '').replace(/\s+$/, '')
        if( whiteSpace === '') errors.push('Please enter a valid caption.')
        if (caption.length > 150) {
            errors.push("Caption length cannot exceed 150 characters.")
        }
        setValidationErrors(errors)
    }, [caption])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (validationErrors.length) return alert("Cannot edit post. Please correct error.");

        const updatedPost = await dispatch(thunkUpdatePost(post.id, caption))

        if (updatedPost) {
            reset();
        }
    }

    const reset = () => {
        setCaption('');
        setHasSubmitted(false);
        setValidationErrors([]);
        setTriggerUpdatePost(false);
        setTriggerEditDeleteModal(false);
    }

    const closeModals = () => {
      setTriggerUpdatePost(false);
      setTriggerEditDeleteModal(false);
    }

    if (!post) return null

    return (
      <div className="update-post-form-container">
          <div id="edit-post-header-container">
              <button id="cancel-edit-post" onClick={closeModals}>Cancel</button>
              <h3 id="edit-form-header">Edit Info</h3>
              <button id="done-edit-post" type="submit" form="edit-post-form">Done</button>
          </div>
          <div className="update-post-form-container2">
            <div id="edit-post-picture-container">
              <img id="edit-post-picture" src={post.picture}></img>
            </div>
            <div className="edit-form-form-container">
              <div id="user-info-edit-form">
                <img id="edit-post-user-propic" src={post.user.profile_pic}></img>
                <div id="edit-post-username">{post.user.username}</div>
              </div>
              <form id="edit-post-form" onSubmit={handleSubmit}>
                  {hasSubmitted && validationErrors.length > 0 && (
                    <div className="errorHandling">
                      <ul className='errors-edit-post'>
                        {validationErrors.map((error) => (
                          <li key={error} id="error">
                          {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <textarea
                      id="edit-post-input2"
                      placeholder='Optional'
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                  ></textarea>
                  <div className="edit-comment-btns">
                  </div>
              </form>

            </div>
          </div>
      </div>
    )
}

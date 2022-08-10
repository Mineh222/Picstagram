import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkCreatePost } from "../../store/posts";
import './CreatePostForm.css'


export default function CreatePostForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [picture, setPicture] = useState(null);
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const username = useSelector((state) => state.session.user.username);

    let validationErrors = [];

    useEffect(() => {
        if (picture === null) validationErrors.push("Please upload a photo from your computer.")
        setErrors(validationErrors)
    }, [picture])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        const formData = new FormData();
        formData.append("picture", picture);
        formData.append('caption', caption);

        const newPost = await dispatch(thunkCreatePost(formData))

        if (newPost) {
            reset();
            history.push(`/${username}`)
        }
    }

    const reset = () => {
        setPicture(null);
        setCaption('');
    }

    const updatePicture = (e) => {
        const file = e.target.files[0];
        if (!file?.name.includes("jpg") && !file?.name.includes("jpeg") && !file?.name.includes("png")) {
            validationErrors.push("Please provide a proper image (e.g., .jpg, .jpeg, .png)")
        }
        if (validationErrors.length) {
            setErrors(validationErrors)
        }

        setPicture(file);
    }

    const updateCaption = (e) => {
        const caption = e.target.value;
        if (caption.length > 150) {
            validationErrors.push("Caption length cannot exceed 150 characters.")
        }
        if (validationErrors.length) {
            setErrors(validationErrors)
        }
        setCaption(caption);
    }

    return (
        <form onSubmit={handleSubmit}>
            {hasSubmitted && errors.length > 0 && (
              <div className="errorHandling">
                <div className="errorTitle">
                  Please fix the following error(s) before submitting:
                </div>
                <ul className='errors'>
                  {errors.map((error) => (
                    <div key={error} id="error">
                    {error}
                    </div>
                  ))}
                </ul>
              </div>
            )}
            <label className="upload_photo_label" htmlFor="upload_post_photo">Select from computer</label>
            <input
              type="file"
              accept="image/*"
              onChange={updatePicture}
              id="upload_post_photo"
              className="upload_post_photo_input"
            />
            <label>Caption:</label>
            <textarea
                placeholder="Optional"
                type="text"
                name="caption"
                onChange={updateCaption}
                value={caption}
            ></textarea>
            <button type="submit">Submit</button>
        </form>
    )
}

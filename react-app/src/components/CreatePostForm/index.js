import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkCreatePost } from "../../store/posts";
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import './CreatePostForm.css'


export default function CreatePostForm({closeCreateFormModal}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [picture, setPicture] = useState(null);
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const username = useSelector((state) => state.session.user.username);

    // console.log(picture)
    // console.log(picture.type);


    useEffect(() => {
        const validationErrors = [];
        // const whiteSpace = caption.replace(/^>s+/, '').replace(/\s+$/, '')
        // if( whiteSpace === '') validationErrors.push('Please enter a valid caption.')
        if (!picture?.type.includes('png') && !picture?.type.includes('jpg') && !picture?.type.includes('jpeg')) {
            validationErrors.push("Image type must be a png, jpg, or jpeg file.")
        }
        if (picture === null) validationErrors.push("Please upload a photo from your computer.")
        if (caption.length > 150) validationErrors.push("Caption cannot exceed 150 characters.")
        setErrors(validationErrors)
    }, [picture, caption])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (errors.length) return alert("Cannot post picture. Please try again.");

        const formData = new FormData();
        formData.append("picture", picture);
        formData.append('caption', caption);

        const newPost = await dispatch(thunkCreatePost(formData))

        if (newPost) {
            // reset();
            closeCreateFormModal();
            history.push(`/${username}`);
        }
    }

    // const reset = () => {
    //     setPicture(null);
    //     setCaption('');
    // }

    const updatePicture = (e) => {
        const file = e.target.files[0];
        setPicture(file);
    }

    const updateCaption = (e) => {
        const caption = e.target.value;
        setCaption(caption);
    }

    const buttonStyles = {
        fontSize: "xxx-large",
    }

    return (
        <>
            <h3 id="create-post-heading">Create new post</h3>
            <div className="create-post-container">
                <div id="photo-icon">
                    <InsertPhotoOutlinedIcon style={buttonStyles}/>
                </div>
                <form className="create-post-form" onSubmit={handleSubmit}>
                    {hasSubmitted && errors.length > 0 && (
                    <div className="errorHandling">
                        <div className="errorTitle">
                        Please fix the following error(s) before submitting:
                        </div>
                        <ul className='errors'>
                        {errors.map((error) => (
                            <li key={error} id="error">
                            {error}
                            </li>
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
                    <div className="create-caption-input">
                        <label id="caption-label-create">Caption:</label>
                        <textarea
                            placeholder="Optional"
                            type="text"
                            name="caption"
                            onChange={updateCaption}
                            value={caption}
                        ></textarea>
                    </div>
                    <button id="create-post-btn"type="submit">Submit</button>
                </form>

            </div>
        </>
    )
}

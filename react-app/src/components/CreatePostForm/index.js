import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkCreatePost } from "../../store/posts";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './CreatePostForm.css'


export default function CreatePostForm({closeCreateFormModal}) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [picture, setPicture] = useState(null);
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [pictureURL, setpictureURL] = useState('');
    const [page, setPage] = useState(0);


    const user = useSelector((state) => state.session.user);

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
            history.push(`/${user.username}`);
        }
    }

    // const reset = () => {
    //     setPicture(null);
    //     setCaption('');
    // }

    const updatePicture = (e) => {
        const file = e.target.files[0];
        setPicture(file);
        setpictureURL(URL.createObjectURL(file))
        setPage(1);
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
            {page === 1 && (
                <div className="create-post-caption-page-headers">
                    <button
                        type='button'
                        onClick={() => setPage(page - 1)}
                        id="create-post-back-button"
                    >
                        <ArrowBackIcon/>
                    </button>
                    <h3 id="create-post-heading2">Create new post</h3>
                    <button id="create-post-share-btn" type="submit" form="create-post-form">Share</button>
                </div>
            )}
            {page === 0 && (
                <div id="create-post-heading-container">
                    <h3 id="create-post-heading">Create new post</h3>
                </div>
            )}
            <div className="create-post-container">
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
                <form id="create-post-form" onSubmit={handleSubmit}>
                {page === 0 && (
                    <div className="upload-photo-page-container">
                        <div id="photo-icon">
                            <svg aria-label="Icon to represent media such as images or videos" class="_ab6-" color="#262626" fill="#262626" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
                        </div>
                        <label className="upload_photo_label" htmlFor="upload_post_photo">Select from computer</label>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={updatePicture}
                        id="upload_post_photo"
                        className="upload_post_photo_input"
                        />
                    </div>
                )}
                {page === 1 && (
                    <div className="update-post-form-container2">
                        <div id="edit-post-picture-container">
                            <img id="edit-post-picture" src={pictureURL}></img>
                        </div>
                        <div className="edit-form-form-container">
                            <div id="user-info-edit-form">
                                <img id="edit-post-user-propic" src={user.profile_pic}></img>
                                <div id="edit-post-username">{user.username}</div>
                            </div>
                            <div>
                                {/* <label id="caption-label-create">Caption:</label> */}
                                <textarea
                                    rows='3'
                                    cols='25'
                                    id="edit-post-input2"
                                    placeholder="Write a caption..."
                                    type="text"
                                    name="caption"
                                    onChange={updateCaption}
                                    value={caption}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )}
                </form>
            </div>
        </>
    )
}

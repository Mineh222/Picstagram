import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkUploadProfilePic } from "../../store/session";
import './UserProfilePic.css';

export default function UploadProfilePic({hideForm}) {
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.session.user.id);

    const [profile_pic, setProfilePic] = useState(null);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const validationErrors = [];
        if (!profile_pic?.type.includes('png') && !profile_pic?.type.includes('jpg') && !profile_pic?.type.includes('jpeg')) {
            validationErrors.push("Image type must be a png, jpg, or jpeg file.")
        }
        setErrors(validationErrors)
    }, [profile_pic])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (errors.length) return alert("Cannot update profile picture. Please try again.");

        const formData = new FormData();
        formData.append('profile_pic', profile_pic);

        const newProfilePic = await dispatch(thunkUploadProfilePic(userId, formData));

        if (newProfilePic) {
            hideForm()
        }

    }

    const updatedProfilePic = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
    }

    return (
            <form onSubmit={handleSubmit}>
                <div className="upload-photo-container">
                    <label className="choose_pro_pic_label" htmlFor="choose_pro_pic">Upload Photo</label>
                    {hasSubmitted && errors.length > 0 && (
                        <div className="errorHandling-edit-propic">
                            {/* <div className="errorTitle">
                            Please fix the following error before submitting:
                            </div> */}
                            {errors.map((error) => (
                                <li key={error} id="error">
                                {error}
                                </li>
                            ))}
                        </div>
                    )}
                    <div>
                        <input
                            className="no-file-chosen"
                            id="choose_pro_pic"
                            type="file"
                            accept="image/*"
                            onChange={updatedProfilePic}
                        ></input>
                    </div>
                    <button id="edit-profile-upload-btn" type="submit">Submit</button>
                </div>
            </form>
    )
}

import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkUploadProfilePic, setUser} from "../../store/session";

export default function UploadProfilePic({hideForm}) {
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.session.user.id);

    const [profile_pic, setProfilePic] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            <label>Choose Profile Picture</label>
            <input
                type="file"
                accept="image/*"
                onChange={updatedProfilePic}
            ></input>
            <button type="submit">Upload</button>
        </form>
    )
}
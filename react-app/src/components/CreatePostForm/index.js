import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { thunkCreatePost } from "../../store/posts";


export default function CreatePostForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [picture, setPicture] = useState(null);
    const [caption, setCaption] = useState('');

    const username = useSelector((state) => state.session.user.username);


    const handleSubmit = async (e) => {
        e.preventDefault();
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
        setPicture(file);
    }

    const updateCaption = (e) => {
        const caption = e.target.value;
        setCaption(caption);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>*Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={updatePicture}
            />
            <label>Caption:</label>
            <input
                placeholder="Optional"
                type="text"
                name="caption"
                onChange={updateCaption}
                value={caption}
            ></input>
            <button type="submit">Submit</button>
        </form>
    )
}

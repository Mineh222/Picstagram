import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom';
import { thunkUpdateUserProfile } from "../../store/session";
import { thunkGetAllUsers } from '../../store/users';
import UploadProfilePic from "../UserProfilePic";
import './UpdateUserProfileForm.css';

export default function UpdateUserProfileForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const users = useSelector((state) => Object.values(state.user));

    const usernames = users.map(user => user.username);
    const filteredUsernames = usernames.filter(username => username != user.username);

    const [fullName, setFullName] = useState(user.full_name);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user?.bio);
    const [updatePic, setUpdatePic] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(thunkGetAllUsers())
    }, [dispatch])

    useEffect(() => {
        const errors = [];
        if (filteredUsernames.includes(username)) errors.push("Username already exists");
        if (username.length > 20) errors.push("Username cannot exceed 20 characters")
        if (fullName.length > 40) errors.push("Name cannot exceed 40 characters.");
        if (bio?.length > 150) errors.push("Bio cannot exceed 150 characters");
        setValidationErrors(errors)
    }, [username, fullName, bio])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        if (validationErrors.length) return alert("Cannot update profile. Please try again.");

        const updatedProfile = await dispatch(thunkUpdateUserProfile(user.id, fullName, username, bio))

        if (updatedProfile) {
            history.push(`/${username}`)
        }
    }

    return (
        <div className="editProfileContainer">
            <div className="edit-profile-border">
                <div className="edit-profile-user-info">
                    <img className="edit_user_propic" src={user.profile_pic} alt="user_profile_picture"></img>
                    <div className="change-pro-pic">
                        <div id="edit-profile-usrname">{user.username}</div>
                        <div>
                            {!updatePic ?
                                <button id="change-propic-btn" onClick={() => setUpdatePic(true)}>Change Profile Picture</button>
                                : <UploadProfilePic hideForm={() => setUpdatePic(false)} />
                            }
                        </div>
                    </div>
                </div>
                <form className="update-profile-form" onSubmit={handleSubmit}>
                    {hasSubmitted && validationErrors.length > 0 && (
                    <div className="errorHandling-edit-profile">
                        <div className="errorTitle">
                        Please fix the following error(s) before submitting:
                        </div>
                        <ul className='errors'>
                        {validationErrors.map((error) => (
                            <li key={error} id="error">
                            {error}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
                    <div id="edit-profile-name-input">
                        <label id="edit-profile-label">Name</label>
                        <input
                            id="edit-profile-name-input2"
                            type="text"
                            placeholder="Name"
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                            required
                        ></input>
                    </div>
                    <div id="edit-profile-username-label">
                        <label id="edit-profile-label">Username</label>
                        <input
                            id="edit-profile-username-input"
                            type="text"
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        ></input>
                    </div>
                    <div id="edit-profile-bio-input">
                        <label id="edit-profile-label">Bio</label>
                        <textarea
                            id="edit-profile-bio-textarea"
                            rows="5"
                            cols="35"
                            type="bio"
                            placeholder="Optional Bio"
                            onChange={(e) => setBio(e.target.value)}
                            value={bio ? bio: ''}
                        ></textarea>
                    </div>
                    <div id="edit-profile-submit-cancel-btns">
                        <button id="edit-profile-buttons" type="submit">Submit</button>
                        <NavLink to={`/${user.username}`}>
                            <button id="edit-profile-buttons">Cancel</button>
                        </NavLink>
                    </div>
                </form>

            </div>
        </div>
    )
}

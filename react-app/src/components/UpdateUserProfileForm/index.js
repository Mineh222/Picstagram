import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom';
import { thunkUpdateUserProfile } from "../../store/session";
import UploadProfilePic from "../UserProfilePic";

export default function UpdateUserProfileForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    const [fullName, setFullName] = useState(user.full_name);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [updatePic, setUpdatePic] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);

        const updatedProfile = await dispatch(thunkUpdateUserProfile(user.id, fullName, username, bio))

        if (updatedProfile) {
            history.push(`/${username}`)
        }
    }

    return (
        <div className="editProfileContainer">
            <img className="edit_user_propic" src={user.profile_pic} alt="user_profile_picture"></img>
            <div>
                {!updatePic ?
                    <button onClick={() => setUpdatePic(true)}>Change Profile Picture</button>
                    : <UploadProfilePic hideForm={() => setUpdatePic(false)} />
                }
            </div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    required
                ></input>
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                ></input>
                <label>Bio</label>
                <textarea
                    type="bio"
                    placeholder="Optional Bio"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio ? bio: ''}
                ></textarea>
                <button type="submit">Done</button>
                <NavLink to={`/${user.username}`}>
                    <button>Cancel</button>
                </NavLink>
            </form>
        </div>
    )
}

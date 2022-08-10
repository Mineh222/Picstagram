import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from 'react-router-dom';
import { thunkUpdateUserProfile } from "../../store/session";
import { thunkGetAllUsers } from '../../store/users';
import UploadProfilePic from "../UserProfilePic";

export default function UpdateUserProfileForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const users = useSelector((state) => Object.values(state.user));

    const usernames = users.map(user => user.username);
    const filteredUsernames = usernames.filter(username => username != user.username);

    const [fullName, setFullName] = useState(user.full_name);
    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [updatePic, setUpdatePic] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        dispatch(thunkGetAllUsers())
    }, [dispatch])

    useEffect(() => {
        const errors = [];
        if (filteredUsernames.includes(username)) errors.push("Username already exists");
        if (fullName.length > 100) errors.push("Name cannot exceed 100 characters.");
        if (bio.length > 150) errors.push("Bio cannot exceed 150 characters");
        setValidationErrors(errors)
    }, [username, fullName, bio])

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
                {hasSubmitted && validationErrors.length > 0 && (
                  <div className="errorHandling">
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

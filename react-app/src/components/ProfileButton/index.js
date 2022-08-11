import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import { logout } from '../../store/session';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import './ProfileButton.css';

function ProfileButton({user}) {
    const dispatch = useDispatch();
    const history = useHistory('');

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu)

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const onLogout = async (e) => {
        await dispatch(logout());
    };

    return (
        <div>
            <button className="profile-icon-button" onClick={openMenu}>
                <img id="nav_bar_profile_pic" src={user.profile_pic}></img>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>
                        <NavLink id="nav-to-profile" to={`/${user.username}`} exact={true}>
                            <div className="profile-option">
                                <AccountCircleOutlinedIcon />
                                <span id="profile-label">Profile</span>
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <div id="logout-button">
                            <button id="logout-button2"onClick={onLogout}>Log Out</button>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    )


}


export default ProfileButton;

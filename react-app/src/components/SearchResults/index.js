import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { thunkGetSearchedUsers } from '../../store/users';
import './SearchResults.css';

export default function SearchResults() {
    const dispatch = useDispatch();
    const { searchword } = useParams();

    const users = useSelector(state => Object.values(state.user));

    useEffect(() => {
        dispatch(thunkGetSearchedUsers(searchword))
    }, [dispatch, searchword])

    return (
        <div className='searched-users-container'>
            {users.length === 0 ?
                <h2>No users found.</h2>
                :
                <h3 id="search-word">Result(s) for "{searchword}"</h3>
            }
            <div>
                {users && users.map(user => {
                    return (
                        <div className="user-info-search-page"key={user.id}>
                            <Link className="user-info-search-page" to={`/${user.username}`}>
                                <img id="search-page-user-pic" src={user.profile_pic} alt="profilePic"></img>
                                <div id="user-names-search-page">
                                    <p id="username-search-page">{user.username}</p>
                                    <p>{user.full_name}</p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

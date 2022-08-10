import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { thunkGetSearchedUsers } from '../../store/users';

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
                <h3>{searchword}</h3>
            }
            <div>
                {users && users.map(user => {
                    return (
                        <div key={user.id}>
                            <Link to={`/${user.username}`}>
                                <img src={user.profile_pic} alt="profilePic"></img>
                                <p>{user.username}</p>
                                <p>{user.full_name}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

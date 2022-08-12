import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {Link, useHistory} from 'react-router-dom';
import { thunkSearchAllUsers } from "../../store/search";
import './SearchBar.css'

const SearchBar = () => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [wordEntry, setWordEntry] = useState("");
    // const [errors, setErrors] = useState([]);

    const users = useSelector(state => Object.values(state.search));

    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        dispatch(thunkSearchAllUsers());
    }, [dispatch])

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntry(searchWord);
        const newFilter = users.filter((user) => {
            return user.username.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredUsers([])
        } else {
            setFilteredUsers(newFilter)
        }
    }

    const clearInput = () => {
        setFilteredUsers([]);
        setWordEntry('');
        history.push(`/search/${wordEntry}`)
    }

    const cancelSearch = () => {
        setFilteredUsers([]);
        setWordEntry("")
    }

    if (!users) return null;

    return (
        <div className="search">
            <form className="search-inputs">
                <input required type="text" placeholder="Search for users!" value={wordEntry} onChange={handleFilter}></input>
                <div className="searchIcon">
                    {wordEntry.length === 0 ?
                        <button className="search-icon-button">
                            <SearchIcon id="search-icon" />
                        </button>
                        :
                        <>
                            <CloseIcon id="close-button" onClick={cancelSearch}/>
                            <button className="search-icon-button" type="submit" onClick={clearInput}>
                                <SearchIcon id="search-icon" onClick={clearInput}/>
                            </button>
                        </>
                    }
                </div>
            </form>
            {filteredUsers.length !== 0 && (
                <div className="users-results">
                    {filteredUsers.map((user) => {
                        return (
                            <Link key={user.id} className="searched-user" to={`/${user.username}`} onClick={clearInput}>
                                <img id="search-bar-profile-pic" src={user.profile_pic}></img>
                                <div id="search-bar-username">{user.username}</div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar;

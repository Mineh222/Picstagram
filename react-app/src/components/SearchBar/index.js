import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {Link, useHistory} from 'react-router-dom';
import { thunkSearchAllUsers } from "../../store/search";
import './SearchBar.css'
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";

const SearchBar = () => {
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [wordEntry, setWordEntry] = useState("");
    const [active, setActive] = useState(false);

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

    const isActive = () => {
        setActive(true)
    }

    useEffect(() => {
        const closeSearch = (e) => {
          if(e.path[0].tagName !== "INPUT"){
            setFilteredUsers([])
            setWordEntry('')
            setActive(false)
          }
        }
        document.addEventListener("click", closeSearch)
        return () => document.removeEventListener("click", closeSearch)
    })



    if (!users) return null;

    return (
        <div className="search">
            <form className="search-inputs">
                <div className="searchIcon">
                    {active === false && (
                        <SearchIcon id="search-icon" />
                    )}
                </div>
                <input className="search-input-field" onClick={isActive} type="text" placeholder="Search" value={wordEntry} onChange={handleFilter}></input>
                <div className="searchIcon">
                    {active === true && (
                        <CloseIcon id="close-icon" onClick={cancelSearch}/>
                    )}
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

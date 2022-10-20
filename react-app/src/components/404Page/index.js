import React from 'react';
import './404Page.css';
import { NavLink } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className="not_found_container">
            <h2 id="not_found_header">Sorry, this page isn't available.</h2>
            <div id="not_found_messagge">
                The link you followed may be broken, or the page may have been removed.
                <NavLink id="not_found_redirect" to="/"> Go back to Picstagram.</NavLink>
            </div>
        </div>
    )
}

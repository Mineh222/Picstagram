import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div className='footer'>
            <div className="footer-content">
                <img id="mineh-pic"alt='pic-of-dev' src="https://i.postimg.cc/q7p9bWSp/100002251.jpg"></img>
                <p>Created by Mineh Gharabegi</p>
                <a id="about-links" target="_blank" href='https://github.com/Mineh222'><i className="fa-brands fa-square-github fa-2x"></i></a>
                <a id="about-links" target="_blank" href='https://www.linkedin.com/in/mineh-gharabegi-98696b241/'><i className="fa-brands fa-linkedin fa-2x"></i></a>
            </div>
        </div>
    )
}

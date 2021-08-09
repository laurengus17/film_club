import React from 'react';
import './Footer.css';

function Footer(){

return (
<div className='footer-container'>
    <div className='footer-left'>
        <li>
            <a className='personal_link' href="https://github.com/laurengus17">
                <i className="fab fa-github-square fa-2x" /> 
            </a>
        </li>
        <li>
            <a className='personal_link' href="https://www.linkedin.com/in/lauren-gustafson-7b8877b3/">
                <i className="fab fa-linkedin fa-2x" /> 
            </a>
        </li>
        <li className='project_repo'>
            <a className='project_link' href="https://github.com/laurengus17/film_club">
                <span className='text'>Project Repo </span>
            </a>
        </li>
    </div>
    <div className='footer-right'>
        <li className='my-name'>
            Created By: Lauren Gustafson
        </li>
    </div>
</div>
);
}

export default Footer;
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
const sessionUser = useSelector(state => state.session.user);

let sessionLinks;
if (sessionUser) {
    sessionLinks = (
    <ProfileButton user={sessionUser} />
    );
} else {
    sessionLinks = (
    <>
        <li>
        <NavLink className='signup' to="/signup">Sign Up</NavLink>
        </li>
        <li>
        <LoginFormModal className='login' />
        </li>
    </>
    );
}

return (
<div className='outer-navigation'>
    <nav>
        <ul className='navigation'>
            <li>
                <NavLink className='home' exact to="/">Home</NavLink>
            </li>
                {isLoaded && sessionLinks}
        </ul>
    </nav>
</div>
);
}

export default Navigation;
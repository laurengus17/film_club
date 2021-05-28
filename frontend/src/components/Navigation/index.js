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
    <>
    <div className='bar'>
    <NavLink className='user-page' to='/users'>Profile</NavLink>
    </div>
    <div className='bar'>
    <ProfileButton user={sessionUser} />
    </div>
    </>
    );
} else {
    sessionLinks = (
    <>
        <div className='bar'>
        <NavLink className='signup' to="/signup">Sign Up</NavLink>
        </div>
        <div className='bar'>
        <LoginFormModal className='login' />
        </div>
    </>
    );
}

return (
<div className='outer-navigation'>
    <nav>
        <ul className='navigation'>
            <div className='bar'>
                <NavLink className='home' exact to="/">Home</NavLink>
            </div>
                {isLoaded && sessionLinks}
        </ul>
    </nav>
</div>
);
}

export default Navigation;
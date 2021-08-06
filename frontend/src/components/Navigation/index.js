import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpFormModal from '../SignupFormPage';
import { loginDemo } from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
const sessionUser = useSelector(state => state.session.user);
const history = useHistory();
const dispatch = useDispatch();

const handleHome = () => {
history.push('/')
}

const handleAlbums = () => {
history.push(`/users/${sessionUser.id}`)
}


const demoLogin = () => {
    dispatch(loginDemo('Demo-McDemo', 'password'))
}

let sessionLinks;
if (sessionUser) {
    sessionLinks = (
    <>
    <div className='bar'>
        <button className='album_button' onClick={handleAlbums}>{sessionUser.username}'s Albums</button>
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
        <SignUpFormModal className='signup'/>
        </div>
        <div className='bar'>
        <LoginFormModal className='login' />
        </div>
        <div>
            <button className='demo_user' onClick={demoLogin}>Demo User</button>
        </div>
    </>
    );
}

return (
<div className='outer-navigation'>
    <nav className='navbar_container'>
        <ul className='navigation'>
            <div className='bar'>
                <button className='home_button' onClick={handleHome}>Home</button>
            </div>
                {isLoaded && sessionLinks}
        </ul>
    </nav>
</div>
);
}

export default Navigation;
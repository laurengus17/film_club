import React from 'react';
import './HomePageLanding.css';


function UserDisplay({ user }) {

return (
        <div className='user-profiles-div'>
            <li key={user.id}>
            <h2 className='user-usernames'>{user.username}</h2>
            <img src={user.profileImageUrl} alt='profile' className='profile-image' />
            </li>
        </div>
)}

export default UserDisplay;
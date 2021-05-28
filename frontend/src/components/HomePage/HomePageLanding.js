import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../store/photo';
import { getAlbums } from '../../store/album';
import { getUsers } from '../../store/session';
import './HomePageLanding.css';


function HomePageLanding() {
const dispatch = useDispatch();
const users = useSelector(state => state.session.list.map((id) => state.session[id]));
// const users = Object.values(userState);
const photoState = useSelector(state => state.photos);
const photos = Object.values(photoState);
const albumState = useSelector(state => state.albums);
const albums = Object.values(albumState);

useEffect(() => {
dispatch(getAlbums())
dispatch(getPhotos())
dispatch(getUsers())
}, [dispatch]);

return (
    <div>
    <h2 className='welcome'>Welcome to the Club</h2>
    <h3 className='meet-users'>Meet Our Users</h3>
    <div className='home-outer-div'>
        {users.map((user) => {
        if(user) {
            return (
                <div className='user-profiles-div'>
                    <li key={user.id}>
                    <h2 className='user-usernames'>{user.username}</h2>
                    <img src={user.profileImageUrl} alt='profile' className='profile-image' />
                    </li>
                </div>
            )
        }
        return []
        })}
    </div>
    </div>
)
}

export default HomePageLanding;
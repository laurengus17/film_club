import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../store/photo';
import { getAlbums } from '../../store/album';
import { getUsers } from '../../store/session';
import './HomePageLanding.css';


function HomePageLanding() {
const dispatch = useDispatch();
const userState = useSelector(state => state.session);
const users = Object.values(userState);
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
    <h2>Welcome to the Club</h2>
    <h3>Meet Our Users</h3>
    <div>
        {users.map((user) => {
        if(user) {
            return (
                <div>
                    <li key={user.id}>
                    <h2>{user.username}</h2>
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
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
console.log(users, 'THIS IS USERSSS')

useEffect(() => {
dispatch(getAlbums())
dispatch(getPhotos())
dispatch(getUsers())
}, [dispatch]);

return (
    <div>
    <h2>HI YOU ARE HOME</h2>
    <div>
        {users.map((user) => {
        if(user) {
            return (
                <div>
                    <h2>{user.username}</h2>
                    <img src={user.profileImageUrl} alt='profile' />
                </div>
            )
        }
        })}
    </div>
    </div>
)
}

export default HomePageLanding;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../store/session';
import UserDisplay from './UserDisplay';
import './HomePageLanding.css';


function HomePageLanding() {
const dispatch = useDispatch();
const users = useSelector(state => state.session.list.map((id) => state.session[id]));

useEffect(() => {
    dispatch(getUsers())
}, [dispatch]);

return (
    <>
    <h2 className='welcome'>Welcome to the Club</h2>
    <h3 className='meet-users'>Meet Our Users</h3>
    <div className='home-outer-div'>
        {users.map((user) => 
            <UserDisplay user={user} />
        )}
    </div>
    </>
)
}

export default HomePageLanding;
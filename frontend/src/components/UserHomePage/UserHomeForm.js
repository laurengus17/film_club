import React, { useEffect, useState } from 'react';
import { getAlbums, updateAlbum, deleteAlbum } from '../../store/album';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserHomePage.css';

function UserHomePage ({album}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const albumState = useSelector(state => state.albums);
    const albums = Object.values(albumState);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch]);

    const handleSubmit = async (id) => {
        const payload = {
            ...albums,
            title,
            description,
            userId: sessionUser.id
        }

        let updatedAlbum = await dispatch(updateAlbum(payload, id))
        if (updatedAlbum) {
            history.push(`/users`);
        }
    }


    const handleDelete = async (id) => {
        dispatch(deleteAlbum(id));
    }

    return (
    <div>
        <div> 
            <form onSubmit={() => handleSubmit(album.id)} className='edit-form'>
                <div className='edit-div'>
                <input 
                className='input'
                placeholder={album.title}
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required> 
                </input>
                <input
                className='input'
                placeholder={album.description}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required>
                </input>
                </div>
                <div>
                <button type='submit' className='update-button'>Update Album</button>
                </div>
                <div>
                <button className='delete-submit' onClick={() => handleDelete(albums.id)}>Delete</button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default UserHomePage;
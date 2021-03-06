import React, { useEffect, useState } from 'react';
import { getAlbums, updateAlbum, deleteAlbum } from '../../store/album';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './UserHomePage.css';

function UserHomePage ({ album }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId }  = useParams();
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
            history.push(`/users/${userId}`);
        }
    }


    const handleDelete = async (id) => {
        dispatch(deleteAlbum(id));
    }

    return (
    <div className='edit-album-outer'>
        <div className='edit-album-structure'> 
            <form onSubmit={() => handleSubmit(album.id)} className='edit-form'>
                <h2 className='edit-album-title'>Edit Album</h2>
                <div className='edit-div'>
                <input 
                className='input'
                placeholder={album.title}
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}> 
                </input>
                <input
                className='input'
                placeholder={album.description}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}>
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
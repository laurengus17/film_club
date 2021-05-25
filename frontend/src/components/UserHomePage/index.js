import React, { useEffect, useState } from 'react';
import { getAlbums, updateAlbum, deleteAlbum } from '../../store/album';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserHomePage.css';
import * as albumActions from "../../store/album";

function UserHomePage () {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const currentUserId = sessionUser.id
    const albumState = useSelector(state => state.albums);
    const albums = Object.values(albumState);
    console.log(albums)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    const openEdit = () => {
        if(showEdit) return;
        setShowEdit(true);
    }

    useEffect(() => {
    if (!showEdit) return;

    const closeEdit = () => {
    setShowEdit(false);
    };

    document.addEventListener('click', closeEdit);

    return () => document.removeEventListener("click", closeEdit);
    }, [showEdit]);


    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...albums,
            title,
            description,
            userId: sessionUser.id
        }

        let updatedAlbum = await dispatch(updateAlbum(payload, albums.id))
        console.log(updatedAlbum)
        if (updatedAlbum) {
            history.push(`/users`);
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/users`);
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(deleteAlbum(albums));
    }

    return (
        <div>
            {albums.map((album) => {
                if (album.userId === currentUserId) {
                    return (
                    <div>
                    <li key={album.id} album={album}>
                        <h2>{album.title}</h2>
                        <p>{album.description}</p>
                    </li>
                    <div>
                    <button onClick={openEdit} className='edit-button'>Edit
                    </button>
                    <button onClick={handleDelete}>Delete</button>
                    {showEdit && (
                        <div>
                            <form onSubmit={handleSubmit} className='edit-dropdown'>
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
                            <button type='submit'>Update Album</button>
                            <button type='button' onClick={handleCancelClick}>Cancel</button>
                            </form>
                        </div>
                    )}
                    </div>
                    </div>
                    )
                }
                return [];
            })}
        </div>
    )

}

export default UserHomePage;
import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import UserHomePage from './UserHomeForm';

function SeparateAlbum({ album }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const albumState = useSelector(state => state.albums);
    const albums = Object.values(albumState);
    const [active, setActive] = useState(false);

    useEffect(() => {
    dispatch(getAlbums())
    }, [dispatch]);


    const handleRoute = () => {
        history.push(`/api/photo/create/${album.id}`)
    }
    return (
        <div>
                    <li key={album.id} album={album} className='albums-list'>
                        <h2>{album.title}</h2>
                        <p>{album.description}</p>
                        <button onClick={() => setActive(true)} className='edit-album-button'>Edit Album</button>
                        <button onClick={handleRoute} className='add-photo-button'>Add Photo</button>
                        {active && (
                            <Modal onClose={() => setActive(false)}>
                                <UserHomePage album={album}/>
                            </Modal>
                        )}
                    </li>
        </div>
    )
}

export default SeparateAlbum;
import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import UserHomePage from './UserHomeForm';

function SeparateAlbum({ album }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [active, setActive] = useState(false);

    useEffect(() => {
    dispatch(getAlbums())
    }, [dispatch]);

    const handleRoute = () => {
        history.push('/api/photo')
    }
    return (
        <div>
                    <li key={album.id} album={album}>
                        <h2>{album.title}</h2>
                        <p>{album.description}</p>
                        <button onClick={() => setActive(true)}>Edit Album</button>
                        <button onClick={handleRoute}>Add Photo</button>
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
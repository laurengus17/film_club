import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { getAlbums } from '../../store/album';
import UserHomePage from './UserHomeForm';

function SeparateAlbum({ album }) {
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);

    useEffect(() => {
    dispatch(getAlbums())
}, [dispatch]);

    return (
        <div>
                    <li key={album.id} album={album}>
                        <h2>{album.title}</h2>
                        <p>{album.description}</p>
                        <button onClick={() => setActive(true)}>Edit Album</button>
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
import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import UserHomePage from './UserHomeForm';
import { getPhotos } from '../../store/photo';

function SeparateAlbum({ album }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const photoState = useSelector(state => state.photos);
    const photos = Object.values(photoState);
    const [active, setActive] = useState(false);

    const myImage = () => {
        const albumPhotos = photos.filter((photo) => photo?.albumId === album.id)
                if(albumPhotos) {
                    return (
                        <div>
                        <img src={albumPhotos[0]?.url} alt='user-post' />
                        </div>
                    )
                }
    }


    useEffect(() => {
    dispatch(getAlbums())
    dispatch(getPhotos())
    }, [dispatch]);


    const handleRoute = () => {
        history.push(`/api/photo/create/${album.id}`)
    }
    return (
        <div>
                    <li key={album.id} album={album} className='albums-list'>
                        <h2>{album.title}</h2>
                        <p>{album.description}</p>
                        {myImage}
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
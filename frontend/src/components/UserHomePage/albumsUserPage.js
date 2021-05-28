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
                    <img src={albumPhotos[0]?.url} alt='user-post' className='album-thumbnail'/>
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

    const albumRoute = () => {
        history.push(`/content/${album.id}`)
    }
    return (
        <div className='albums-list-outer'>
                    <li key={album.id} album={album} className='albums-list'>
                        <div className='album-specific-div'>
                        <h2 className='user-album-title'>{album.title}</h2>
                        <p className='user-album-description'>{album.description}</p>
                        <button onClick={() => setActive(true)} className='edit-album-button'>Edit</button>
                        <div className='hold-thumbnail'>{myImage()}</div>
                        <button onClick={albumRoute} className='specific-album-button'>{album.title}</button>
                        <button onClick={handleRoute} className='add-photo-button'>Add Photo</button>
                        </div>
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
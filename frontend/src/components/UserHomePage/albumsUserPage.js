import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import UserHomePage from './UserHomeForm';
import { getPhotos } from '../../store/photo';
import AddPhotoAlbumModal from '../PhotoForm/AddPhotoAlbumModal';
import './UserHomePage.css';

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


    const albumRoute = () => {
        history.push(`/content/${album.id}`)
    }
    return (
        <div className='albums-list-outer'>
                        <h2 className='user-album-title'>{album.title}</h2>
                        <p className='user-album-description'>{album.description}</p>
                        <button onClick={() => setActive(true)} className='edit-album-button'>Edit</button>
                        <div className='hold-thumbnail'>{myImage()}</div>
                        <button onClick={albumRoute} className='specific-album-button'>{album.title}</button>
                        <AddPhotoAlbumModal albumId={album.id} />
                        {active && (
                            <Modal onClose={() => setActive(false)}>
                                <UserHomePage album={album}/>
                            </Modal>
                        )}
        </div>
    )
}

export default SeparateAlbum;
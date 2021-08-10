import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import { getPhotos } from '../../store/photo'
import SeparateAlbum from './albumsUserPage';
import CreateAlbumModal from '../AlbumFormPage/CreateAlbumModal';
import './UserHomePage.css';

function EditAlbumModal() {
const dispatch = useDispatch();
const history = useHistory();
const albumState = useSelector(state => state.albums);
const photoState = useSelector(state => state.photos);
const sessionUser = useSelector(state => state.session.user);
const albums = Object.values(albumState);
const photos = Object.values(photoState);
const currentUserId = sessionUser.id

useEffect(() => {
    dispatch(getAlbums())
    dispatch(getPhotos())
}, [dispatch]);


return ( <> { photoState &&
    <>
    <h2 className='profile-welcome'>Oh hey there, {sessionUser.username}</h2>
    <div className='create-album-div'>
        <CreateAlbumModal />
    </div>
    <div className='album-list-outer-div'>
    {albums.map((album) => {
        if (album.userId === currentUserId) {
            return (
                <SeparateAlbum album={album} />
            )
        }
        return [];
    })}
    </div>
    </>
} 
    </> 
);
}

export default EditAlbumModal;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import { getPhotos } from '../../store/photo'
import SeparateAlbum from './albumsUserPage';
import CreateAlbumModal from '../AlbumFormPage/CreateAlbumModal';
import './UserHomePage.css';

function EditAlbumModal() {
const dispatch = useDispatch();
const albumState = useSelector(state => state.albums);
const photoState = useSelector(state => state.photos);
const albums = Object.values(albumState);

const [user, setUser] = useState({});
const { userId }  = useParams();

useEffect(() => {
    if (!userId) {
        return;
    }

    (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        setUser(user);
    })();

    dispatch(getAlbums())
    dispatch(getPhotos())

    }, [dispatch, userId]);

    if (!user) {
        return null;
    }


return ( <> { photoState &&
    <>
    <h2 className='profile-welcome'>Oh hey there, {user.username}</h2>
    <div className='create-album-div'>
        <CreateAlbumModal />
    </div>
    <div className='album-list-outer-div'>
    {albums.map((album) => {
        if (album.userId === user.id) {
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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../../store/album';
import { getPhotos } from '../../store/photo'
import SeparateAlbum from './albumsUserPage';

function EditAlbumModal() {
const dispatch = useDispatch();
const albumState = useSelector(state => state.albums);
const photoState = useSelector(state => state.photos);
const sessionUser = useSelector(state => state.session.user);
const albums = Object.values(albumState);
// const photos = Object.values(photoState);
const currentUserId = sessionUser.id

// const userPhotos = photos.filter((photo) => photo.userId === currentUserId)
// console.log(userPhotos)

useEffect(() => {
    dispatch(getAlbums())
    dispatch(getPhotos())
}, [dispatch]);

return ( <> { photoState &&
    <>
    <div>
    {albums.map((album) => {
        if (album.userId === currentUserId) {
            return (
                <SeparateAlbum album={album}/>
            )
        }
        return [];
    })}
    </div>
    </>
} </> );
}

export default EditAlbumModal;
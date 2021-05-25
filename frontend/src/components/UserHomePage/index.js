import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../../store/album';
import SeparateAlbum from './albumsUserPage';

function EditAlbumModal() {
const dispatch = useDispatch();
const albumState = useSelector(state => state.albums);
const sessionUser = useSelector(state => state.session.user);
const albums = Object.values(albumState);
const currentUserId = sessionUser.id

useEffect(() => {
    dispatch(getAlbums())
}, [dispatch]);

return (
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
);
}

export default EditAlbumModal;
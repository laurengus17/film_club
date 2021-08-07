import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import { getPhotos } from '../../store/photo';
import AddPhotoModal from '../PhotoForm/AddPhotoModal';
import './UserAlbums.css';

function UserAlbumContent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams()
    const photoState = useSelector(state => state.photos);
    const photos = Object.values(photoState);
    const albumState = useSelector(state => state.albums);
    const albums = Object.values(albumState);

    useEffect(() => {
    dispatch(getAlbums())
    dispatch(getPhotos())
    }, [dispatch]);

    const albumIdInteger = parseInt(albumId, 10)

    const currentAlbum = albums.filter((album) => album.id === albumIdInteger)
    console.log('CURRENT ALBUM', currentAlbum)
    const myAlbum = () => {
        const albumPhotos = photos.filter((photo) => photo.albumId === albumIdInteger)
            if(albumPhotos) {
                return (
                    <>
                        {albumPhotos?.map((photo) => {
                            return (
                                <div className='image-div'>
                                    <img src={photo?.url} alt='user-posts' className='album-content'/>
                                    <button className='specific-photo-button' onClick={() => history.push(`/display/${photo?.id}`)}>{photo?.title}</button>
                                </div>
                            )
                        })}
                    </>
                )
            }
    }

    return (
        <>
        <h2 className='album-page'>My Album</h2>
        <div className='add-photo'>
                <AddPhotoModal albumId={albumId} />
        </div>
        <div className='album-outer-div'>
            {myAlbum()}
        </div>
        </>
    )
}

export default UserAlbumContent;
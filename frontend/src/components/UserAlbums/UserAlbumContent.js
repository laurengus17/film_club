import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import { getPhotos } from '../../store/photo';
import './UserAlbums.css';

function UserAlbumContent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams()
    const photoState = useSelector(state => state.photos);
    const photos = Object.values(photoState);

    useEffect(() => {
    dispatch(getAlbums())
    dispatch(getPhotos())
    }, [dispatch]);

    const albumIdInteger = parseInt(albumId, 10)

    const myAlbum = () => {
        const albumPhotos = photos.filter((photo) => photo.albumId === albumIdInteger)
            if(albumPhotos) {
                return (
                    <div>
                    <li key={albumId} className='photos-list'>
                        {albumPhotos?.map((photo) => {
                            return (
                                <div className='image-div'>
                                <img src={photo?.url} alt='user-posts' className='album-content'/>
                                <button onClick={() => history.push(`/display/${photo?.id}`)}>{photo?.title}</button>
                                </div>
                            )
                        })}
                    </li>
                    </div>
                )
            }
    }

    const handleRoute = () => {
        history.push(`/api/photo/create/${albumId}`)
    }

    return (
        <div>
            <h2>My Album</h2>
            <div>
                {myAlbum()}
            </div>
            <div>
                <button onClick={handleRoute} className='add-photo-button'>Add Photo</button>
            </div>
        </div>
    )
}

export default UserAlbumContent;
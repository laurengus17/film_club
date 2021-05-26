import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPhotos } from '../../store/photo';
import UpdatePhotoForm from './UpdatePhotoForm';

function PhotosUserPage({ photo }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const photoState = useSelector(state => state.photos);
    const photos = Object.values(photoState);
    const [active, setActive] = useState(false);

    useEffect(() => {
    dispatch(getPhotos())
    }, [dispatch]);

    return (
        <div>
            <li key={photo.id} photo={photo} className='photos-list'>
                        <h2>{photo.title}</h2>
                        <p>{photo.description}</p>
                        <img src={photo.url} alt='user-posts' />
                        <button onClick={() => setActive(true)} className='edit-album-button'>Edit Photo</button>
                        {active && (
                            <Modal onClose={() => setActive(false)}>
                                <UpdatePhotoForm photo={photo} />
                            </Modal>
                        )}
                    </li>
        </div>
    )
}

export default PhotosUserPage;
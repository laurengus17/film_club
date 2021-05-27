import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import { getPhotos, deletePhoto } from '../../store/photo';
import UpdatePhotoForm from './UpdatePhotoForm';
import './PhotoDisplay.css';

function PhotoPage() {
const dispatch = useDispatch();
const history = useHistory();
const { photoId } = useParams();
const photoState = useSelector(state => state.photos);
const photos = Object.values(photoState);

const [active, setActive] = useState(false);

useEffect(() => {
dispatch(getAlbums())
dispatch(getPhotos())
}, [dispatch]);

const handleDelete = async (id) => {
    dispatch(deletePhoto(id));
    history.push(`/users`)
}

const photoIdInteger = parseInt(photoId, 10)

const myPhoto = () => {
    const pagePhoto = photos.filter((photo) => photo.id === photoIdInteger)
    if(pagePhoto.length) {
        return (
            <div>
                <h2>{pagePhoto[0].title}</h2>
            <div>
                <img src={pagePhoto[0].url} alt='my-display' className='specific-photo'/>
            </div>
                <p>{pagePhoto[0].description}</p>
            <div>
                <button onClick={() => setActive(true)}>Edit</button>
            </div>
            <div>
                <button onClick={() => handleDelete(pagePhoto[0].id)}>Delete</button>
            </div>
            {active && (
            <Modal onClose={() => setActive(false)}>
                <UpdatePhotoForm photo={pagePhoto[0]}/>
            </Modal>
            )}
            </div>
        )
    }
}

return (
    <div>
        {myPhoto()}
    </div>
)

}

export default PhotoPage;
import React, { useEffect, useState } from 'react';
import { getPhotos, updatePhoto, deletePhoto } from '../../store/photo';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './PhotoForm.css';

function UpdatePhotoForm ({ photo }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const photoState = useSelector(state => state.photos);
    const photos = Object.values(photoState);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch]);

    const handleSubmit = async (id) => {
        const payload = {
            ...photos,
            title,
            description,
        }

        let updatedPhoto = await dispatch(updatePhoto(payload, id))
        if (updatedPhoto) {
            history.push(`/users`);
        }
    }

    const handleDelete = async (id) => {
    dispatch(deletePhoto(id));
    }

    return (
        <div>
        <div> 
            <form onSubmit={() => handleSubmit(photo.id)} className='edit-form'>
                <div className='edit-div'>
                <input 
                className='input'
                placeholder={photo.title}
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required> 
                </input>
                <input
                className='input'
                placeholder={photo.description}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required>
                </input>
                </div>
            </form>
        </div>
        <div>
            <button type='submit' className='update-button'>Update Album</button>
        </div>
        <div>
        <button className='delete-submit' onClick={() => handleDelete(photos.id)}>Delete</button>
        </div>
    </div>
    )
}

export default UpdatePhotoForm;
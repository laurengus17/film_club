import React, { useEffect, useState } from 'react';
import { getPhotos, updatePhoto} from '../../store/photo';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './PhotoForm.css';

function UpdatePhotoForm ({ photo }) {
const dispatch = useDispatch();
const history = useHistory();
const photoState = useSelector(state => state.photos);
const photos = Object.values(photoState);

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');

useEffect(() => {
    dispatch(getPhotos())
}, [dispatch]);

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('AFTER PREVENT DEFAULT')
    const payload = {
        ...photos,
        id: photo.id,
        title,
        description,
    }

    let updatedPhoto = await dispatch(updatePhoto(payload))
    if(updatedPhoto) {
        // history.push(`/display/${photo.id}`);
        window.location.reload();
    }
}

return (
    <div>
    <div> 
        <form onSubmit={handleSubmit} className='edit-form'>
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
            <div>
            <button type='submit' className='update-button'>Update Photo</button>
            </div>
        </form>
    </div>
</div>
)
}

export default UpdatePhotoForm;
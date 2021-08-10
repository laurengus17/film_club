import React, { useEffect, useState } from 'react';
import { getPhotos, updatePhoto} from '../../store/photo';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UpdatePhotoForm.css';

function UpdatePhotoForm ({ photo }) {
const dispatch = useDispatch();
const history = useHistory();
const photoState = useSelector(state => state.photos);
const photos = Object.values(photoState);

const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [errors, setErrors] = useState([]);

useEffect(() => {
    dispatch(getPhotos())
}, [dispatch]);

const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className='update-outer-div'>
        <div className='update-body'> 
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <h2 className='update-h2'>Update Photo</h2>
                <div className='update-div'>
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
                <button type='submit' className='update-button'>Update Photo</button>
            </form>
        </div>
    </div>
)
}

export default UpdatePhotoForm;
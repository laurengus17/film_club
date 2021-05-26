import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import { getPhotos, createPhoto } from '../../store/photo';
import './PhotoForm.css';

function PhotoForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { albumId } = useParams()
    const sessionUser = useSelector(state => state.session.user);

    const [url, setUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
    dispatch(getAlbums())
    }, [dispatch]);

    useEffect(() => {
    dispatch(getPhotos())
    }, [dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            url,
            userId: sessionUser.id,
            albumId,
        }

        let createdPhoto = await dispatch(createPhoto(payload))
        if (createdPhoto) {
            history.push(`/users`);
        }
    }

    const updateFile = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    if (file) setUrl(file);
    };

return (
    <div className='photo-form-outer'>
        <div className='photo-form-structure'>
            <form onSubmit={handleSubmit}>
                <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <h2 className='create-photo-title'>Add Photo</h2>
                <div className='photo-body'>
                <input
                type="text"
                className='input'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />
                <input
                type="text"
                className='input'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />
                <input 
                type="file" 
                onChange={updateFile} 
                className='input'
                />
                </div>
                <button type='submit' className='submit-photo'>Submit</button>
            </form>
        </div>
    </div>
)
}

export default PhotoForm;
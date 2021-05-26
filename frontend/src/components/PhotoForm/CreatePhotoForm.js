import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import { getPhotos, createPhoto } from '../../store/photo';

function PhotoForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const albumState = useSelector(state => state.albums);
    const sessionUser = useSelector(state => state.session.user);
    const albums = Object.values(albumState);

    const [image, setImage] = useState(null);
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
            image,
            userId: sessionUser.id,
            albumId: albums.map((album) => {
                if(album.userId === sessionUser.id) {
                    return album
                }
                return []
            })
        }

        let createdPhoto = await dispatch(createPhoto(payload))
        if (createdPhoto) {
            history.push(`/users`);
        }
    }

    const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    };

return (
    <div>
        <div>
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
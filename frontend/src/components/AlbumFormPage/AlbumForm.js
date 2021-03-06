import React, { useEffect, useState } from 'react';
import { getAlbums, createAlbum } from '../../store/album';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AlbumForm.css';

function AlbumForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const albumState = useSelector(state => state.albums);
    const albums = Object.values(albumState);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(getAlbums())
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            userId: sessionUser.id
        }

        let createdAlbum = await dispatch(createAlbum(payload))
        if (createdAlbum) {
            history.push(`/users/${sessionUser.id}`);
        }
    }

    return (
        <div className='outer-div'>
            <div className='form-div'>
                <form onSubmit={handleSubmit}>
                    <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <h2 className='album-h2'>Create An Album</h2>
                    <div className='form-body'>
                        <input 
                        className='input'
                        placeholder='Album Name'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                        <input 
                        className='input'
                        placeholder='Description'
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        />
                    </div>
                    <button type='submit' className='submit-button'>Create Album</button>
                </form>
            </div>
        </div>
    )

}

export default AlbumForm;
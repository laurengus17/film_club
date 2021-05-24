import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './AlbumForm.css';

function AlbumForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        // dispatch here
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
                    <button type='submit' className='submit-button'>Submit</button>
                </form>
            </div>
        </div>
    )

}

export default AlbumForm;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AlbumForm from './AlbumForm';
import '../UserHomePage/UserHomePage.css';

function CreateAlbumModal() {
const [showModal, setShowModal] = useState(false);

return (
    <>
    <button onClick={() => setShowModal(true)} className='create-an-album'>Create An Album</button>
    {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <AlbumForm />
        </Modal>
    )}
    </>
);
}

export default CreateAlbumModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePhotoForm from './CreatePhotoForm';
import '../UserAlbums/UserAlbums.css';

function AddPhotoModal({ albumId }) {
const [showModal, setShowModal] = useState(false);

return (
    <>
    <button onClick={() => setShowModal(true)} className='add-photo-button'>Add Photo</button>
    {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <CreatePhotoForm albumId={albumId} />
        </Modal>
    )}
    </>
);
}

export default AddPhotoModal;
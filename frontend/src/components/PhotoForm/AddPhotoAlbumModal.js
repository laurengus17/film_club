import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePhotoForm from './CreatePhotoForm';
import '../UserHomePage/UserHomePage.css';

function AddPhotoAlbumModal({ albumId }) {
const [showModal, setShowModal] = useState(false);

return (
    <>
    <button onClick={() => setShowModal(true)} className='add-photo-button-album'>Add Photo</button>
    {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <CreatePhotoForm albumId={albumId} />
        </Modal>
    )}
    </>
);
}

export default AddPhotoAlbumModal;
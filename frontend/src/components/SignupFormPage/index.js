import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignUpForm';
import './SignupForm.css';

function SignUpFormModal() {
const [showModal, setShowModal] = useState(false);

return (
    <>
    <button className='nav-signup' onClick={() => setShowModal(true)}>Sign Up</button>
    {showModal && (
        <Modal onClose={() => setShowModal(false)}>
        <SignupFormPage />
        </Modal>
    )}
    </>
);
}

export default SignUpFormModal;
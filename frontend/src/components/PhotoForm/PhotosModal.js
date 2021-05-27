import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../store/photo';
import PhotosUserPage from './PhotosUserPage';

function EditPhotoModal() {
    const dispatch = useDispatch();
    const photoState = useSelector(state => state.photos);
    const sessionUser = useSelector(state => state.session.user);
    const photos = Object.values(photoState);

    const currentUserId = sessionUser.id  
    
    useEffect(() => {
    dispatch(getPhotos())
    }, [dispatch]);

return (
    <>
    <div>
        {photos.map((photo) => {
            if(photo.userId === currentUserId) {
                return (
                    <PhotosUserPage photo={photo} />
                )
            }
            return [];
        })}
    </div>
    </>
)
}

export default EditPhotoModal;
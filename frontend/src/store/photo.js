import { csrfFetch } from './csrf';

const LOAD_PHOTO = 'photo/loadPhotos';
const ADD_PHOTO = 'photo/addPhoto';
const EDIT_PHOTO = 'photo/editPhoto';
const REMOVE_PHOTO = 'photo/removePhoto';

const loadPhotos = (photos) => {
    return {
        type: LOAD_PHOTO,
        photos
    };
};

const addPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        payload: photo,
    };
};

const editPhoto = (photo) => {
    return {
        type: EDIT_PHOTO,
        photo
    };
};

const removePhoto = (id) => {
    return {
        type: REMOVE_PHOTO,
        id
    };
};

// THUNKS

export const getPhotos = () => async (dispatch) => {
    const res = await csrfFetch('/api/photo');

    if(res.ok) {
        const photos = await res.json();
        dispatch(loadPhotos(photos));
        return res;
    }
}

export const createPhoto = ({ title, description, url, userId, albumId }) => async (dispatch) => {
    const photo = {
        title, 
        description,
        url,
        userId,
        albumId
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", userId);
    formData.append("albumId", albumId);

    if (url) formData.append("image", url);

    const res = await csrfFetch('/api/album', {
        method: `POST`,
        headers: {'Content-Type': "multipart/form-data"},
        body: formData,
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(addPhoto(data.photo));
        return data;
    }
}

export const updatePhoto = ({ title, description, url, userId, albumId }, id) => async (dispatch) => {
    const photo = { id, title, description, url, userId, albumId }
    const res = await csrfFetch(`/api/photo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({photo})
    });

    if(res.ok) {
        const data = await res.json();
        dispatch(editPhoto(data));
        return data;
    }
}

export const deletePhoto = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/photo/${id}`, {
        method: 'DELETE'
    });

    if(res.ok) {
        dispatch(removePhoto(id))
    }
}
//initial state
const initialState = {};

// reducers
const photosReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_PHOTO:
            const allPhotos = {};
            action.photos.forEach((photo) => {
                allPhotos[photo.id] = photo;
            });
            return {
                ...allPhotos,
                ...state
            };
        case ADD_PHOTO:
        {
        newState = Object.assign({}, state);
        newState[action.payload.id] = action.payload;
        return newState;
        }
        case EDIT_PHOTO:
        {
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        }
        case REMOVE_PHOTO:
        {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}

export default photosReducer;
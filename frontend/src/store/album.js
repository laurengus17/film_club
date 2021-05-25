import { csrfFetch } from './csrf';

const LOAD_ALBUMS = 'album/loadAlbums';
const ADD_ALBUM = 'album/addAlbum';
const EDIT_ALBUM = 'album/editAlbum';
const REMOVE_ALBUM = 'album/removeAlbum';

const loadAlbums = (albums) => {
    return {
        type: LOAD_ALBUMS,
        albums
    };
};

const addAlbum = (album) => {
    return {
        type: ADD_ALBUM,
        payload: album,
    };
};

const editAlbum = (album) => {
    return {
        type: EDIT_ALBUM,
        album
    };
};

const removeAlbum = (id) => {
    return {
        type: REMOVE_ALBUM,
        id
    };
};

// THUNKS

export const getAlbums = () => async (dispatch) => {
    const res = await csrfFetch('/api/album');

    if(res.ok) {
        const albums = await res.json();
        dispatch(loadAlbums(albums));
        return res;
    }
}

export const createAlbum = ({ title, description, userId }) => async (dispatch) => {
    const album = {
        title, 
        description,
        userId
    }

    const res = await csrfFetch('/api/album', {
        method: `POST`,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(album)
    })

    if(res.ok) {
        const data = await res.json();
        dispatch(addAlbum(data.album));
        return data;
    }
}

export const updateAlbum = ({ title, description, userId }, id) => async (dispatch) => {
    const album = { id, title, description, userId }
    const res = await csrfFetch(`/api/album/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({album})
    });

    if(res.ok) {
        const data = await res.json();
        dispatch(editAlbum(data));
        return data;
    }
}

export const deleteAlbum = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/album/${id}`, {
        method: 'DELETE'
    });

    if(res.ok) {
        dispatch(removeAlbum(id))
    }
}
//initial state
const initialState = {};

// reducers
const albumsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ALBUMS:
            const allAlbums = {};
            action.albums.forEach((album) => {
                allAlbums[album.id] = album;
            });
            return {
                ...allAlbums,
                ...state
            };
        case ADD_ALBUM:
        {
        newState = Object.assign({}, state);
        newState[action.payload.id] = action.payload;
        return newState;
        }
        case EDIT_ALBUM:
        {
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        }
        case REMOVE_ALBUM:
        {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        default:
            return state;
    }
}

export default albumsReducer;